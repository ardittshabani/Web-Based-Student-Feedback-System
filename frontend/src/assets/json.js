export const json = {
    "title": "Student Feedback",
    "completedHtml": "<h3>Thank you for leaving the Feedback</h3>",
    "pages": [
        {
            "name": "page1",
            "elements": [
                {
                    "type": "panel",
                    "name": "panel1",
                    "elements": [
                        {
                            "type": "text",
                            "name": "question1",
                            "title": "Student Name (Optional)"
                        }
                    ]
                },
                {
                    "type": "radiogroup",
                    "name": "question4",
                    "title": "To",
                    "isRequired": true,
                    "choices": [
                        {
                            "value": "Item 1",
                            "text": "Profesor"
                        },
                        {
                            "value": "Item 2",
                            "text": "Department"
                        }
                    ]
                },
                {
                    "type": "dropdown",
                    "name": "question5",
                    "visibleIf": "{question4} = 'Item 1'",
                    "title": "Choose Professor",
                    "choices": [
                        {
                            "value": "Item 1",
                            "text": "Profesori 1"
                        },
                        {
                            "value": "Item 2",
                            "text": "Profesori 2"
                        },
                        {
                            "value": "Item 3",
                            "text": "Profesori 3"
                        }
                    ]
                }
            ]
        },
        {
            "name": "page2",
            "elements": [
                {
                    "type": "text",
                    "name": "question3",
                    "title": "Title",
                    "isRequired": true
                },
                {
                    "type": "comment",
                    "name": "question2",
                    "title": "Description",
                    "isRequired": true
                }
            ]
        }
    ]
}