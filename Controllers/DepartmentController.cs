using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentFeedback.Database;
using StudentFeedback.Models;

namespace StudentFeedback.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class DepartmentController : ControllerBase
	{
		private readonly AuthDbContext _context;

		public DepartmentController(AuthDbContext context)
		{
			_context = context;
		}

		[HttpPost("add")]
		public async Task<IActionResult> AddDepartment([FromBody] Department department)
		{
			_context.Departments.Add(department);
			await _context.SaveChangesAsync();
			return Ok(new { message = "Department added successfully" });
		}

		[HttpGet]
		public async Task<IActionResult> GetDepartments()
		{
			var departments = await _context.Departments.ToListAsync();
			return Ok(departments);
		}
	}
}
