using System.ComponentModel.DataAnnotations;

namespace StudentFeedback.Models
{
	public class SurveySchema
	{
		[Key]
		public int Id { get; set; }
		public string Content { get; set; }
		public string CreatedBy { get; set; }
		public string CreatedOn { get; set;}
	}
}