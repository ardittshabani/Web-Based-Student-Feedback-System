import React, { useState } from "react";
import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.css";
import axios from '../api/axios';
import { jwtDecode } from 'jwt-decode';

const SurveyCreatorWidget = () => {
    const [creator, setCreator] = useState(null);

    if (!creator) {
        const options = { showLogicTab: true, showTranslationTab: true };
        const newCreator = new SurveyCreator(options);

        newCreator.saveSurveyFunc = async (no, callback) => {
            const token = localStorage.getItem('token');
            if (token && typeof token === 'string') {
                try {
                    const decodedToken = jwtDecode(token);
                    const username = decodedToken.sub;

                    const results = await axios.get(`/Account/user?username=${username}`);
                    const createdBy = results.data.id
                    const createdOn = new Date().toLocaleDateString();

                    const surveyData = newCreator.JSON;
                    console.log('surveydata: ', surveyData)
                    const response = await axios.post('SurveySchema', {
                        content: JSON.stringify(surveyData),
                        createdBy,
                        createdOn,
                    });

                    console.log('Survey submitted successfully', response.data);
                    callback(no, true);
                } catch (error) {
                    console.error('Error submitting survey:', error);
                    callback(no, false);
                }
            }
        };
        setCreator(newCreator);
    }

    return (
        <div style={{ height: "calc(100% - 0px)" }}>
            <SurveyCreatorComponent creator={creator} />
        </div>
    );
};

export default SurveyCreatorWidget;


