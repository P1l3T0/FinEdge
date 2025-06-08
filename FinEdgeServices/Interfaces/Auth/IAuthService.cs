using FinEdgeData.DTOs;
using FinEdgeData.Models;

namespace FinEdgeServices.Interfaces
{
    public interface IAuthService
    {
        Task<User> RegisterAsync(RegisterDTO registerDto);
        Task<User> LoginAsync(LoginDTO loginDto);
    }
}
