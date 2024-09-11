namespace StudentFeedback.Models
{
	public class Notification
	{
		public int Id { get; set; }
		public string RecipientId { get; set; }
		public string Message { get; set; }
		public bool IsRead { get; set; }
		public DateTime CreatedDate { get; set; }
	}
}
