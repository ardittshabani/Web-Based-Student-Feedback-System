using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentFeedback.Database;
using StudentFeedback.Models;

namespace StudentFeedback.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AdminController : ControllerBase
	{
		public readonly AuthDbContext _context;

		public AdminController(AuthDbContext context)
		{
			_context = context;
		}

		[HttpGet("professor")]
		public async Task<ActionResult<IEnumerable<Professor>>> GetProfessors()
		{
			if (_context == null || _context.Professors == null)
				return BadRequest("Not Found");

			return await _context.Professors.ToListAsync();
		}

		[HttpGet("student")]
		public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
		{
			if (_context == null || _context.Students == null)
				return BadRequest("Not Found");

			return await _context.Students.ToListAsync();
		}

		[HttpPost("static-surveys")]
		public async Task<IActionResult> AddStaticSurveySchema([FromBody] StaticSurveySchemaModel model)
		{
			if (_context == null || model == null || string.IsNullOrEmpty(model.Content))
				return BadRequest();

			var surveyStaticSchema = new StaticSurveySchema
			{
				Content = model.Content,
				CreatedBy = model.CreatedBy,
				CreatedOn = model.CreatedOn,
				Description = null
			};

			_context.StaticSurveySchemas.Add(surveyStaticSchema);
			await _context.SaveChangesAsync();

			return Ok();
		}
	}
}

public class StaticSurveySchemaModel
{
	public string Content { get; set; }
	public string CreatedBy { get; set; }
	public string CreatedOn { get; set; }
	public string? Description { get; set; }

}
