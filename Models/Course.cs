using System.ComponentModel.DataAnnotations;

namespace StudentFeedback.Models
{
	public class Course
	{
		[Key]
		public int Id { get; set; }
		public string Title { get; set; } = string.Empty;
		public int DepartmentId { get; set; }
		public ICollection<Professor>? Professors { get; set; } = new List<Professor>();
		public ICollection<Student>? Students { get; set; } = new List<Student>();
	}
}
