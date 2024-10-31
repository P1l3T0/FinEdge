using FinEdgeBackend.DTOs;
using FinEdgeBackend.Models;

namespace FinEdgeBackend.Interfaces
{
    public interface IAuthService
    {
        Task<User> Register(RegisterDTO registerDto);
        Task<User> Login(LoginDTO loginDto);
    }
}
