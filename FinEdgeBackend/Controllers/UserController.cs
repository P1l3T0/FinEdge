﻿using Microsoft.AspNetCore.Mvc;
using FinEdgeBackend.Models;
using FinEdgeBackend.DTOs.User;
using FinEdgeBackend.Interfaces.Auth;
using FinEdgeBackend.Interfaces;

namespace FinEdgeBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
        public async Task<IActionResult> UpddateUser([FromBody] UpdateDTO updatedUser)
        {
            if (string.IsNullOrEmpty(updatedUser.Name) || string.IsNullOrEmpty(updatedUser.Surname) ||
                string.IsNullOrEmpty(updatedUser.Email) || string.IsNullOrEmpty(updatedUser.Password))
            {
                return BadRequest("One or more of the fields are empty!");
            }

            if (!_userService.Validate(updatedUser.Email, updatedUser.Password, isCurrentUser: true))
            {
                return BadRequest("Email already in user or Password is to weak!");
            }

            User currentUser = await _userService.GetCurrentUserAsync();

            currentUser.Name = updatedUser.Name;
            currentUser.Surname = updatedUser.Surname;
            currentUser.Email = updatedUser.Email;
            currentUser.Password = BCrypt.Net.BCrypt.HashPassword(updatedUser.Password);

            await _userService.UpdateUserAsync(currentUser);
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

            _userService.DeleteUser(currentUser);

            return Ok("User deletedd succesfully");
        }

        [HttpDelete]
        [Route("delete-all")]
        public async Task<IActionResult> DeleteAllUsers()
        {
            ICollection<User> userToDelete = await _userService.GetAllUsersAsync();

            foreach (User user in userToDelete)
            {
                _userService.DeleteUser(user);
            }

            return Ok("Users deletedd succesfully");
        }
    }
}
