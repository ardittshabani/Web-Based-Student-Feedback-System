using Microsoft.AspNetCore.Identity;

namespace StudentFeedback.Models
{
	public class Professor
	{
		public string Id { get; set; } 
		public IdentityUser User { get; set; }
		public string FullName { get; set; }
		public ICollection<Course>? Courses { get; set; } = new List<Course>();

	}
}
