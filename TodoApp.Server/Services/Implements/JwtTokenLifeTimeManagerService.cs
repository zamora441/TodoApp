using Microsoft.IdentityModel.Tokens;
using System.Collections.Concurrent;
using System.IdentityModel.Tokens.Jwt;

namespace TodoApp.Server.Services.Implements
{
    public class JwtTokenLifeTimeManagerService : IJwtTokenLifetimeManagerService
    {
        private readonly ConcurrentDictionary<string, DateTime> UnauthorizedTokens = new();
        public void RevokeToken(SecurityToken securityToken)
        {
            if(securityToken is JwtSecurityToken token)
            {
                UnauthorizedTokens.TryAdd(token.RawSignature, token.ValidTo);
            }

            foreach((string? key, DateTime _) in UnauthorizedTokens.Where(x => x.Value < DateTime.UtcNow))
            {
                UnauthorizedTokens.TryRemove(key, out DateTime _);
            } 
        }

        public bool ValidateTokenLifeTime(DateTime? notBefore, DateTime? expires, SecurityToken securityToken, TokenValidationParameters tokenValidationParameters) =>

            securityToken is JwtSecurityToken token &&
            token.ValidFrom <= DateTime.UtcNow &&
            token.ValidTo >= DateTime.UtcNow &&
            UnauthorizedTokens.ContainsKey(token.RawSignature) is false;

    }
}
