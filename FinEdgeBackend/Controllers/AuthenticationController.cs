using Microsoft.AspNetCore.Mvc;
using FinEdgeBackend.Models;
using FinEdgeBackend.DTOs.User;
using FinEdgeBackend.Interfaces.Auth;
using FinEdgeBackend.Interfaces;

namespace FinEdgeBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthenticationController(IUserService userService, IJwtService jwtService, IRefreshTokenService refreshTokenService, IAuthService authService) : Controller
    {
        private readonly IUserService _userService = userService;
        private readonly IJwtService _jwtService = jwtService;
        private readonly IAuthService _authService = authService;
        private readonly IRefreshTokenService _refreshTokenService = refreshTokenService;

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO registerDto)
        {
            if (!_userService.Validate(registerDto.Email!, registerDto.Password!, isCurrentUser: false))
            {
                return BadRequest("Invalid Email or Password!");
            }

            User? user = await _authService.RegisterAsync(registerDto);

            return await GenerateAuthResponse(user);
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDto)
        {
            User? user = await _authService.LoginAsync(loginDto);

            if (user is null)
            {
                return Unauthorized("Invalid login credentials or token issue.");
            }

            return await GenerateAuthResponse(user);
        }

        [HttpPost]
        [Route("refresh-token")]
        public async Task<IActionResult> GenerateNewRefreshToken([FromBody] string refreshToken)
        {
            RefreshToken storedToken = await _refreshTokenService.GetRefreshTokenAsync(refreshToken);

            if (storedToken is null || storedToken.ExpiryDate < DateTime.UtcNow || storedToken.IsRevoked)
            {
                return Unauthorized("Invalid or expired refresh token.");
            }

            storedToken.IsRevoked = true;

            string newRefreshToken = _jwtService.GenerateRefreshToken(storedToken.UserID);

            RefreshToken newRefreshTokenEntity = await _refreshTokenService.AddRefreshTokenAsync(new RefreshToken
            {
                Token = newRefreshToken,
                ExpiryDate = DateTime.UtcNow.AddDays(7),
                UserID = storedToken.UserID,
            });

            User? user = await _userService.GetUserByIdAsync(storedToken.UserID);

            return Ok(user);
        }

        [HttpPost]
        [Route("logout")]
        public IActionResult Logout()
        {
            DeleteCookie("AccessToken");
            DeleteCookie("RefreshToken");

            return Ok(new
            {
                message = "Log outed"
            });
        }

        private async Task<IActionResult> GenerateAuthResponse(User user)
        {
            string accessToken = _jwtService.GenerateAcessToken(user.ID);
            string refreshToken = _jwtService.GenerateRefreshToken(user.ID);

            await _refreshTokenService.AddRefreshTokenAsync(new RefreshToken
            {
                Token = refreshToken,
                ExpiryDate = DateTime.UtcNow.AddDays(1),
                UserID = user.ID
            });

            CreateCookie("AccessToken", accessToken);
            CreateCookie("RefreshToken", refreshToken);

            return Ok(user);
        }

        private IActionResult CreateCookie(string name, string value)
        {
            Response.Cookies.Append(name, value, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Domain = "localhost",
                Path = "/",
                Expires = DateTime.UtcNow.AddDays(1)
            });

            return NoContent();
        }

        private IActionResult DeleteCookie(string name)
        {
            Response.Cookies.Delete(name, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Domain = "localhost",
                Path = "/"
            });

            return NoContent();
        }
    }
}
