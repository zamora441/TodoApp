using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace TodoApp.Server.Services
{
    public interface IJwtTokenLifetimeManagerService
    {
        public bool ValidateTokenLifeTime(DateTime? notBefore, DateTime? expires, SecurityToken securityToken, TokenValidationParameters tokenValidationParameters);
        public void RevokeToken(SecurityToken securityToken);


    }
}