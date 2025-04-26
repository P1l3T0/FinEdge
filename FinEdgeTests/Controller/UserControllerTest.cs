using FakeItEasy;
using FinEdgeBackend.Controllers;
using FinEdgeBackend.DTOs.User;
using FinEdgeBackend.Interfaces;
using FinEdgeBackend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FinEdgeTests.Controller
{
    public class UserControllerTest
    {
        private readonly IUserService _userService;
        private readonly INotificationService _notificationService;
        private readonly ISubcategoryService _subcategoryService;
        private readonly UserController _controller;

        public UserControllerTest()
        {
            _userService = A.Fake<IUserService>();
            _notificationService = A.Fake<INotificationService>();
            _subcategoryService = A.Fake<ISubcategoryService>();

            _controller = new UserController(_userService, _notificationService, _subcategoryService);
        }

        [Fact]
        public async Task UserController_GetCurrentUser_ReturnsOk()
        {
            User user = new User() { ID = 1, Name = "Test User" };

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));

            IActionResult result = await _controller.GetCurrentUser();

            OkObjectResult okResult = Assert.IsType<OkObjectResult>(result);
            User returnedUser = Assert.IsType<User>(okResult.Value);

            Assert.Equal(user.ID, returnedUser.ID);
        }

        [Fact]
        public async Task UserController_GetAccountAndCategoryNamesForUser_ReturnsOk()
        {
            User user = new User() { ID = 1, Name = "Test User", Accounts = new List<Account> { new Account { Name = "Account1" } }, Categories = new List<Category> { new Category { Name = "Category1" } } };

            List<string> accountNames = new List<string>() { "Account1" };
            List<string> categoryNames = new List<string>() { "Category1" };

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));
            A.CallTo(() => _userService.GetAccountNames(user.Accounts)).Returns(accountNames);
            A.CallTo(() => _userService.GetCategoryNames(user.Categories)).Returns(categoryNames);

            IActionResult result = await _controller.GetAccountAndCategoryNamesForUser();

            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async Task UserController_UpdateUser_InvalidData_ReturnsBadRequest()
        {
            UpdateDTO updateDTO = new UpdateDTO() { Name = "", Surname = "", Email = "" };
            User user = new User() { ID = 1, Name = "Test User" };

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));

            IActionResult result = await _controller.UpdateUser(updateDTO);

            Assert.IsType<BadRequestResult>(result);
            A.CallTo(() => _notificationService.CreateNotificationAsync(A<Notification>.Ignored)).MustHaveHappenedOnceExactly();
        }

        [Fact]
        public async Task UserController_UpdateUser_ValidData_ReturnsOk()
        {
            UpdateDTO updateDTO = new UpdateDTO() { Name = "Updated", Surname = "User", Email = "updated@example.com" };
            User user = new User() { ID = 1, Name = "Test User" };

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));
            A.CallTo(() => _userService.Validate(updateDTO.Email, A<string>.Ignored, true)).Returns(true);
            A.CallTo(() => _userService.UpdateCurrentUserAsync(updateDTO, user)).Returns(Task.CompletedTask);
            A.CallTo(() => _notificationService.CreateNotificationAsync(A<Notification>.Ignored)).Returns(Task.CompletedTask);

            IActionResult result = await _controller.UpdateUser(updateDTO);

            OkObjectResult okResult = Assert.IsType<OkObjectResult>(result);
            User returnedUser = Assert.IsType<User>(okResult.Value);

            Assert.Equal(user.ID, returnedUser.ID);
        }

        [Fact]
        public async Task UserController_DeleteUser_ReturnsBadRequest()
        {
            User user = null;

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));

            IActionResult result = await _controller.DeleteUser();

            BadRequestObjectResult badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("User does not exist!", badRequestResult.Value);

            A.CallTo(() => _notificationService.CreateNotificationAsync(A<Notification>.Ignored)).MustHaveHappenedOnceExactly();
        }

        [Fact]
        public async Task UserController_DeleteUser_ReturnsNoContent()
        {
            User user = new User() { ID = 1, Name = "Test User" };
            HttpContext httpContext = A.Fake<HttpContext>();
            HttpResponse response = A.Fake<HttpResponse>();
            IResponseCookies cookies = A.Fake<IResponseCookies>();

            A.CallTo(() => httpContext.Response).Returns(response);
            A.CallTo(() => response.Cookies).Returns(cookies);

            _controller.ControllerContext = new ControllerContext()
            {
                HttpContext = httpContext
            };

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));
            A.CallTo(() => _userService.DeleteUserAsync(user)).Returns(Task.CompletedTask);
            A.CallTo(() => cookies.Delete("AccessToken", A<CookieOptions>._));
            A.CallTo(() => cookies.Delete("RefreshToken", A<CookieOptions>._));

            IActionResult result = await _controller.DeleteUser();

            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task UserController_DeleteAllUsers_ReturnsOk()
        {
            List<User> users = new List<User>()
            {
                new User { ID = 1, Name = "User1" },
                new User { ID = 2, Name = "User2" }
            };

            A.CallTo(() => _userService.GetAllUsersAsync()).Returns(users);
            A.CallTo(() => _userService.DeleteUserAsync(A<User>.Ignored)).Returns(Task.CompletedTask);

            IActionResult result = await _controller.DeleteAllUsers();

            OkObjectResult okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal("Users deletedd succesfully", okResult.Value);
            A.CallTo(() => _userService.DeleteUserAsync(A<User>.Ignored)).MustHaveHappened(users.Count, Times.Exactly);
        }
    }
}
