using System.ComponentModel.DataAnnotations;

namespace StudentFeedback.Models
{
	public class SurveyResult
	{
		[Key]
		public int Id { get; set; }
		public int SurveySchemaId { get; set; }
		public string ResponseBy { get; set; }
		public string Content { get; set; } 
	}
}
