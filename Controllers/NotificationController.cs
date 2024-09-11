using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentFeedback.Database;

namespace StudentFeedback.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class NotificationController : ControllerBase
	{
		private readonly AuthDbContext _context;

		public NotificationController(AuthDbContext context)
		{
			_context = context;
		}

		[HttpGet("notifications")]
		public IActionResult GetNotifications(string userId)
		{
			var notifications = _context.Notifications
				.Where(n => n.RecipientId == userId && !n.IsRead)
				.ToList();

			return Ok(notifications);
		}

	}
}
