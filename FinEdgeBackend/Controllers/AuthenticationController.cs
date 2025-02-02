﻿using Microsoft.AspNetCore.Mvc;
using FinEdgeBackend.Models;
using FinEdgeBackend.DTOs.User;
using FinEdgeBackend.Interfaces.Auth;
using FinEdgeBackend.Interfaces;
using FinEdgeBackend.Enums;

namespace FinEdgeBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthenticationController(IUserService userService, IJwtService jwtService, IRefreshTokenService refreshTokenService, IAuthService authService, INotificationService notificationService) : Controller
    {
        private readonly IUserService _userService = userService;
        private readonly IJwtService _jwtService = jwtService;
        private readonly IAuthService _authService = authService;
        private readonly IRefreshTokenService _refreshTokenService = refreshTokenService;
        private readonly INotificationService _notificationService = notificationService;

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO registerDto)
        {
            if (!_userService.Validate(registerDto.Email!, registerDto.Password!, isCurrentUser: false))
            {
                await _notificationService.CreateNotificationAsync(new Notification()
                {
                    Message = "Invalid Email or Password!",
                    NotificationType = NotificationType.Error,
                    IsRead = false,
                    DateCreated = DateTime.Now,
                });

                return BadRequest("Invalid Email or Password!");
            }

            User? user = await _authService.RegisterAsync(registerDto);

            await _notificationService.CreateNotificationAsync(new Notification()
            {
                Message = $"User {user.Name} {user.Surname} registered succesfuly!",
                NotificationType = NotificationType.Success,
                IsRead = false,
                User = user,
                UserID = user.ID,
                DateCreated = DateTime.Now,
            });

            return await GenerateAuthResponse(user);
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDto)
        {
            User? user = await _authService.LoginAsync(loginDto);

            if (user is null)
            {
                await _notificationService.CreateNotificationAsync(new Notification()
                {
                    Message = "Invalid login credentials or token issue!",
                    NotificationType = NotificationType.Error,
                    IsRead = false,
                    DateCreated = DateTime.Now,
                });

                return BadRequest();
            }

            await _notificationService.CreateNotificationAsync(new Notification()
            {
                Message = "Logged in succesfuly!",
                NotificationType = NotificationType.Success,
                IsRead = false,
                DateCreated = DateTime.Now,
            });

            return await GenerateAuthResponse(user);
        }

        [HttpPost]
        [Route("refresh-token")]
        public async Task<IActionResult> GenerateNewRefreshToken()
        {
            string  refreshToken = HttpContext.Request.Cookies["RefreshToken"]!;
            RefreshToken storedToken = await _refreshTokenService.GetRefreshTokenAsync(refreshToken);

            if (storedToken is null || storedToken.ExpiryDate < DateTime.Now || storedToken.IsRevoked)
            {
                await _notificationService.CreateNotificationAsync(new Notification()
                {
                    Message = "Invalid or expired refresh token!",
                    NotificationType = NotificationType.Error,
                    IsRead = false,
                    DateCreated = DateTime.Now,
                });

                return Unauthorized("Invalid or expired refresh token.");
            }

            storedToken.IsRevoked = true;

            string newRefreshToken = _jwtService.GenerateRefreshToken(storedToken.UserID);
            string newAccessToken = _jwtService.GenerateAcessToken(storedToken.UserID);

            RefreshToken newRefreshTokenEntity = await _refreshTokenService.AddRefreshTokenAsync(new RefreshToken()
            {
                Token = newRefreshToken,
                ExpiryDate = DateTime.Now.AddDays(7),
                UserID = storedToken.UserID,
            });

            User? user = await _userService.GetUserByIdAsync(storedToken.UserID);

            DeleteCookie("RefreshToken");
            CreateCookie("AccessToken", newAccessToken);
            CreateCookie("RefreshToken", newRefreshToken);

            return Ok(new
            {
                NewAccessToken = newAccessToken,
                NewRefreshToken = newRefreshToken,
                ExpiresIn = 600,
                Username = user.Name
            });
        }

        [HttpPost]
        [Route("logout")]
        public async Task<IActionResult> Logout()
        {
            DeleteCookie("AccessToken");
            DeleteCookie("RefreshToken");

            await _notificationService.CreateNotificationAsync(new Notification()
            {
                Message = "Logged out succesfully!",
                NotificationType = NotificationType.Success,
                IsRead = false,
                DateCreated = DateTime.Now,
            });

            return Ok(new
            {
                message = "Log outed"
            });
        }

        private async Task<IActionResult> GenerateAuthResponse(User user)
        {
            string accessToken = _jwtService.GenerateAcessToken(user.ID);
            string refreshToken = _jwtService.GenerateRefreshToken(user.ID);

            await _refreshTokenService.AddRefreshTokenAsync(new RefreshToken()
            {
                Token = refreshToken,
                ExpiryDate = DateTime.Now.AddDays(1),
                UserID = user.ID
            });

            CreateCookie("AccessToken", accessToken);
            CreateCookie("RefreshToken", refreshToken);

            return Ok(user);
        }

        private IActionResult CreateCookie(string name, string value)
        {
            Response.Cookies.Append(name, value, new CookieOptions()
            {
                HttpOnly = name == "AccessToken" ? true : false,
                Secure = true,
                SameSite = SameSiteMode.None,
                Domain = "localhost",
                Path = "/",
                Expires = name == "AccessToken"
                    ? DateTime.Now.AddSeconds(600)
                    : DateTime.Now.AddDays(5),
            });

            return NoContent();
        }

        private IActionResult DeleteCookie(string name)
        {
            Response.Cookies.Delete(name, new CookieOptions()
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
