using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentFeedback.Database;
using StudentFeedback.Models;
using System.Collections;

namespace StudentFeedback.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class SurveySchemaController : ControllerBase
	{
		private readonly AuthDbContext _context;

		public SurveySchemaController(AuthDbContext context)
		{
			_context = context;
		}

		[HttpGet("createdBy")]
		public async Task<ActionResult<IEnumerable<SurveySchema>>> GetSurveySchema(string userId)
		{
			if (_context == null)
				return BadRequest();
			if (_context.SurveySchemas == null)
				return BadRequest();

			var results = await _context.SurveySchemas.Where(s => s.CreatedBy == userId).ToListAsync();

			if (results == null)
				return NotFound();

			return Ok(results);
		}

		[HttpGet("id")]
		public async Task<ActionResult<SurveySchema>> GetSurveySchemaById(int id)
		{
			if (_context == null)
				return BadRequest();
			if (id <= 0)
				return BadRequest();

			var result = await _context.SurveySchemas.Where(s => s.Id == id).FirstAsync();

			if (result == null)
				return BadRequest();


			return Ok(result.Content);
		}

		[HttpPost]
		public async Task<IActionResult> AddSurveySchema([FromBody] SurveySchemaModel model)
		{
			if (_context == null || model == null || string.IsNullOrEmpty(model.Content))
				return BadRequest();

			var surveySchema = new SurveySchema {
				Content = model.Content, 
				CreatedBy = model.CreatedBy,
				CreatedOn = model.CreatedOn
			};

			_context.SurveySchemas.Add(surveySchema);
			await _context.SaveChangesAsync();

			return Ok();
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<SurveySchema>>> GetSurveyByStudentId()
		{
			if (_context == null)
				return BadRequest("Context is null");

			try
			{
				// Filter for base type only
				var surveys = await _context.SurveySchemas
					.Where(s => EF.Property<string>(s, "SurveyType") == "Base")
					.ToListAsync();
				return Ok(surveys);
			}
			catch (Exception ex)
			{
				// Log the exception details for debugging
				return StatusCode(500, $"Internal server error: {ex.Message}");
			}
		}
	}
}
