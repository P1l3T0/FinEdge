﻿using FinEdgeBackend.Data;
using FinEdgeBackend.Interfaces;
using FinEdgeBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace FinEdgeBackend.Services
{
    public class NotificationService(DataContext dataContext) : INotificationService
    {
        private readonly DataContext _dataContext = dataContext;

        public async Task CreateNotificationAsync(Notification notification)
        {
            _dataContext.Notifications.Add(notification);
            await _dataContext.SaveChangesAsync();
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

        public async Task<ICollection<Notification>> GetAllNotificationsForCurrentUserAsync(User currentUser)
        {
            return await _dataContext.Notifications.Where(n => n.User!.Equals(currentUser)).ToListAsync();
        }

        public async Task<ICollection<Notification>> GetAllUnreadNotificationsForCurrentUserAsync(User currentUser)
        {
            return await _dataContext.Notifications.Where(n => n.User!.Equals(currentUser) && n.IsRead == false).ToListAsync();
        }

        public async Task DeleteAllNotificationAsync(ICollection<Notification> notifications)
        {
            _dataContext.Notifications.RemoveRange(notifications);
            await _dataContext.SaveChangesAsync();
        }
    }
}
