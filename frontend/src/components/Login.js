import { useState } from 'react';
import React from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const LOGIN_URL = "Account/login";

const Login = () => {
    const [formData, setFormData] = useState({
        Username: '',
        Password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(LOGIN_URL, formData);
            const { token, roles } = data;

            localStorage.setItem('token', token);
            localStorage.setItem('role', roles[0]);

            setFormData({
                Username: '',
                Password: ''
            });

            navigate('/dashboard');

        } catch (e) {
            setError('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-7">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>
                <form onSubmit={handleLogin}>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    <div className="mb-4">
                        <label htmlFor="Username" className="block text-gray-700 font-semibold mb-2">Username</label>
                        <input
                            type="text"
                            id="Username"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            value={formData.Username}
                            onChange={(e) => setFormData({ ...formData, Username: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="Password" className="block text-gray-700 font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            id="Password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            value={formData.Password}
                            onChange={(e) => setFormData({ ...formData, Password: e.target.value })}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-4">
                    Forgot your password? <a href="#" className="text-blue-500 hover:underline">Reset it here</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
