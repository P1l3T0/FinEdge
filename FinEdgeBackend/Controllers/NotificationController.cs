using FinEdgeBackend.Interfaces;
using FinEdgeBackend.Models;
using Microsoft.AspNetCore.Mvc;

namespace FinEdgeBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NotificationController(INotificationService notificationService, IUserService userService) : Controller
    {
        private readonly INotificationService _notificationService = notificationService;
        private readonly IUserService _userService = userService;

        [HttpGet]
        [Route("get-all")]
        [ProducesResponseType(200, Type = typeof(ICollection<Notification>))]
        public async Task<IActionResult> GetAllNotifications()
        {
            User currentUser = await _userService.GetCurrentUserAsync();

            if (currentUser is null)
            {
                return BadRequest("No user logged in");
            }

            ICollection<Notification> notifications = await _notificationService.GetAllNotificationsForCurrentUserAsync(currentUser);

            return Ok(notifications);
        }

        [HttpGet]
        [Route("get")]
        [ProducesResponseType(200, Type = typeof(Notification))]
        public async Task<IActionResult> GetNotificationByID(int notificationID)
        {
            Notification notification = await _notificationService.GetNotificationByIdAsync(notificationID);

            return Ok(notification);
        }

        [HttpGet]
        [Route("get-latest-unread")]
        [ProducesResponseType(200, Type = typeof(Notification))]
        public async Task<IActionResult> GetLatestUnreadNotification()
        {
            User currentUser = await _userService.GetCurrentUserAsync();

            if (currentUser is null)
            {
                return NoContent();
            }

            Notification notification = await _notificationService.GetLatestUnreadNotification(currentUser);

            return Ok(notification);
        }

        [HttpPut]
        [Route("mark-as-read/{notificationID}")]
        public async Task<IActionResult> MarkNotificationAsRead(int notificationID)
        {
            Notification notification = await _notificationService.GetNotificationByIdAsync(notificationID);
            await _notificationService.MarkNotificationAsReadAsync(notification);

            return NoContent();
        }

        [HttpPost]
        [Route("mark-all-as-read")]
        public async Task<IActionResult> MarkAllNotificationsAsRead()
        {
            User currentUser = await _userService.GetCurrentUserAsync();
            ICollection<Notification> notifications = await _notificationService.GetAllNotificationsForCurrentUserAsync(currentUser);

            foreach (Notification notification in notifications)
            {
                await _notificationService.MarkNotificationAsReadAsync(notification);
            }

            return NoContent();
        }

        [HttpDelete]
        [Route("delete/{notificationID}")]
        public async Task<IActionResult> DeleteNotification(int notificationID)
        {
            Notification notification = await _notificationService.GetNotificationByIdAsync(notificationID);
            await _notificationService.DeleteNotificationAsync(notification);

            return NoContent();
        }

        [HttpDelete("delete-all")]
        public async Task<IActionResult> DeleteNotifications()
        {
            User currentUser = await _userService.GetCurrentUserAsync();
            ICollection<Notification> notifications = await _notificationService.GetAllNotificationsForCurrentUserAsync(currentUser);

            foreach (Notification notification in notifications)
            {
                await _notificationService.DeleteNotificationAsync(notification);
            }

            return NoContent();
        }
    }
}
