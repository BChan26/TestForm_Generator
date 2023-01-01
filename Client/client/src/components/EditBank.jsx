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

.form-and-display{
    display:flex;
    flex-direction:row; 
    justify-content:space-evenly;
    height: 80vh;
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
    const {refresh} = useContext(DataContext)
    let navigate = useNavigate();

    const toTestMaker = () => {
        navigate('/test_maker')
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
        setCounter(c=>c+1)
    },[refresh, currentBank.id, setCurrentBank])


    return counter > 0 ?  (
        <StyledWrapper>
        <div style={{display:"flex", flexDirection:"column"}}>
            <h1 style={{marginLeft:200}}>{currentBank.title}<Button style={{ marginLeft:100}} onClick = {toTestMaker}>Design Test</Button></h1>
            <div className ="form-and-display">
                <div className="create-form">
                    <h3 style={{marginLeft:10}}>Create Question</h3>
{/* Create Question Form */}
                    <CreateQuestionForm/>
                    
                </div>
{/* Display Questions */}
                {currentBank.q.length > 0 ? (
                <div style={{overflowY: "scroll", width:"50%", border:"2px solid grey", height:'75vh'}}>
                    {
                        currentBank.q.map((question, index)=>(
                            <Card key={question.id} style={{margin:10, padding:10, boxShadow: "2px 2px 2px grey"}}>

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