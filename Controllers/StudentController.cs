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
	public class StudentController : ControllerBase
	{
		private readonly AuthDbContext _context;

		public StudentController(AuthDbContext context)
		{
			_context = context;
		}

		[HttpGet("static-surveys")]
		public async Task<ActionResult<IEnumerable<StaticSurveySchema>>> GetStaticSurveySchema()
		{
			if(_context == null || _context.StaticSurveySchemas == null)
				return NoContent();

			return await _context.StaticSurveySchemas.ToListAsync();
		}

		[HttpGet("static-survey-id")]
		public async Task<ActionResult<StaticSurveySchema>> GetSurveySchemaById(int id)
		{
			if (_context == null)
				return BadRequest();
			if (id <= 0)
				return BadRequest();

			var result = await _context.StaticSurveySchemas.Where(s => s.Id == id).FirstAsync();

			if (result == null)
				return BadRequest();


			return Ok(result.Content);
		}
	}
}
