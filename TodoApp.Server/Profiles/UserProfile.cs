using TodoApp.Server.Data.Entities;
using TodoApp.Server.DTOs.AuthDTOs;

namespace TodoApp.Server.Profiles
{
    public static class UserProfile
    {
        public static User ToUser(this RegisterDto registerDto)
        {
            return new User()
            {
                Email = registerDto.EmailAddress,
                UserName = registerDto.EmailAddress
            };
        }
    }
}
