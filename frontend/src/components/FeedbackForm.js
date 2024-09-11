import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Survey } from 'survey-react-ui';
import { Model } from 'survey-core';
import 'survey-core/defaultV2.min.css';
import axios from '../api/axios';
import { jwtDecode } from 'jwt-decode';

const FeedbackForm = () => {
    const { index: surveyId } = useParams();
    const [surveyJson, setSurveyJson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const checkUserSubmission = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token && typeof token === 'string') {
                    const decodedToken = jwtDecode(token);
                    const username = decodedToken.sub;
                    const results = await axios.get(`/Account/user?username=${username}`);
                    const userId = results.data.id
                    console.log(userId)
                    // Check if the user has already submitted this survey
                    const response = await axios.get(`/SurveyResult/responder?surveyId=${surveyId}&responderId=${userId}`);
                    setHasSubmitted(response.data);
                    console.log(response.data) // Assuming the API returns a boolean
                }
            } catch (error) {
                console.error('Error checking submission status:', error);
                setError('Failed to check submission status. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        const fetchSurveyData = async () => {
            try {
                const response = await axios.get(`SurveySchema/id?id=${surveyId}`);
                setSurveyJson(response.data);
            } catch (error) {
                console.error('Error fetching survey data:', error);
                setError('Failed to load the survey. Please try again later.');
            }
        };

        checkUserSubmission();
        fetchSurveyData();
    }, [surveyId]);

    // Handle survey completion
    const handleSurveyComplete = useCallback(async (sender) => {
        const surveyData = sender.data;

        if (!surveyData) {
            console.error('No data received from survey');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const decodedToken = jwtDecode(token);
            const username = decodedToken.sub;
            const results = await axios.get(`/Account/user?username=${username}`);
            const userId = results.data.id

            await axios.post('SurveyResult', {
                SurveyId: surveyId,  // Dynamic surveyId
                Content: JSON.stringify(surveyData),  // Convert data to JSON string
                ResponseBy: userId  // Include the user who submitted the survey
            });

            alert('Feedback submitted successfully!');
            setHasSubmitted(true);  // Mark as submitted after a successful submission
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('There was an error submitting your feedback. Please try again later.');
        }
    }, [surveyId]);

    // Create and configure the survey model only when surveyJson is available
    const surveyModel = surveyJson ? new Model(surveyJson) : null;

    // Add the completion handler to the survey model
    useEffect(() => {
        if (surveyModel) {
            surveyModel.onComplete.add(handleSurveyComplete);
        }
    }, [surveyModel, handleSurveyComplete]);

    return (
        <div className='w-full h-full flex justify-center items-center'>
            {loading ? (
                <p className="text-gray-500">Loading survey...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : hasSubmitted ? (
                <p className="text-gray-500">You have already submitted this survey. Thank you!</p>
            ) : (
                surveyModel && <Survey model={surveyModel} />
            )}
        </div>
    );
};

export default FeedbackForm;
