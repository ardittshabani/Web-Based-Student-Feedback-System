import React from 'react';

const FeedbackCard = ({ feedback }) => {
    const {content, dueDate, createdOn} = feedback;
    console.log(feedback)

    const parse = (data, index) => {
        const content = JSON.parse(data);
        return content[index];
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6 hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <h3 className="text-xl font-bold text-gray-800 mb-3">{parse(content, 'title')}</h3>
            <p className="text-gray-600">Created On: <span className="font-medium">{new Date(createdOn).toLocaleDateString()}</span></p>
            <p className="text-gray-600">Due: <span className="font-medium">{new Date(dueDate).toLocaleDateString()}</span></p>
            <button
                onClick={() => window.location.pathname = `feedbacks/${feedback.id}`}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 ease-in-out"
            >
                Start Feedback
            </button>
        </div>
    );
};

export default FeedbackCard;
