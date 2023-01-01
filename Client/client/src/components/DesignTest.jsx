// import React from 'react';
// import {DataContext} from '../DataContext'
// import { useContext, useState, useEffect } from 'react';
// import Client from '../services/api';
//import styled from 'styled-components';
// import {Card, Button} from 'react-bootstrap'

// const StyledWrapper = styled.div `
// .bank-details {
//     background-color: #D6E3F8;
//     width: 90%;
//     margin: 5px;
//     box-shadow: 2px 2px 2px grey;
//     padding: 5px;
// }
// .bank-container{
//     display:grid;
//     grid-template-columns: repeat(auto-fit, minmax(30vw, 1fr));
    
// }
// .request-card{
//     width:50%;
//     margin: 10px;
// }
// .request-form{
//     text-align: center;
//     border: 3px solid black;
//     border-radius:5px;
//     width: 30%;
//     margin-left: 35vw;
//     margin-top: 10px;
//     background-color:white;
// }
// h5{
//     background-color: #D6E3F8;
//     text-align:center;
// }
// `;


function DesignTest(props) {

    // const {user} = useContext(DataContext)
    // const [banks, setBanks] = useState([])
    // const [requests, setRequest] = useState([])
    // const {testData, setTestData} = useContext(DataContext)
    // const [allData, setAllData]= useState([])
    // const [requestForm, setRequestForm] = useState({
    //     bank_id:1,
    //     difficulty:1,
    //     tag:null,
    //     count:1,
    //     type:"FR"
    // })
    // const [questionsByDifficulty, setQuestionsByDifficulty] = useState([])
    // const [questionByTag, setQuestionByTag]= useState([])
    // const [refresh, setRefresh] = useState(0)
    
    // const getQuestionsByDifficulty = async (difficulty) => {
    //     const res = await Client.get(`/api/question/${requestForm.bank_id}/${difficulty}/${requestForm.type}`)
    //     setQuestionsByDifficulty(res.data)
    //     setRefresh(refresh+1)
    // }
    // const getQuestionsByTag = async (tag, difficulty, type) => {
    //     if (tag === 'ignore'){
    //         const res = await Client.get(`/api/question/${requestForm.bank_id}/${difficulty}/${type}`)
    //         setQuestionByTag(res.data)
    //     }
    //     else {const res = await Client.get(`api/question/tagged/${requestForm.bank_id}/${difficulty}/${tag}/${type}`)
    //         setQuestionByTag(res.data)
    //     }
    // }
    // const handleChange = (e) =>{
    //     setRequestForm({...requestForm, [e.target.name]: e.target.value })
    //     if (e.target.name === "bank_id"){
    //         setRequestForm({
    //             bank_id:e.target.value,
    //             difficulty:1,
    //             tag:'',
    //             count:1,
    //             type:"FR"
    //         })
    //     }
    //     if (e.target.name === "difficulty"){
    //         setRequestForm({...requestForm, difficulty:e.target.value, tag: ''})
    //         let difficulty = e.target.value
    //         getQuestionsByDifficulty(difficulty);
    //     }
    //     else if (e.target.name === "tag"){
    //         let tag = e.target.value;
    //         getQuestionsByTag(tag, requestForm.difficulty,requestForm.type)
    //     }
    //     setRefresh(refresh+1)
    // }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const updateRequests = ()=> {
    //         const tempArr = requests;
    //         tempArr.push(requestForm);
    //         setRequest(tempArr)
    //         setRefresh(refresh+1)
    //     }
    //     updateRequests();
    //     setRequestForm({
    //         bank_id:requestForm.bank_id,
    //         difficulty:1,
    //         tag:null,
    //         count:1,
    //         type:"FR"
    //     })
    // }

    // const sortData = async () =>{
    //     const shuffle = (array) => {
    //         let currentIndex = array.length, randomIndex;
    //         while (currentIndex != 0) {
    //         randomIndex = Math.floor(Math.random() * currentIndex);
    //         currentIndex--;
    //         [array[currentIndex], array[randomIndex]] = [
    //         array[randomIndex], array[currentIndex]];
    //         }
    //         setAllData(array);
    //     }
    //     const getQuestionsForTest = async() =>{
    //         for (let i=0;i<requests.length;i++){
    //             if (requests[i].tag !=null && requests[i].tag != '' && requests[i].tag != 'ignore') {
    //                 try{
    //                     const res = await Client.get(`/api/question/getter/${requests[i].bank_id}/${requests[i].difficulty}/${requests[i].tag}/${requests[i].type}`)
    //                     shuffle(res.data)
    //                     for(let k=0;k<requests[i].count;k++){
    //                         const tempArr = testData;
    //                         tempArr.push(allData[k])
    //                         setTestData(tempArr)
    //                         }
    //                 }catch(error){throw error}
    //             }
    //             else {
    //                 try{
    //                     const res = await Client.get(`/api/question/getter/${requests[i].bank_id}/${requests[i].difficulty}/${requests[i].type}`)
    //                     shuffle(res.data)
    //                 }catch(error){throw error}
    //                 for(let k=0;k<requests[i].count;k++){
    //                     const tempArr = testData;
    //                     {tempArr.push(allData[k])
    //                     setTestData(tempArr)}
    //                 }
    //             }
    //         }
    // }
    //     getQuestionsForTest();
    //     console.log(testData)
    // }

    // useEffect(()=>{
    //     setBanks([]);
    //     const getBanks = async () => {
    //         const res = await Client.get(`/api/bank/${user.id}`)
    //         setBanks(res.data)
    //     }
    //     getBanks();
    // },[refresh])


    return (
{/* <StyledWrapper>
        <div>
            <div className="bank-container">
                {
                    banks.map((bank, index)=> (
                        <Card className = "bank-details" key ={index}>
                        <h4 style={{backgroundColor: "#D6E3F8"}}>{bank.title} --- # of questions:{bank.q.length}</h4>
                        </Card>
                    ))
                    
                }
                
            </div>
            <Button style={{marginLeft:"45vw"}} onClick={sortData}>
                    Create Test
            </Button>
            <div className="request-form">
                <h3 style={{backgroundColor:"white"}}>Request Form</h3>
                <form onSubmit={handleSubmit}>
                    <div style={{fontSize: "20px", backgroundColor:"white"}}>
                        from:<select name="bank_id" value={requestForm.bank_id} onChange={handleChange} style={{backgroundColor:"white"}}>
                        {banks.map((bank, index)=> (
                            <option key={index} value={bank.id}>{bank.title}</option>
                        ))}
                        </select><br/>
                    </div>
                    <div style={{backgroundColor:"white"}}>
                    <select name='type' onChange={handleChange} style={{backgroundColor:"white"}}>
                        <option value=''>Select Question Type</option>
                        <option value="FR">Free Response</option>
                        <option value="MC">Multiple Choice</option>
                        <option value="TF">True/False</option>
                    </select><br/></div>
                    <div style={{backgroundColor:"white"}}>
                    difficulty:<select name="difficulty" value={requestForm.difficulty} onChange={handleChange} style={{backgroundColor:"white"}}>
                        <option value=''>Choose Difficulty</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select><br/></div>
                    {questionsByDifficulty.length > 0 ? (
                        <div style={{backgroundColor:"white"}}>
                            Tag: <select name = 'tag' onChange={handleChange}>
                                <option value = ''></option>
                                <option value="ignore">Ignore Tag</option>
                            {questionsByDifficulty.map((question, index)=> (
                                question.tag ? (
                                <option key={index} value ={question.tag} style={{backgroundColor:"white"}}>{question.tag}</option>
                                ):null
                                
                            ))}
                            </select><br/>
                            {questionByTag.length > 0 ? (
                            <div style={{backgroundColor:"white"}}>
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
                        
                    ) : <h3 style={{backgroundColor:"white"}}>NO QUESTIONS OF THAT DIFFICULTY</h3>}
                
                </form>
            </div>
            <div>
                Requests Made:<br/>
                    {
                        requests.map((request, index)=> (
                            <Card key={index} className="request-card">
                                <h5>Request #{index+1}.{request.type}</h5> <br/>
                                difficulty: {request.difficulty}<br/>
                                count: {request.count}<br/>
                                tag: {request.tag}
                            </Card>
                        ))
                    }
            </div>
        </div>
</StyledWrapper> */}
    );
}

export default DesignTest;