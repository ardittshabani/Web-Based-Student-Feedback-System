using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudentFeedback.Migrations
{
    public partial class AddingLogic2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DepartmentId1",
                table: "Courses",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Courses_DepartmentId1",
                table: "Courses",
                column: "DepartmentId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_Departments_DepartmentId1",
                table: "Courses",
                column: "DepartmentId1",
                principalTable: "Departments",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Courses_Departments_DepartmentId1",
                table: "Courses");

            migrationBuilder.DropIndex(
                name: "IX_Courses_DepartmentId1",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "DepartmentId1",
                table: "Courses");
        }
    }
}
