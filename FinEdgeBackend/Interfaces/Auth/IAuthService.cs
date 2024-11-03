using FinEdgeBackend.DTOs.User;
using FinEdgeBackend.Models;

namespace FinEdgeBackend.Interfaces.Auth
{
    public interface IAuthService
    {
        Task<User> RegisterAsync(RegisterDTO registerDto);
        Task<User> LoginAsync(LoginDTO loginDto);
    }
}
