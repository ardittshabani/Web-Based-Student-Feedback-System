using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentFeedback.Database;

namespace StudentFeedback.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AssignmentController : ControllerBase
	{
		private readonly AuthDbContext _context;

		public AssignmentController(AuthDbContext context)
		{
			_context = context;
		}

		[HttpPost("assign-professor")]
		public async Task<IActionResult> AssignProfessor([FromBody] AssignProfessor model)
		{
			var course = await _context.Courses.Include(c => c.Professors).FirstOrDefaultAsync(c => c.Id == model.CourseId);
			var professor = await _context.Professors.FindAsync(model.ProfessorId);

			if (course == null || professor == null)
				return BadRequest("Invalid course or professor ID");

			if (!course.Professors.Contains(professor))
			{
				course.Professors.Add(professor);
				await _context.SaveChangesAsync();
			}

			return Ok(new { message = "Professor assigned successfully" });
		}

		[HttpPost("assign-student")]
		public async Task<IActionResult> AssignStudent([FromBody] AssignStudent model)
		{
			var course = await _context.Courses.Include(c => c.Students).FirstOrDefaultAsync(c => c.Id == model.CourseId);
			var student = await _context.Students.FindAsync(model.StudentId);

			if (course == null || student == null)
				return BadRequest("Invalid course or student ID");

			if (!course.Students.Contains(student))
			{
				course.Students.Add(student);
				await _context.SaveChangesAsync();
			}

			return Ok(new { message = "Student assigned successfully" });
		}
	}

	public class AssignProfessor
	{
		public string ProfessorId { get; set; }
		public int CourseId { get; set; }
	}

	public class AssignStudent
	{
		public string StudentId { get; set; }
		public int CourseId { get; set; }
	}
}
