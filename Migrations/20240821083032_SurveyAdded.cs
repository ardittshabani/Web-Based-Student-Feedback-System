using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudentFeedback.Migrations
{
    public partial class SurveyAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Questions");

            migrationBuilder.DropTable(
                name: "FeedbackForms");

            migrationBuilder.CreateTable(
                name: "SurveySchemas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SurveySchemas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SurveyResults",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SurveySchemaId = table.Column<int>(type: "int", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SurveyResults", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SurveyResults_SurveySchemas_SurveySchemaId",
                        column: x => x.SurveySchemaId,
                        principalTable: "SurveySchemas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SurveyResults_SurveySchemaId",
                table: "SurveyResults",
                column: "SurveySchemaId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SurveyResults");

            migrationBuilder.DropTable(
                name: "SurveySchemas");

            migrationBuilder.CreateTable(
                name: "FeedbackForms",
                columns: table => new
                {
                    FormId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FeedbackForms", x => x.FormId);
                });

            migrationBuilder.CreateTable(
                name: "Questions",
                columns: table => new
                {
                    QuestionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FeedbackFormsFormId = table.Column<int>(type: "int", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions", x => x.QuestionId);
                    table.ForeignKey(
                        name: "FK_Questions_FeedbackForms_FeedbackFormsFormId",
                        column: x => x.FeedbackFormsFormId,
                        principalTable: "FeedbackForms",
                        principalColumn: "FormId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Questions_FeedbackFormsFormId",
                table: "Questions",
                column: "FeedbackFormsFormId");
        }
    }
}
