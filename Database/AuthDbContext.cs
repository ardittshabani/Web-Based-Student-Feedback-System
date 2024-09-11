using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using StudentFeedback.Models;

namespace StudentFeedback.Database
{
	public class AuthDbContext : IdentityDbContext<IdentityUser>
	{
		public AuthDbContext(DbContextOptions options) : base(options) 
		{
		
		}
		public DbSet<Department> Departments { get; set; }
		public DbSet<Course> Courses { get; set; }
		public DbSet<Student> Students { get; set; }
		public DbSet<Professor> Professors { get; set; }
		public DbSet<SurveySchema> SurveySchemas { get; set; }
		public DbSet<StaticSurveySchema> StaticSurveySchemas { get; set; }
		public DbSet<SurveyResult> SurveyResults { get; set; }
		public DbSet<Notification> Notifications { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<SurveyResult>()
				.HasOne<SurveySchema>()
				.WithMany()
				.HasForeignKey(r => r.SurveySchemaId);

			modelBuilder.Entity<Student>()
				.HasOne(s => s.User)
				.WithOne()
				.HasForeignKey<Student>(s => s.Id);

			modelBuilder.Entity<Professor>()
				.HasOne(p => p.User)
				.WithOne()
				.HasForeignKey<Professor>(p => p.Id);

			modelBuilder.Entity<Course>()
				.HasOne<Department>()
				.WithMany()
				.HasForeignKey(c => c.DepartmentId);

			modelBuilder.Entity<SurveySchema>()
				.HasDiscriminator<string>("SurveyType")
				.HasValue<SurveySchema>("Base")
				.HasValue<StaticSurveySchema>("Static");

			base.OnModelCreating(modelBuilder);
		}
	}
}
