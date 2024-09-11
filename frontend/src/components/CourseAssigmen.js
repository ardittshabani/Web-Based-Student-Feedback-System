import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const AssignProfessorForm = () => {
    const [professors, setProfessors] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedProfessor, setSelectedProfessor] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const token = localStorage.getItem('token')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profResponse = await axios.get('Admin/Professor');
                const courseResponse = await axios.get('Course');
                setProfessors(profResponse.data);
                setCourses(courseResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/Assignment/assign-professor', {
                ProfessorId: selectedProfessor,
                CourseId: selectedCourse
            });
            alert('Professor assigned successfully');
        } catch (error) {
            alert('Error assigning professor: ' + error.response.data);
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Assign Professor to Course</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="professor">
                        Professor
                    </label>
                    <select
                        id="professor"
                        value={selectedProfessor}
                        onChange={(e) => setSelectedProfessor(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                    >
                        <option value="">Select a Professor</option>
                        {professors.map((prof) => (
                            <option key={prof.id} value={prof.id}>
                                {prof.fullName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="course">
                        Course
                    </label>
                    <select
                        id="course"
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                    >
                        <option value="">Select a Course</option>
                        {courses.map((course) => (
                            <option key={course.id} value={course.id}>
                                {course.title}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
                >
                    Assign Professor
                </button>
            </form>
        </div>
    );
};

const AssignStudentForm = () => {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const studentResponse = await axios.get('Admin/student');
                const courseResponse = await axios.get('Course');
                setStudents(studentResponse.data);
                setCourses(courseResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('Assignment/assign-student', {
                StudentId: selectedStudent,
                CourseId: selectedCourse
            });
            alert('Student assigned successfully');
        } catch (error) {
            alert('Error assigning student: ' + error.response.data);
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Assign Student to Course</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="student">
                        Student
                    </label>
                    <select
                        id="student"
                        value={selectedStudent}
                        onChange={(e) => setSelectedStudent(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                    >
                        <option value="">Select a Student</option>
                        {students.map((student) => (
                            <option key={student.id} value={student.id}>
                                {student.fullName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="course">
                        Course
                    </label>
                    <select
                        id="course"
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                    >
                        <option value="">Select a Course</option>
                        {courses.map((course) => (
                            <option key={course.id} value={course.id}>
                                {course.title}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
                >
                    Assign Student
                </button>
            </form>
        </div>
    );
};

const AdminDashboard = () => {
    return (
        <div className="flex flex-col space-y-6 p-6">
            <AssignProfessorForm />
            <AssignStudentForm />
        </div>
    );
};

export default AdminDashboard;
