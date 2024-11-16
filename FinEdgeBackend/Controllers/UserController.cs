using Microsoft.AspNetCore.Mvc;
using FinEdgeBackend.Models;
using FinEdgeBackend.DTOs.User;
using FinEdgeBackend.Interfaces.Auth;
using FinEdgeBackend.Interfaces;

namespace FinEdgeBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController(IUserService userService, IJwtService jwtService, IRefreshTokenService refreshTokenService) : Controller
    {
        private readonly IUserService _userService = userService;
        private readonly IJwtService _jwtService = jwtService;
        private readonly IRefreshTokenService _refreshTokenService = refreshTokenService;

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> GetCurrentUser()
        {
            User currentUser = await _userService.GetCurrentUserAsync();
            return Ok(currentUser);
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> UpddateUser([FromBody] UpdateDTO updatedDTO)
        {
            if (string.IsNullOrEmpty(updatedDTO.Name) || string.IsNullOrEmpty(updatedDTO.Surname) ||
                string.IsNullOrEmpty(updatedDTO.Email) || string.IsNullOrEmpty(updatedDTO.Password))
            {
                return BadRequest("One or more of the fields are empty!");
            }

            if (!_userService.Validate(updatedDTO.Email, updatedDTO.Password, isCurrentUser: true))
            {
                return BadRequest("Email already in user or Password is to weak!");
            }

            User currentUser = await _userService.GetCurrentUserAsync();

            await _userService.UpdateCurrentUserAsync(updatedDTO, currentUser);

            return Ok(currentUser);
        }

        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> DeleteUser()
        {
            User currentUser = await _userService.GetCurrentUserAsync();

            if (currentUser is null)
            {
                return BadRequest("User does not exist!");
            }

            await _userService.DeleteUserAsync(currentUser);

            DeleteCookie("AccessToken");
            DeleteCookie("RefreshToken");

            return Ok("User deletedd succesfully");
        }

        [HttpDelete]
        [Route("delete-all")]
        public async Task<IActionResult> DeleteAllUsers()
        {
            ICollection<User> userToDelete = await _userService.GetAllUsersAsync();

            foreach (User user in userToDelete)
            {
                await _userService.DeleteUserAsync(user);
            }

            return Ok("Users deletedd succesfully");
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
