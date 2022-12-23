import React from 'react';

function FRQ(props) {

    let question = props.question;
    return (
        <>
        <p>{question.question}</p>
        <p>Free response question</p>
        </>
    );
}

export default FRQ;