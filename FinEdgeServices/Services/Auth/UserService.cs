﻿using FinEdgeData.Data;
using FinEdgeData.DTOs;
using FinEdgeData.Enums;
using FinEdgeData.Models;
using FinEdgeServices.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
using System.IdentityModel.Tokens.Jwt;

namespace FinEdgeServices.Services
{
    public class UserService(DataContext dataContext, IHttpContextAccessor httpContextAccessor, IJwtService jwtService) : IUserService
    {
        private readonly DataContext _dataContext = dataContext;
        private readonly IJwtService _jwtService = jwtService;
        private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;

        public async Task<User> CreateUserAsync(User user)
        {
            _dataContext.Users.Add(user);
            await _dataContext.SaveChangesAsync();
            return user;
        }

        public async Task UpdateCurrentUserAsync(UpdateDTO updatedDTO, User currentUser)
        {
            currentUser.Name = updatedDTO.Name;
            currentUser.Surname = updatedDTO.Surname;
            currentUser.Email = updatedDTO.Email;
            currentUser.MethodologyType = (MethodologyType)Enum.Parse(typeof(MethodologyType), updatedDTO.MethodologyType!);

            if (!string.IsNullOrEmpty(updatedDTO.Password))
            {
                currentUser.Password = BCrypt.Net.BCrypt.HashPassword(updatedDTO.Password);
            }

            _dataContext.Users.Update(currentUser);
            await _dataContext.SaveChangesAsync();
        }

        public async Task<User> GetUserByIdAsync(int userID)
        {
            DateTime startOfMonth = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);

            User? user = await _dataContext.Users
                .Include(u => u.Accounts)
                .Include(u => u.Categories)!
                    .ThenInclude(c => c.Subcategories)
                .Include(u => u.Transactions.Where(t => t.DateCreated >= startOfMonth))
                .Include(u => u.FinancialRecommendations)
                .Include(u => u.Notifications)
                .FirstOrDefaultAsync(u => u.ID == userID);

            return user!;
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            User? user = await _dataContext.Users
                .Include(u => u.Accounts)
                .FirstOrDefaultAsync(u => u.Email == email);

            return user!;
        }

        public async Task<User> GetCurrentUserAsync()
        {
            string? jwt = _httpContextAccessor.HttpContext!.Request.Cookies["AccessToken"];

            try
            {
                JwtSecurityToken token = _jwtService.Verify(jwt!);
                int.TryParse(_jwtService.GetUserIdFromToken(token), out int userID);

                User currentUser = await GetUserByIdAsync(userID);
                return currentUser;
            }
            catch (Exception ex)
            {
                throw new Exception("No user currently logged in!");
            }
        }

        public async Task<ICollection<User>> GetAllUsersAsync()
        {
            ICollection<User> users = await _dataContext.Users.ToListAsync();
            return users;
        }

        public ICollection<string> GetAccountNames(ICollection<Account> accounts)
        {
            return accounts.Select(a => a.Name).ToList()!;
        }

        public ICollection<string> GetCategoryNames(ICollection<Category> categories)
        {
            return categories.Select(a => a.Name).ToList()!;
        }

        public async Task DeleteUserAsync(User currentUser)
        {
            _dataContext.Users.Remove(currentUser);
            await _dataContext.SaveChangesAsync();
        }

        public bool Validate(string email, string password, bool isCurrentUser)
        {
            if (UserExists(email) && !isCurrentUser)
            {
                return false;
            }

            if (!ValidateEmail(email))
            {
                return false;
            }

            if (!ValidatePassword(password))
            {
                return false;
            }

            return true;
        }

        public bool ValidateEmail(string email)
        {
            string regExPattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
            Regex regex = new Regex(regExPattern);

            return regex.IsMatch(email);
        }

        public bool ValidatePassword(string password)
        {
            if (string.IsNullOrEmpty(password))
            {
                return true;
            }

            string regExPattern = @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$";
            Regex regex = new Regex(regExPattern);

            return regex.IsMatch(password);
        }

        public bool UserExists(string email)
        {
            return _dataContext.Users.Any(u => u.Email == email);
        }
    }
}
