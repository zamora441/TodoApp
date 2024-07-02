using TodoApp.Server.DTOs;

namespace TodoApp.Server.Services
{
    public interface IEmailService
    {
        Task SendEmailAsync(EmailMessageDto emailMessageDto);
    }
}
