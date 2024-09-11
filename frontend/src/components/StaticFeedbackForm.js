import React from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { themeJson } from "../assets/theme";
import { json } from "../assets/json";

function SurveyComponent() {
    const survey = new Model(json);
    survey.applyTheme(themeJson);
    survey.onComplete.add((sender, options) => {
        console.log(JSON.stringify(sender.data, null, 3));
    });
    return (<Survey model={survey} />);
}

export default SurveyComponent;