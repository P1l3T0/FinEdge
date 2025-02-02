using Microsoft.AspNetCore.Mvc;
using FinEdgeBackend.Models;
using FinEdgeBackend.DTOs.User;
using FinEdgeBackend.Interfaces;
using FinEdgeBackend.Enums;

namespace FinEdgeBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController(IUserService userService, INotificationService notificationService) : Controller
    {
        private readonly IUserService _userService = userService;
        private readonly INotificationService _notificationService = notificationService;

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> GetCurrentUser()
        {
            User currentUser = await _userService.GetCurrentUserAsync();
            return Ok(currentUser);
        }

        [HttpGet]
        [Route("get/names")]
        public async Task<IActionResult> GetAccountAndCategoryNamesForUser()
        {
            User currentUser = await _userService.GetCurrentUserAsync();
            ICollection<Account> accounts = currentUser.Accounts;
            ICollection<Category> categories = currentUser.Categories;

            ICollection<string> accountNames = _userService.GetAccountNames(accounts);
            ICollection<string> categoryNames = _userService.GetCategoryNames(categories);

            return Ok(new
            {
                AccountNames = accountNames,
                CategoryNames = categoryNames
            });
        }

        [HttpPut]
        [Route("update/{userID}")]
        public async Task<IActionResult> UpddateUser([FromBody] UpdateDTO updatedDTO)
        {
            User currentUser = await _userService.GetCurrentUserAsync();

            if (string.IsNullOrEmpty(updatedDTO.Name) || string.IsNullOrEmpty(updatedDTO.Surname) ||
                string.IsNullOrEmpty(updatedDTO.Email) || string.IsNullOrEmpty(updatedDTO.Password))
            {
                await _notificationService.CreateNotificationAsync(new Notification()
                {
                    Message = "One or more of the fields are empty!",
                    NotificationType = NotificationType.Error,
                    IsRead = false,
                    User = currentUser,
                    UserID = currentUser.ID,
                    DateCreated = DateTime.Now,
                });

                return BadRequest();
            }

            if (!_userService.Validate(updatedDTO.Email, updatedDTO.Password, isCurrentUser: true))
            {
                await _notificationService.CreateNotificationAsync(new Notification()
                {
                    Message = "Email already in use or Password is to weak!",
                    NotificationType = NotificationType.Error,
                    IsRead = false,
                    User = currentUser,
                    UserID = currentUser.ID,
                    DateCreated = DateTime.Now,
                });

                return BadRequest();
            }

            await _userService.UpdateCurrentUserAsync(updatedDTO, currentUser);

            await _notificationService.CreateNotificationAsync(new Notification()
            {
                Message = "User updated successfully!",
                NotificationType = NotificationType.Success,
                IsRead = false,
                User = currentUser,
                UserID = currentUser.ID,
                DateCreated = DateTime.Now,
            });

            return Ok(currentUser);
        }

        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> DeleteUser()
        {
            User currentUser = await _userService.GetCurrentUserAsync();

            if (currentUser is null)
            {
                await _notificationService.CreateNotificationAsync(new Notification()
                {
                    Message = "User does not exist!",
                    NotificationType = NotificationType.Error,
                    IsRead = false,
                    DateCreated = DateTime.Now,
                });

                return BadRequest("User does not exist!");
            }

            await _userService.DeleteUserAsync(currentUser);

            DeleteCookie("AccessToken");
            DeleteCookie("RefreshToken");

            return NoContent();
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
