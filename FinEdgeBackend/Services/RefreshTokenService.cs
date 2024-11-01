using Microsoft.EntityFrameworkCore;
using FinEdgeBackend.Data;
using FinEdgeBackend.Interfaces;
using FinEdgeBackend.Models;

namespace FinEdgeBackend.Services
{
    public class RefreshTokenService(DataContext dataContext) : IRefreshTokenService
    {
        private readonly DataContext _dataContext = dataContext;

        public async Task<RefreshToken> AddRefreshTokenAsync(RefreshToken refreshToken)
        {
            _dataContext.RefreshTokens.Add(refreshToken);
            await _dataContext.SaveChangesAsync();
            return refreshToken;    
        }

        public async Task<RefreshToken> GetRefreshTokenAsync(string refreshToken)
        {
            RefreshToken? token = await _dataContext.RefreshTokens.FirstOrDefaultAsync(t => t.Token == refreshToken);
            return token!;
        }

        public async Task<RefreshToken> GetRefreshTokenByUserIdAsync(int userID)
        {
            RefreshToken? refreshToken = await _dataContext.RefreshTokens.FirstOrDefaultAsync(t => t.UserID == userID && t.IsRevoked == false);
            return refreshToken!;
        }
    }
}
