import React from 'react';

export default function Profile() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-48 flex justify-center items-center">
                    <div className="relative">
                        <img
                            className="w-32 h-32 rounded-full border-4 border-white shadow-md"
                            src="https://via.placeholder.com/150"
                            alt="Profile"
                        />
                        <div className="text-center mt-4">
                            <h2 className="text-3xl font-semibold text-white">John Doe</h2>
                            <p className="text-white text-sm">Professor of Computer Science</p>
                        </div>
                    </div>
                </div>

                {/* Profile Information Section */}
                <div className="p-6">
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-4">About Me</h3>
                        <p className="text-gray-700">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet orci vel arcu tincidunt
                            scelerisque. Nulla facilisi. Integer at fermentum metus, a aliquet orci.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-600 font-semibold">Email:</p>
                                <p className="text-gray-800">johndoe@example.com</p>
                            </div>
                            <div>
                                <p className="text-gray-600 font-semibold">Phone:</p>
                                <p className="text-gray-800">+1 234 567 890</p>
                            </div>
                            <div>
                                <p className="text-gray-600 font-semibold">Office:</p>
                                <p className="text-gray-800">Room 123, CS Department</p>
                            </div>
                            <div>
                                <p className="text-gray-600 font-semibold">Office Hours:</p>
                                <p className="text-gray-800">Mon, Wed, Fri - 10:00 AM to 12:00 PM</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-4">Courses</h3>
                        <ul className="list-disc list-inside text-gray-700">
                            <li>Introduction to Computer Science</li>
                            <li>Advanced Algorithms</li>
                            <li>Artificial Intelligence</li>
                            <li>Data Structures and Analysis</li>
                        </ul>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-4">Research Interests</h3>
                        <p className="text-gray-700">
                            My research interests include Machine Learning, Artificial Intelligence, Data Science, and Software
                            Engineering. I am particularly interested in how these fields can be applied to solve real-world problems
                            in healthcare, education, and more.
                        </p>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="bg-gray-200 p-4 text-center">
                    <p className="text-gray-600">&copy; 2024 University Name. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}
