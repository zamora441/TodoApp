using MailKit.Net.Smtp;
using MimeKit;

using TodoApp.Server.DTOs;

namespace TodoApp.Server.Services.Implements
{
    public sealed class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            this._configuration = configuration;
        }

        public async Task SendEmailAsync(EmailMessageDto emailMessageDto)
        {
            var emailMessage = CreateEmailMessage(emailMessageDto);
            using (var client = new SmtpClient())
            {
                var smtpServer = _configuration["EmailConfiguration:SmtpServer"];
                var port = int.Parse(_configuration["EmailConfiguration:Port"]);
                var userName = _configuration["EmailConfiguration:UserName"];
                var password = _configuration["EmailConfiguration:Password"];


                await client.ConnectAsync(smtpServer, port, true);
                client.AuthenticationMechanisms.Remove("XOAUTH2");

                await client.AuthenticateAsync(userName, password);

                await client.SendAsync(emailMessage);

                await client.DisconnectAsync(true);
            }
            
        }

        private MimeMessage CreateEmailMessage(EmailMessageDto emailMessageDto)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress(null, address: _configuration["EmailConfiguration:UserName"]));
            emailMessage.To.Add(emailMessageDto.To);
            emailMessage.Subject = emailMessageDto.Subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Text)
            {
                Text = emailMessageDto.Body
            };

            return emailMessage;
        }
    }
}
