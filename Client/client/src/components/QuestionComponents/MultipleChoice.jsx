import React from 'react';

function MultipleChoice(props) {

let question = props.question;
    
    return (
        <>
        <p>{question.question}</p>
            {
                question.answers.map((answer, index)=>(
                <p key={index} style={{margin:"0"}}>
                    
                    {String.fromCharCode(97 + index)}. {answer}
                </p>
            ))
        }
        <p>Correct: {question.correct}</p> 
        </>
    );
}

export default MultipleChoice;