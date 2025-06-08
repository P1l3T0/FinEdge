using FinEdgeBackend.Controllers;
using FinEdgeData.Models;
using FinEdgeServices.Interfaces;
using Microsoft.AspNetCore.Mvc;
using FakeItEasy;

namespace FinEdgeTests.Controller
{
    public class NotificationContollerTest
    {
        private readonly INotificationService _notificationService;
        private readonly IUserService _userService;
        private readonly NotificationController _controller;

        public NotificationContollerTest()
        {
            _notificationService = A.Fake<INotificationService>();
            _userService = A.Fake<IUserService>();

            _controller = new NotificationController(_notificationService, _userService);
        }

        [Fact]
        public async Task NotificationController_GetAllNotifications_ReturnsBadRequest()
        {
            User user = null;

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));

            IActionResult result = await _controller.GetAllNotifications();

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async Task NotificationController_GetAllNotifications_ReturnsOk()
        {
            User user = new User() { ID = 1, Name = "test user", Notifications = new List<Notification>() };
            ICollection<Notification> notifications = new List<Notification>() { new Notification() { ID = 1, Title = "test notification" } };

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));
            A.CallTo(() => _notificationService.GetAllNotificationsForCurrentUserAsync(user)).Returns(Task.FromResult(notifications));

            IActionResult result = await _controller.GetAllNotifications();

            OkObjectResult okResult = Assert.IsType<OkObjectResult>(result);
            List<Notification> returnedNotfications = Assert.IsType<List<Notification>>(okResult.Value);
        }

        [Fact]
        public async Task NotificationController_GetNotificationByID_ReturnsOk()
        {
            int notificationID = 1;
            Notification notification = new Notification() { ID = 1, Title = "test notification" };

            A.CallTo(() => _notificationService.GetNotificationByIdAsync(notificationID)).Returns(Task.FromResult(notification));

            IActionResult result = await _controller.GetNotificationByID(notificationID);

            OkObjectResult okResult = Assert.IsType<OkObjectResult>(result);
            Notification returnedNotfication = Assert.IsType<Notification>(okResult.Value);

            Assert.Equal(notification.ID, returnedNotfication.ID);
        }

        [Fact]
        public async Task NotificationController_GetLatestUnreadNotification_ReturnsNoContent()
        {
            User user = null;

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));

            IActionResult result = await _controller.GetLatestUnreadNotification();

            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task NotificationController_GetLatestUnreadNotification_ReturnsOk()
        {
            User user = new User() { ID = 1, Name = "test user", Notifications = new List<Notification>() };
            Notification notification = new Notification() { ID = 1, Title = "test notification" };

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));
            A.CallTo(() => _notificationService.GetLatestUnreadNotification(user)).Returns(Task.FromResult(notification));

            IActionResult result = await _controller.GetLatestUnreadNotification();

            OkObjectResult okResult = Assert.IsType<OkObjectResult>(result);
            Notification returnedNotfication = Assert.IsType<Notification>(okResult.Value);

            Assert.Equal(notification.ID, returnedNotfication.ID);
        }

        [Fact]
        public async Task NotificationController_MarkNotificationAsRead_ReturnsNoContent()
        {
            int notifccationID = 1;
            Notification notification = new Notification() { ID = 1, Title = "test notification" };

            A.CallTo(() => _notificationService.GetNotificationByIdAsync(notifccationID)).Returns(Task.FromResult(notification));
            A.CallTo(() => _notificationService.MarkNotificationAsReadAsync(notification)).Returns(Task.CompletedTask);

            IActionResult result = await _controller.MarkNotificationAsRead(notifccationID);
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task NotificationController_MarkAllNotificationAsRead_ReturnsNoContent()
        {
            User user = new User() { ID = 1, Name = "test user", Notifications = new List<Notification>() };
            List<Notification> notifications = new List<Notification>() { new Notification() { ID = 1, Title = "test notification" } };

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));
            A.CallTo(() => _notificationService.GetAllNotificationsForCurrentUserAsync(user)).Returns(notifications);

            foreach (Notification notification in notifications)
            {
                A.CallTo(() => _notificationService.MarkNotificationAsReadAsync(notification)).Returns(Task.CompletedTask);
            }

            IActionResult result = await _controller.MarkAllNotificationsAsRead();
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task NotificationController_DeleteNotification_ReturnsNoContent()
        {
            int notifccationID = 1;
            Notification notification = new Notification() { ID = 1, Title = "test notification" };

            A.CallTo(() => _notificationService.GetNotificationByIdAsync(notifccationID)).Returns(Task.FromResult(notification));
            A.CallTo(() => _notificationService.DeleteNotificationAsync(notification)).Returns(Task.CompletedTask);

            IActionResult result = await _controller.DeleteNotification(notifccationID);
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task NotificationController_DeleteAllNotification_ReturnsNoContent()
        {
            User user = new User() { ID = 1, Name = "test user", Notifications = new List<Notification>() };
            List<Notification> notifications = new List<Notification>() { new Notification() { ID = 1, Title = "test notification" } };

            A.CallTo(() => _userService.GetCurrentUserAsync()).Returns(Task.FromResult(user));
            A.CallTo(() => _notificationService.GetAllNotificationsForCurrentUserAsync(user)).Returns(notifications);

            foreach (Notification notification in notifications)
            {
                A.CallTo(() => _notificationService.DeleteNotificationAsync(notification)).Returns(Task.CompletedTask);
            }

            IActionResult result = await _controller.DeleteNotifications();
            Assert.IsType<NoContentResult>(result);
        }
    }
}
