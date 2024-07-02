using MimeKit;
using System.ComponentModel.DataAnnotations;

namespace TodoApp.Server.DTOs
{
    public class EmailMessageDto
    {
        [Required]
        public MailboxAddress To { get; set; }
        [Required]
        public string Subject { get; set; } = null!;
        [Required]
        public string Body { get; set; } = null!;
        public EmailMessageDto(string to, string subject, string body) {
            To = new MailboxAddress(null, to);
            Subject = subject;
            Body = body;
        }
    }
}
