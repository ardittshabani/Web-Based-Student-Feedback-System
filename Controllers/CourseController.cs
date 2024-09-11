using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentFeedback.Database;
using StudentFeedback.Models;

namespace StudentFeedback.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CourseController : ControllerBase
	{
		private readonly AuthDbContext _context;

		public CourseController(AuthDbContext context)
		{
			_context = context;
		}

		[HttpPost("add")]
		public async Task<IActionResult> AddCourse([FromBody] Course course)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			_context.Courses.Add(course);
			await _context.SaveChangesAsync();
			return Ok(new { message = "Course added successfully" });
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<Course>>> GetCourses()
		{
			if(_context == null || _context.Courses == null) return BadRequest(ModelState);

			return await _context.Courses.ToListAsync();
		}
	}
}
