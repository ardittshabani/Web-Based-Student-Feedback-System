using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudentFeedback.Migrations
{
    public partial class FixingMultiResponse5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Discriminator",
                table: "SurveySchemas",
                newName: "SurveyType");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SurveyType",
                table: "SurveySchemas",
                newName: "Discriminator");
        }
    }
}
