import React from 'react';
import {DataContext} from '../DataContext'
import { useContext, useState, useEffect } from 'react';
import Client from '../services/api';
import styled from 'styled-components';
import {Card} from 'react-bootstrap'

const StyledWrapper = styled.div `
.bank-details {
    text-align: left;
    width: 50%;
}
.request-card{
    width:50%;
}

`;


function DesignTest(props) {

    const {user} = useContext(DataContext)
    const [banks, setBanks] = useState([])
    const [requests, setRequest] = useState([])
    const {testData, setTestData} = useContext(DataContext)
    const [requestForm, setRequestForm] = useState({
        bank_id:1,
        difficulty:1,
    })
    const [questionsByDifficulty, setQuestionsByDifficulty] = useState([])
    const [refresh, setRefresh] = useState(0)

    const handleChange = (e) =>{
        setRequestForm({...requestForm, [e.target.name]: e.target.value })
        if (e.target.name === "difficulty"){
            const getQuestionsByDifficulty = async () => {
                const res = await Client.get(`/api/question/${requestForm.bank_id}/${requestForm.difficulty}`)
                setQuestionsByDifficulty(res.data)
                setRefresh(refresh+1)
            }
        getQuestionsByDifficulty();
        }
        
    }

    useEffect(()=>{
        setBanks([]);
        const getBanks = async () => {
            const res = await Client.get(`/api/bank/${user.id}`)
            setBanks(res.data)
        }
        getBanks();
    },[refresh])



    return (
<StyledWrapper>
        <div>
            <div>
                {
                    banks.map((bank, index)=> (
                        <Card className = "bank-details" key ={index}>
                        <h4 >{bank.title} --- # of questions:{bank.q.length}</h4>
                        </Card>
                    ))
                    
                }
            </div>
            <div>
                Request Form
                <form>
                    from:<select name="bank_id" onChange={handleChange}>
                    {banks.map((bank, index)=> (
                        <option key={index} value={bank.id}>{bank.title}</option>
                    ))}
                    </select>
                    difficulty:<select name="difficulty" value={requestForm.difficulty} onChange={handleChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </form>
            </div>
            <div><br/>
                current requestForm <br/>
                bank id: {requestForm.bank_id}<br/>
                difficulty: {requestForm.difficulty}<br/>
                questions: {
                    questionsByDifficulty.length > 0 ? (
                        <div>
                            {
                                questionsByDifficulty.map((question,index)=> (
                                <p key={index}>{question.question}</p>
                                ))
                            }
                        </div>
                    ) : "NO QUESTIONS"
                }
            </div>
        </div>
</StyledWrapper>
    );
}

export default DesignTest;