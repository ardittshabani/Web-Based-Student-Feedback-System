using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudentFeedback.Migrations
{
    public partial class FixingMultiResponse4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "SurveySchemas",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "SurveySchemas");
        }
    }
}
