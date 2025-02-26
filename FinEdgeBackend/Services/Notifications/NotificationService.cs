using FinEdgeBackend.Data;
using FinEdgeBackend.Interfaces;
using FinEdgeBackend.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace FinEdgeBackend.Services.Notifications
{
    public class NotificationService(DataContext dataContext, IHubContext<NotificationHub> hubContext) : INotificationService
    {
        private readonly DataContext _dataContext = dataContext;
        private readonly IHubContext<NotificationHub> _hubContext = hubContext;

        public async Task CreateNotificationAsync(Notification notification)
        {
            _dataContext.Notifications.Add(notification);
            await _dataContext.SaveChangesAsync();

            await _hubContext.Clients.All.SendAsync("ReceiveNotification", notification);
        }

        public async Task MarkNotificationAsReadAsync(Notification notification)
        {
            notification.IsRead = true;

            _dataContext.Notifications.Update(notification);
            await _dataContext.SaveChangesAsync();
        }

        public async Task<Notification> GetNotificationByIdAsync(int notificationID)
        {
            return await _dataContext.Notifications.Where(n => n.ID == notificationID).FirstAsync();
        }

        public async Task<Notification> GetLatestUnreadNotification(User currentUser)
        {
            return await _dataContext.Notifications
                .Where(n => n.IsRead == false)
                .OrderByDescending(n => n.DateCreated)
                .FirstOrDefaultAsync()!;
        }

        public async Task<ICollection<Notification>> GetAllNotificationsForCurrentUserAsync(User currentUser)
        {
            return await _dataContext.Notifications.Where(n => n.User!.Equals(currentUser)).OrderByDescending(n => n.DateCreated).ToListAsync();
        }

        public async Task DeleteNotificationAsync(Notification notification)
        {
            _dataContext.Notifications.Remove(notification);
            await _dataContext.SaveChangesAsync();
        }
    }
}
