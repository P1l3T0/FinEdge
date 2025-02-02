using FinEdgeBackend.Models;

namespace FinEdgeBackend.Interfaces
{
    public interface INotificationService
    {
        Task CreateNotificationAsync(Notification notification);
        Task MarkNotificationAsReadAsync(Notification notification);
        Task<Notification> GetNotificationByIdAsync(int notificationID);
        Task<Notification> GetLatestUnreadNotification(User currentUser);
        Task<ICollection<Notification>> GetAllNotificationsForCurrentUserAsync(User currentUser);
        Task DeleteAllNotificationAsync(ICollection<Notification> notifications);
    }
}
