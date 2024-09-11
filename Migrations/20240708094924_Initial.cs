using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudentFeedback.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Questions_FeedbackForms_FormId",
                table: "Questions");

            migrationBuilder.DropTable(
                name: "Answers");

            migrationBuilder.DropTable(
                name: "Responses");

            migrationBuilder.DropIndex(
                name: "IX_Questions_FormId",
                table: "Questions");

            migrationBuilder.DropColumn(
                name: "FormId",
                table: "Questions");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "FeedbackForms");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "FeedbackForms");

            migrationBuilder.RenameColumn(
                name: "QuestionType",
                table: "Questions",
                newName: "Type");

            migrationBuilder.RenameColumn(
                name: "QuestionText",
                table: "Questions",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "FeedbackForms",
                newName: "Name");

            migrationBuilder.AddColumn<int>(
                name: "FeedbackFormsFormId",
                table: "Questions",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Questions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_FeedbackFormsFormId",
                table: "Questions",
                column: "FeedbackFormsFormId");

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_FeedbackForms_FeedbackFormsFormId",
                table: "Questions",
                column: "FeedbackFormsFormId",
                principalTable: "FeedbackForms",
                principalColumn: "FormId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Questions_FeedbackForms_FeedbackFormsFormId",
                table: "Questions");

            migrationBuilder.DropIndex(
                name: "IX_Questions_FeedbackFormsFormId",
                table: "Questions");

            migrationBuilder.DropColumn(
                name: "FeedbackFormsFormId",
                table: "Questions");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Questions");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Questions",
                newName: "QuestionType");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Questions",
                newName: "QuestionText");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "FeedbackForms",
                newName: "Title");

            migrationBuilder.AddColumn<int>(
                name: "FormId",
                table: "Questions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "FeedbackForms",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CreatedDate",
                table: "FeedbackForms",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "Responses",
                columns: table => new
                {
                    ResponseId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FormId = table.Column<int>(type: "int", nullable: false),
                    StudentId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SubmittedDate = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Responses", x => x.ResponseId);
                    table.ForeignKey(
                        name: "FK_Responses_FeedbackForms_FormId",
                        column: x => x.FormId,
                        principalTable: "FeedbackForms",
                        principalColumn: "FormId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Answers",
                columns: table => new
                {
                    AnswerId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AnswerText = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    QuestionId = table.Column<int>(type: "int", nullable: false),
                    ResponseId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Answers", x => x.AnswerId);
                    table.ForeignKey(
                        name: "FK_Answers_Questions_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "Questions",
                        principalColumn: "QuestionId");
                    table.ForeignKey(
                        name: "FK_Answers_Responses_ResponseId",
                        column: x => x.ResponseId,
                        principalTable: "Responses",
                        principalColumn: "ResponseId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Questions_FormId",
                table: "Questions",
                column: "FormId");

            migrationBuilder.CreateIndex(
                name: "IX_Answers_QuestionId",
                table: "Answers",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_Answers_ResponseId",
                table: "Answers",
                column: "ResponseId");

            migrationBuilder.CreateIndex(
                name: "IX_Responses_FormId",
                table: "Responses",
                column: "FormId");

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_FeedbackForms_FormId",
                table: "Questions",
                column: "FormId",
                principalTable: "FeedbackForms",
                principalColumn: "FormId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
