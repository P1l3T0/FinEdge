using FinEdgeBackend.DTOs;
using FinEdgeBackend.Interfaces;
using FinEdgeBackend.Models;

namespace FinEdgeBackend.Services
{
    public class AuthService(IUserService userService, IRefreshTokenService refreshTokenService) : IAuthService
    {
        private readonly IUserService _userService = userService;
        private readonly IRefreshTokenService _refreshTokenService = refreshTokenService;

        public async Task<User> Register(RegisterDTO registerDto)
        {
            return await _userService.CreateUserAsync(new User
            {
                Name = registerDto.Name,
                Surname = registerDto.Surname,
                Email = registerDto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(registerDto.Password),
                DateCreated = DateTime.Now
            });
        }

        public async Task<User> Login(LoginDTO loginDto)
        {
            User user = await _userService.GetUserByEmailAsync(loginDto.Email!);

            if (user is null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password))
            {
                return null;
            }

            RefreshToken storedToken = await _refreshTokenService.GetRefreshTokenByUserIdAsync(user.ID);

            if (storedToken is null)
            {
                return null;
            }

            storedToken.IsRevoked = true;

            return user;
        }
    }
}
