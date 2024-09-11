using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace StudentFeedback.Controllers
{
	[Authorize(Roles = "Professor" )]
	[Route("api/[controller]")]
	[ApiController]
	public class ProfessorController : ControllerBase
	{
		[HttpGet]
		public IActionResult Get()
		{
			return Ok("You have accessed the Student Controller");
		}
	}
}
