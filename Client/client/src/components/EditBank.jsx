import React from 'react';
import { DataContext } from '../DataContext';
import { useContext, useEffect, useState} from 'react'
import {Card, Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Client from '../services/api';
import CreateQuestionForm from './CreateQuestionForm';
import MultipleChoice from './QuestionComponents/MultipleChoice';
import FRQ from './QuestionComponents/FRQ';
import TrueFalse from './QuestionComponents/TrueFalse';


const StyledWrapper = styled.div `
height: 150vh;

.form-and-display{
    display:flex;
    flex-direction:row; 
    justify-content:space-evenly;
    border:2px solid black; 
    height: 120vh;
}
.create-form{
    width:50%;
}
.checkbox{
    margin:10px;
}
.multipleChoice{
    display:flex;
    flex-direction: column;
}
.correct{
    align-self:center;
    width: 10%
}
.MC{
    margin: 10px;
    align-self:center;
    width: 50%
}
`;


function EditBank(props) {
    const {currentBank, setCurrentBank} = useContext(DataContext)
    const [counter, setCounter] = useState(0)
    const {refresh, setRefresh} = useContext(DataContext)
    let navigate = useNavigate();

    const toTestMaker = () => {
        navigate('/design_test')
    }
    
    useEffect(()=>{
        const updateQ = async () => {
            try {
                const bank = await Client.get(`/api/bank/bankId/${currentBank.id}`)
                setCurrentBank(bank.data)
            } catch (error) {
                throw error
            }
        }
        updateQ()
        setCounter(counter+1)
    },[refresh])


    return counter > 0 ?  (
        <StyledWrapper>
        <div style={{display:"flex", flexDirection:"column"}}>
            <h1>{currentBank.title}</h1>
            <div className ="form-and-display">
                <div className="create-form">
                    <h3>Create Question</h3>
{/* Create Question Form */}
                    <CreateQuestionForm/>
                    <Button style={{marginTop:"50px"}} onClick = {toTestMaker}>Design Test</Button>
                </div>
{/* Display Questions */}
                {currentBank.q.length > 0 ? (
                <div style={{overflowY: "scroll", width:"50%"}}>
                    {
                        currentBank.q.map((question, index)=>(
                            <Card key={question.id}>

                                { 
                                question.type === 'MC' ? ( <MultipleChoice question = {question}/>) : 
                                question.type === 'FR' ? ( <FRQ question = {question}/>) :
                                ( <TrueFalse question = {question}/>)
                                }

                            </Card>
                                ))
                    }
                </div>
                ) : (<div>No Questions</div>) }
            </div>
        </div>
        </StyledWrapper>
    ): (<h1>...Loading</h1>);}

export default EditBank;



{/* <img src={questionForm.image}/> */}