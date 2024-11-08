﻿using FinEdgeBackend.DTOs.User;
using FinEdgeBackend.Models;

namespace FinEdgeBackend.Interfaces
{
    public interface IUserService
    {
        Task<User> CreateUserAsync(User user);
        Task UpdateCurrentUserAsync(UpdateDTO updateDTO, User currentUser);
        Task<User> GetUserByEmailAsync(string email);
        Task<User> GetUserByIdAsync(int userID);
        Task<User> GetUserByNameAsync(string name);
        Task<User> GetCurrentUserAsync();
        Task<ICollection<User>> GetAllUsersAsync();
        Task DeleteUserAsync(User currentUser);
        bool Validate(string email, string password, bool isCurrentUser);
        bool ValidateEmail(string email);
        bool ValidatePassword(string password);
        bool UserExists(string email);
    }
}
