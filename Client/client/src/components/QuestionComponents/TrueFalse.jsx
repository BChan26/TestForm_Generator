import React from 'react';

function TrueFalse(props) {
    let question = props.question;
    return (
        <>
        <p>{question.question}</p>
        <p>{question.correct}</p>
        
        </>
    );
}

export default TrueFalse;