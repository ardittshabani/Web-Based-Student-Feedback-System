using System.Net.Mail;

namespace StudentFeedback.Services
{
    public class EmailService
    {
        public void SendEmail(string to, string subject, string body)
        {
            using (var client = new SmtpClient("smtp.server.com"))
            {
                var mailMessage = new MailMessage("no-reply@yourapp.com", to, subject, body);
                client.Send(mailMessage);
            }
        }
    }
}
