﻿namespace StudentFeedback.Models
{
	public class Department
	{
		public int Id { get; set; }
		public string Name { get; set; } = string.Empty;
		public ICollection<Course> Courses { get; set; } = new List<Course>();
	}
}
