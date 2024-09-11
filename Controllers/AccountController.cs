using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using StudentFeedback.Database;
using StudentFeedback.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace StudentFeedback.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AccountController : ControllerBase
	{
		private readonly UserManager<IdentityUser> _userManager;
		private readonly RoleManager<IdentityRole> _roleManager;
		private readonly IConfiguration _configuration;
		private readonly AuthDbContext _context;

		public AccountController (UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, AuthDbContext context)
		{
			_userManager = userManager;
			_roleManager = roleManager;
			_configuration = configuration;
			_context = context;
		}
		[HttpPost("register")]
		public async Task<IActionResult> Register([FromBody] Register model)
		{
			// Log received data
			Console.WriteLine($"Register request received for: {model.Email}, Role: {model.Role}");

			var existingUser = await _userManager.FindByEmailAsync(model.Email);
			if (existingUser != null)
			{
				return BadRequest(new { message = "User with this email already exists" });
			}

			var user = new IdentityUser { UserName = model.Email, Email = model.Email };
			var result = await _userManager.CreateAsync(user, model.Password);

			if (!result.Succeeded)
			{
				return BadRequest(new { message = "Error creating user: " + string.Join(", ", result.Errors.Select(e => e.Description)) });
			}

			if (model.Role == "Student")
			{
				var student = new Student
				{
					Id = user.Id,
					FullName = model.FullName,
					User = user
				};

				try
				{
					await _context.Students.AddAsync(student);
					await _context.SaveChangesAsync();
				}
				catch (Exception ex)
				{
					return BadRequest(new { message = "Error creating student: " + ex.Message });
				}
			}
			else if (model.Role == "Staf")
			{
				var professor = new Professor
				{
					Id = user.Id,
					FullName = model.FullName,
					User = user
				};

				try
				{
					await _context.Professors.AddAsync(professor);
					await _context.SaveChangesAsync();
				}
				catch (Exception ex)
				{
					return BadRequest(new { message = "Error creating professor: " + ex.Message });
				}
			}

			var roleResult = await _userManager.AddToRoleAsync(user, model.Role);

			if (roleResult.Succeeded)
			{
				return Ok(new { message = "User registered and role assigned successfully" });
			}
			return BadRequest(new { message = "Error assigning role: " + string.Join(", ", roleResult.Errors.Select(e => e.Description)) });
		}



		[HttpPost("login")]
		public async Task<IActionResult> Login([FromBody] Login model)
		{
			var user = await _userManager.FindByNameAsync(model.Username);
			if (user!= null && await _userManager.CheckPasswordAsync(user, model.Password))
			{
				var userRoles = await _userManager.GetRolesAsync(user);

				var authClaims = new List<Claim>
				{
					new Claim(JwtRegisteredClaimNames.Sub, user.UserName!),
					new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
				};

				authClaims.AddRange(userRoles.Select(role => new Claim(ClaimTypes.Role, role)));

				var token = new JwtSecurityToken(
						issuer: _configuration["Jwt:Issuer"],
						expires: DateTime.Now.AddMinutes(double.Parse(_configuration["Jwt:ExpiryMinutes"]!)),
						claims: authClaims,
						signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!)),
						SecurityAlgorithms.HmacSha256
						)
					);
				return Ok(new {Token = new JwtSecurityTokenHandler().WriteToken(token),
							   Roles = userRoles
						});;
			}
			return Unauthorized();
		}

		[HttpPost("add-role")]
		public async Task<IActionResult> AddRole([FromBody] string role)
		{
			if(!await _roleManager.RoleExistsAsync(role))
			{
				var result = await _roleManager.CreateAsync(new IdentityRole(role));
				if(result.Succeeded)
					return Ok(new {message = "Role Added Succesfully"});
				return BadRequest(result.Errors);
			}
			return BadRequest("Role Exists");
		}

		[HttpPost("assign-role")]
		public async Task<IActionResult> AssignRole([FromBody] UserRole model)
		{
			var user = await _userManager.FindByNameAsync(model.Username);

			if(user == null)
			{
				return BadRequest("User Not Found");
			}

			var result = await _userManager.AddToRoleAsync(user, model.Role);

			if (result.Succeeded)
			{
				return Ok(new {message = "Role assigned succefully"});
			}
			return BadRequest(result.Errors);
		}

		[HttpGet("user")]
		public async Task<ActionResult<object>> GetIdentityUserByUserName(string username)
		{
			if (_context == null || _context.Users == null)
				return BadRequest();

			return await _context.Users.Where(u => u.UserName == username).FirstOrDefaultAsync();
		}
	}
}