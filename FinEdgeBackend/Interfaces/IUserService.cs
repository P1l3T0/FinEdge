﻿using FinEdgeBackend.Models;

namespace FinEdgeBackend.Interfaces
{
    public interface IUserService
    {
        Task<User> CreateUserAsync(User user);
        Task<User> UpdateUserAsync(User user);
        Task<User> GetUserByEmailAsync(string email);
        Task<User> GetUserByIdAsync(int userID);
        Task<User> GetUserByNameAsync(string name);
        Task<User> GetCurrentUserAsync();
        Task<ICollection<User>> GetAllUsersAsync();
        bool Validate(string email, string password, bool isCurrentUser);
        bool ValidateEmail(string email);
        bool ValidatePassword(string password);
        bool UserExists(string email);
        void DeleteUser(User user);
    }
}
