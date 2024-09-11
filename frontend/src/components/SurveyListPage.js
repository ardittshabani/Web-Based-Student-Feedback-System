import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import {jwtDecode} from 'jwt-decode';  // Import correctly

function SurveyListPage() {
    const navigate = useNavigate();
    const [surveys, setSurveys] = useState([]);
    const [userId, setUserId] = useState(null);

    // Fetch user ID from the token
    useEffect(() => {
        const getIdFromToken = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    const username = decodedToken.sub;
                    const response = await axios.get(`/Account/user?username=${username}`);
                    setUserId(response.data.id);
                } catch (error) {
                    console.error("Invalid token format", error);
                }
            } else {
                console.error("No valid token found");
            }
        };
        getIdFromToken();
    }, []);  // Added empty dependency array to ensure it only runs once

    // Fetch surveys once userId is available
    useEffect(() => {
        if (userId) {
            const fetchSurveys = async () => {
                const SURVEY_URL = `SurveySchema/createdBy?userId=${userId}`;
                try {
                    const response = await axios.get(SURVEY_URL);
                    setSurveys(response.data);
                } catch (error) {
                    console.error('Error fetching surveys:', error);
                }
            };
            fetchSurveys();
        }
    }, [userId]);  // Fetch surveys when userId is updated

    // Parse survey content
    const parse = (data) => {
        const content = JSON.parse(data);
        return content.title;
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Your Surveys</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {surveys.length > 0 ? (
                    surveys.map(survey => (
                        <div key={survey.id} className="bg-white shadow-lg rounded-lg p-6">
                            <h2 className="text-xl font-semibold">{parse(survey.content)}</h2>
                            <p className="text-gray-500">Created at: {survey.createdOn}</p>
                            <p className="text-gray-500">Responses: {survey.responsesCount}</p>
                            <button
                                onClick={() => navigate(`/analyze/${survey.id}`)}
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                            >
                                Analyze
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No surveys available</p>
                )}
            </div>
        </div>
    );
}

export default SurveyListPage;
