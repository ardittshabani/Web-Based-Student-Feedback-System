import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  // Import useParams from react-router-dom
import axios from '../api/axios'; // Adjust the path according to your project
import 'survey-analytics/survey.analytics.min.css';
import { Model } from 'survey-core';
import { VisualizationPanel } from 'survey-analytics';

const vizPanelOptions = {
    allowHideQuestions: false,
    allowDynamicLayout: false
};

export default function App() {
    const { index } = useParams();  // Get the surveyId from the URL
    const [survey, setSurvey] = useState(null);
    const [vizPanel, setVizPanel] = useState(null);
    const [surveyJson, setSurveyJson] = useState(null);
    const [surveyResults, setSurveyResults] = useState([]);

    useEffect(() => {
        const fetchSurveyData = async () => {
            try {
                // Fetch survey schema
                const surveyResponse = await axios.get(`SurveySchema/id?id=${index}`);
                console.log('Survey Schema:', surveyResponse.data);
                if (surveyResponse.data) {
                    setSurveyJson(surveyResponse.data);
                } else {
                    console.error('Survey schema data is empty');
                }

                // Fetch survey results
                const resultsResponse = await axios.get(`SurveyResult/surveyId?id=${index}`);
                console.log('Survey Results:', resultsResponse.data); // Log results data
                if (resultsResponse.data) {
                    const parsedResults = resultsResponse.data.map(result => JSON.parse(result));
                    setSurveyResults(parsedResults);
                } else {
                    console.error('Survey results data is empty');
                }
            } catch (error) {
                console.error('Error fetching survey data:', error);
            }
        };

        fetchSurveyData();
    }, [index]);  // Fetch data when surveyId changes

    useEffect(() => {
        if (surveyJson && surveyResults.length > 0) {
            const surveyInstance = new Model(surveyJson);
            setSurvey(surveyInstance);

            const vizPanelInstance = new VisualizationPanel(
                surveyInstance.getAllQuestions(),
                surveyResults,
                vizPanelOptions
            );
            vizPanelInstance.showToolbar = false;
            setVizPanel(vizPanelInstance);
        }
    }, [surveyJson, surveyResults]);

    useEffect(() => {
        if (vizPanel) {
            console.log('Rendering Visualization Panel');
            vizPanel.render("surveyVizPanel");
        }

        return () => {
            const panelElement = document.getElementById("surveyVizPanel");
            if (panelElement) {
                panelElement.innerHTML = "";
            }
        };
    }, [vizPanel]);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <div id="surveyVizPanel" className="w-full max-w-4xl p-6 bg-white shadow-md rounded-lg mb-6" />
        </div>
    );
}
