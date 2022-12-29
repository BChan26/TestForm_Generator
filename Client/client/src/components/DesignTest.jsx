import React from 'react';
import {DataContext} from '../DataContext'
import { useContext, useState, useEffect } from 'react';
import Client from '../services/api';
import styled from 'styled-components';
import {Card, Button} from 'react-bootstrap'

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
    const [allData, setAllData]= useState([])
    const [requestForm, setRequestForm] = useState({
        bank_id:1,
        difficulty:1,
        tag:null,
        count:1,
        type:"FR"
    })
    const [questionsByDifficulty, setQuestionsByDifficulty] = useState([])
    const [questionByTag, setQuestionByTag]= useState([])
    const [refresh, setRefresh] = useState(0)
    
    const getQuestionsByDifficulty = async (difficulty) => {
        const res = await Client.get(`/api/question/${requestForm.bank_id}/${difficulty}/${requestForm.type}`)
        setQuestionsByDifficulty(res.data)
        setRefresh(refresh+1)
    }
    const getQuestionsByTag = async (tag, difficulty, type) => {
        let res =[]
        if (tag === 'ignore'){
            res = await Client.get(`/api/question/${requestForm.bank_id}/${difficulty}/${type}`)
            setQuestionByTag(res.data)
        }
        else {res = await Client.get(`api/question/tagged/${requestForm.bank_id}/${difficulty}/${tag}/${type}`)
            setQuestionByTag(res.data)
        }
        setRefresh(refresh+1)
        return res.data;
    }
    const handleChange = (e) =>{
        setRequestForm({...requestForm, [e.target.name]: e.target.value })
        if (e.target.name === "bank_id"){
            setRequestForm({
                bank_id:e.target.value,
                difficulty:1,
                tag:null,
                count:1,
                type:"FR"
            })
        }
        if (e.target.name === "difficulty"){
            let difficulty = e.target.value
            getQuestionsByDifficulty(difficulty);
        }
        else if (e.target.name === "tag"){
            let tag = e.target.value;
            getQuestionsByTag(tag, requestForm.difficulty,requestForm.type)
        }
        setRefresh(refresh+1)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const updateRequests = ()=> {
            const tempArr = requests;
            tempArr.push(requestForm);
            setRequest(tempArr)
            setRefresh(refresh+1)
        }

        const getQuestions = async () => {
            if (requestForm.tag !=null && requestForm.tag != '' && requestForm.tag != 'ignore') {
                try{
                    const res = await Client.get(`/api/question/getter/${requestForm.bank_id}/${requestForm.difficulty}/${requestForm.tag}/${requestForm.type}`)
                    setAllData(res.data)
                }
                catch(error){throw error}
            }
            else {
                try{
                    const res = await Client.get(`/api/question/getter/${requestForm.bank_id}/${requestForm.difficulty}/${requestForm.type}`)
                    setAllData(res.data)
                }
                catch(error){throw error}
            }
        }
        updateRequests();
        getQuestions();
    }

    useEffect(()=>{
        setBanks([]);
        const getBanks = async () => {
            const res = await Client.get(`/api/bank/${user.id}`)
            setBanks(res.data)
        }
        getBanks();
    },[refresh])

    const sortData = async () => {
        console.log("start");
        console.log(requests)
        for (let i=0; i<requests.length; i++){
            const temp =getQuestionsByTag(requests[i].tag,requests[i].difficulty,requests[i].type)
            console.log(temp)
        }
    }

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
                <Button onClick = {sortData}>
                    Create Test
                </Button>
            </div>
            <div>
                Request Form
                <form onSubmit={handleSubmit}>
                    from:<select name="bank_id" value={requestForm.bank_id} onChange={handleChange}>
                    {banks.map((bank, index)=> (
                        <option key={index} value={bank.id}>{bank.title}</option>
                    ))}
                    </select><br/>
                    <select name='type' onChange={handleChange}>
                        <option value="FR">Free Response</option>
                        <option value="MC">Multiple Choice</option>
                        <option value="TF">True/False</option>
                    </select><br/>
                    difficulty:<select name="difficulty" value={requestForm.difficulty} onChange={handleChange}>
                        <option value=''>Choose Difficulty</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select><br/>
                    {questionsByDifficulty.length > 0 ? (
                        <div>
                            Tag: <select name = 'tag' onChange={handleChange}>
                                <option value = ''></option>
                                <option value="ignore">Ignore Tag</option>
                            {questionsByDifficulty.map((question, index, array)=> (
                                question.tag ? (
                                <option key={index} value ={question.tag}>{question.tag}</option>
                                ):null
                                
                            ))}
                            </select><br/>
                            {questionByTag.length > 0 ? (
                            <div>
                                count:
                                <select name ="count" onChange={handleChange}>
                                {questionByTag.map((question, index)=> (
                                    <option key={index} value ={index+1}>{index+1}</option>
                                ))}
                                </select><br/>
                                <Button type="submit">Get Questions</Button>
                            </div>
                            ) : "Select Tag"}<br/>
                            
                        </div>
                        
                    ) : "NO QUESTIONS OF THAT DIFFICULTY"}
                
                </form>
            </div>
            <div>
                Requests Made:<br/>
                    {
                        requests.map((request, index)=> (
                            <Card key={index}>
                                Request #{index+1}.{request.type} <br/>
                                difficulty: {request.difficulty}<br/>
                                count: {request.count}<br/>
                                tag: {request.tag}
                            </Card>
                        ))
                    }
            </div>
            <div>
                <h1>Question By Tag (For Testing)</h1>
                length: {questionByTag.length}
                {questionByTag.map((item, index)=>(
                    <div key={index}>{item.question} diff:{item.difficulty} tag:{item.tag}</div>
                ))}
            </div>
        </div>
</StyledWrapper>
    );
}

export default DesignTest;