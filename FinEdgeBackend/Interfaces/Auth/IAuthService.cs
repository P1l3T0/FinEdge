using FinEdgeBackend.DTOs.User;
using FinEdgeBackend.Models;

namespace FinEdgeBackend.Interfaces.Auth
{
    public interface IAuthService
    {
        Task<User> Register(RegisterDTO registerDto);
        Task<User> Login(LoginDTO loginDto);
    }
}
