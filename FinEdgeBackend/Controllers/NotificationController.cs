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

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> MarkNotificationAsRead(int notificationID)
        {
            Notification notification = await _notificationService.GetNotificationByIdAsync(notificationID);
            await _notificationService.MarkNotificationAsReadAsync(notification);

            return NoContent();
        }

        [HttpPut("put/mark-as-read")]
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

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteNotifications()
        {
            User currentUser = await _userService.GetCurrentUserAsync();
            ICollection<Notification> notifications = await _notificationService.GetAllNotificationsForCurrentUserAsync(currentUser);

            await _notificationService.DeleteAllNotificationAsync(notifications);

            return NoContent();
        }
    }
}
