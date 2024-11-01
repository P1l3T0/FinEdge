using System.Text;
using System.Security.Cryptography;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using FinEdgeBackend.Data;
using System.Security.Claims;
using FinEdgeBackend.Interfaces.Auth;

namespace FinEdgeBackend.Services.Auth
{
    public class JwtService(DataContext dataContext) : IJwtService
    {
        private readonly string securityKey = "e3d6623891a3c57d8fec2ff34d9f7c91adb38a43a2b8ac7cf1d62b65a2f23c0f";
        private readonly DataContext _dataContext = dataContext;

        public string GenerateAcessToken(int userID)
        {
            SymmetricSecurityKey symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityKey));
            SigningCredentials credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);

            Claim[] claims =
            {
                new Claim(JwtRegisteredClaimNames.Sub, userID.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            JwtHeader header = new JwtHeader(credentials);
            JwtPayload payload = new JwtPayload(
                issuer: "https://localhost:7207/",
                audience: "your-api-identifier",
                claims: claims,
                notBefore: null,
                expires: DateTime.UtcNow.AddMinutes(15)
            );

            JwtSecurityToken accessToken = new JwtSecurityToken(header, payload);
            string accessTokenString = new JwtSecurityTokenHandler().WriteToken(accessToken);

            return accessTokenString;
        }

        public string GenerateRefreshToken(int userID)
        {
            byte[] randomNumber = new byte[64];

            using (RandomNumberGenerator rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        public string GetUserIdFromToken(JwtSecurityToken token)
        {
            return token.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)!.Value;
        }

        public JwtSecurityToken Verify(string jwtToken)
        {
            JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
            byte[] key = Encoding.ASCII.GetBytes(securityKey);

            handler.ValidateToken(jwtToken, new TokenValidationParameters
            {
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuerSigningKey = true,
                ValidateIssuer = false,
                ValidateAudience = false,
            }, out SecurityToken validatedToken);

            return (JwtSecurityToken)validatedToken;
        }
    }
}
