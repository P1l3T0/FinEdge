using FinEdgeBackend.DTOs.User;
using FinEdgeBackend.Models;

namespace FinEdgeBackend.Interfaces
{
    public interface IUserService
    {
        Task<User> CreateUserAsync(User user);
        Task<User> UpdateCurrentUserAsync(UpdateDTO updateDTO, User currentUser);
        Task<User> GetUserByEmailAsync(string email);
        Task<User> GetUserByIdAsync(int userID);
        Task<User> GetUserByNameAsync(string name);
        Task<User> GetCurrentUserAsync();
        Task<ICollection<User>> GetAllUsersAsync();
        bool Validate(string email, string password, bool isCurrentUser);
        bool ValidateEmail(string email);
        bool ValidatePassword(string password);
        bool UserExists(string email);
        void DeleteUser(User currentUser);
    }
}
