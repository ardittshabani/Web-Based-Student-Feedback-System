import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const DepartmentForm = () => {
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('Department/add', { Name: name });
            alert('Department added successfully');
        } catch (error) {
            alert('Error adding department: ' + error.response.data);
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Add Department</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                        Department Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
                >
                    Add Department
                </button>
            </form>
        </div>
    );
};

const CourseForm = () => {
    const [title, setTitle] = useState('');
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get('Department');
                setDepartments(response.data);
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };
        fetchDepartments();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('Course/add', {
                Title: title,
                DepartmentId: selectedDepartment,
                professors: null,
                students: null
            });
            alert('Course added successfully');
        } catch (error) {
            alert('Error adding course: ' + error.response.data);
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Add Course</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
                        Course Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="department">
                        Department
                    </label>
                    <select
                        id="department"
                        name="department"
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                    >
                        <option value="">Select a Department</option>
                        {departments.map((dept) => (
                            <option key={dept.id} value={dept.id}>
                                {dept.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
                >
                    Add Course
                </button>
            </form>
        </div>
    );
};

const AdminDashboard = () => {
    return (
        <div className="flex flex-col space-y-6 p-6">
            <DepartmentForm />
            <CourseForm />
        </div>
    );
};

export default AdminDashboard;
