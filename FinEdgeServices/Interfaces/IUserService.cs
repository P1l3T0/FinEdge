using FinEdgeData.DTOs;
using FinEdgeData.Models;

namespace FinEdgeServices.Interfaces
{
    public interface IUserService
    {
        Task<User> CreateUserAsync(User user);
        Task UpdateCurrentUserAsync(UpdateDTO updateDTO, User currentUser);
        Task<User> GetUserByEmailAsync(string email);
        Task<User> GetUserByIdAsync(int userID);
        Task<User> GetCurrentUserAsync();
        Task<ICollection<User>> GetAllUsersAsync();
        ICollection<string> GetAccountNames(ICollection<Account> accounts);
        ICollection<string> GetCategoryNames(ICollection<Category> categories);
        Task DeleteUserAsync(User currentUser);
        bool Validate(string email, string password, bool isCurrentUser);
        bool ValidateEmail(string email);
        bool ValidatePassword(string password);
        bool UserExists(string email);
    }
}
