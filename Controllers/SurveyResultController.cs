using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentFeedback.Database;
using StudentFeedback.Models;

namespace StudentFeedback.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class SurveyResultController : ControllerBase
	{
		private readonly AuthDbContext _context;

		public SurveyResultController(AuthDbContext context)
		{
			_context = context;
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<SurveyResult>>> GetSurveyResults()
		{
			if (_context == null)
				return BadRequest();
			if (_context.SurveyResults == null)
				return BadRequest();

			var results = await _context.SurveyResults.ToListAsync();

			if (results == null)
				return NotFound();

			return Ok(results);
		}

		[HttpGet("id")]
		public async Task<ActionResult<SurveyResult>> GetSurveyResultById(int id)
		{
			if (_context == null)
				return BadRequest();
			if (id <= 0)
				return BadRequest();

			var result = await _context.SurveyResults.Where(s => s.Id == id).FirstAsync();

			if (result == null)
				return BadRequest();


			return Ok(result.Content);
		}

		[HttpPost]
		public async Task<IActionResult> AddSurveyResult([FromBody] SurveyResultModel model)
		{
			if (_context == null || model == null || string.IsNullOrEmpty(model.Content))
				return BadRequest();

			var surveyResult = new SurveyResult {SurveySchemaId = model.SurveyId ,Content = model.Content, ResponseBy = model.ResponseBy };

			_context.SurveyResults.Add(surveyResult);
			await _context.SaveChangesAsync();

			return Ok();
		}

		[HttpGet("surveyId")]
		public async Task<ActionResult<IEnumerable<object>>> GetSurveyResultsBySurveySchemaId(int id)
		{
			if (_context == null || id <= 0)
				return BadRequest();

			var results = await _context.SurveyResults
										.Where(s => s.SurveySchemaId == id)
										.Select(s => s.Content)
										.ToListAsync();

			if (results == null || results.Count == 0)
				return NotFound();

			return Ok(results);
		}

		[HttpGet("responder")]
		public async Task<ActionResult<bool>> HasUserRespondedOnce(int surveyId, string responderId)
		{
			if (surveyId <= 0 || string.IsNullOrEmpty(responderId))
				return BadRequest("Invalid surveyId or responderId.");

			if (_context == null || _context.SurveyResults == null)
				return NotFound("Database context or SurveyResults not found.");

			var surveyResponse = await _context.SurveyResults
				.FirstOrDefaultAsync(s => s.SurveySchemaId == surveyId && s.ResponseBy == responderId);

			if (surveyResponse == null)
				return Ok(false);

			return Ok(true);
		}

	}
}
