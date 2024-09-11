import React, { useState, useEffect } from "react";
import FeedbackCard from "./FeedbackCard";
import axios from "../api/axios";
import { jwtDecode } from "jwt-decode";
import FilterSortBar from "./FilterSortBar";

export default function StudentFeedbackList() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);
    const [filter, setFilter] = useState('');
    const [sortOption, setSortOption] = useState('');

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
    }, []);

    // Fetch feedbacks once userId is available
    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get('SurveySchema');
                setFeedbacks(response.data);
                setFilteredFeedbacks(response.data);
            } catch (error) {
                setError("Failed to load feedbacks. Please try again later.");
                console.error("Error fetching feedbacks:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFeedbacks();
    }, []);

    useEffect(() => {
        let updatedFeedbacks = [...feedbacks];

        // Apply filter
        if (filter) {
            updatedFeedbacks = updatedFeedbacks.filter(feedback => {
                try {
                    const content = JSON.parse(feedback.content);
                    return content.title && content.title.toLowerCase().includes(filter.toLowerCase());
                } catch (error) {
                    console.error('Error parsing feedback content:', error);
                    return false;
                }
            });
        }

        // Apply sorting
        if (sortOption === 'dateAsc') {
            updatedFeedbacks.sort((a, b) => new Date(a.createdOn) - new Date(b.createdOn));
        } else if (sortOption === 'dateDesc') {
            updatedFeedbacks.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
        }

        setFilteredFeedbacks(updatedFeedbacks);
    }, [feedbacks, filter, sortOption]);

    if (loading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <p className="text-gray-500">Loading feedbacks...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="w-full h-full p-4">
            <FilterSortBar filter={filter} setFilter={setFilter} sortOption={sortOption} setSortOption={setSortOption} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredFeedbacks.length > 0 ? (
                    filteredFeedbacks.map(feedback => (
                        <FeedbackCard key={feedback.id} feedback={feedback} />
                    ))
                ) : (
                    <p className="text-gray-500">No feedbacks available</p>
                )}
            </div>
        </div>
    );
}
