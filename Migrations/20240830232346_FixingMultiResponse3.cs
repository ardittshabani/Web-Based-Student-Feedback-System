using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudentFeedback.Migrations
{
    public partial class FixingMultiResponse3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "SurveySchemas",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "SurveySchemas");
        }
    }
}
