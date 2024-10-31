using FinEdgeBackend.Models;

namespace FinEdgeBackend.Interfaces
{
    public interface IRefreshTokenService
    {
        Task<RefreshToken> AddRefreshTokenAsync(RefreshToken refreshToken);
        Task<RefreshToken> GetRefreshTokenAsync(string refreshToken);
        Task<RefreshToken> GetRefreshTokenByUserIdAsync(int userID);
    }
}
