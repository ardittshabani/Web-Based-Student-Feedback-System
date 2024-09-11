using StudentFeedback.Models;
using StudentFeedback.Database;
using System;

namespace StudentFeedback.Services
{
	public class NotificationService
	{
		private readonly AuthDbContext _context;

		public NotificationService(AuthDbContext context)
		{
			_context = context;
		}

		public void CreateNotification(string recipientId, string message)
		{
			var notification = new Notification
			{
				RecipientId = recipientId,
				Message = message,
				IsRead = false,
				CreatedDate = DateTime.Now,
			};

			_context.Notifications.Add(notification);
			_context.SaveChanges();
		}
	}

}
