using Microsoft.AspNetCore.Identity;

namespace TodoApp.Server.Data.Entities
{
    public class User : IdentityUser
    {
        public ICollection<Task> Tasks { get; set; } = new List<Task>();
    }
}
