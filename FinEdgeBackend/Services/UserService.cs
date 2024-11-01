using Microsoft.EntityFrameworkCore;
using FinEdgeBackend.Data;
using FinEdgeBackend.Interfaces;
using FinEdgeBackend.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Text.RegularExpressions;

namespace FinEdgeBackend.Services
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

        public async Task<User> UpdateUserAsync(User user)
        {
            _dataContext.Users.Update(user);
            await _dataContext.SaveChangesAsync();
            return user;
        }

        public async Task<User> GetUserByIdAsync(int userID)
        {
            User? user = await _dataContext.Users
                .Include(u => u.Accounts)
                .FirstOrDefaultAsync(u => u.ID == userID);

            return user!;
        }

        public async Task<User> GetUserByNameAsync(string name)
        {
            User? user = await _dataContext.Users.FirstOrDefaultAsync(u => u.Name == name);
            return user!;
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            User? user = await _dataContext.Users.FirstOrDefaultAsync(u => u.Email == email);
            return user!;
        }

        public async Task<User> GetCurrentUserAsync()
        {
            string? jwt = _httpContextAccessor.HttpContext!.Request.Cookies["AccessToken"];

            try
            {
                JwtSecurityToken token = _jwtService.Verify(jwt!);
                int.TryParse(_jwtService.GetUserIdFromToken(token), out int userID);

                User user = await GetUserByIdAsync(userID);
                return user;
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

        public void DeleteUser(User user)
        {
            _dataContext.Users.Remove(user);
            _dataContext.SaveChanges();
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
