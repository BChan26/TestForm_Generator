import React from 'react';
import { DataContext } from '../DataContext';
import { useContext, useState} from 'react'
import { Button} from 'react-bootstrap'
import Client from '../services/api';

function CreateQuestionForm(props) {

    const {currentBank} = useContext(DataContext)
    const [questionForm, setQuestionForm] = useState({
        question:'',
        topic:'',
        difficulty: 1,
        answers:[''],
        correct:'',
        image:'',
        type:'FR',
        tag:'',
        bank_id: currentBank.id
    })
    const [FR, setFR] = useState(true)
    const [MC, setMC] = useState(false)
    const [TF, setTF] = useState(false)
    const {refresh, setRefresh} = useContext(DataContext)
    const [advanced, setAdvanced] = useState(false)

    const handleChange = (e) =>{
        setQuestionForm({...questionForm, [e.target.name]: e.target.value })
    }

    const handleAnswers = (index) => (e) => {
        const tempArr = questionForm.answers
        const string = e.target.value;
        tempArr[index] = string;
    setQuestionForm({...questionForm, answers: tempArr })

    }

    const handleImage = (e) => {
        setQuestionForm({...questionForm, image: URL.createObjectURL(e.target.files[0])})
    }

    const handleChecked = (e) =>{
        setQuestionForm({...questionForm, answers:['']})
        setFR(false)
        setMC(false)
        setTF(false)
        
        if (e.target.name === 'FR') {
            setFR(true)
            setQuestionForm({...questionForm, type: 'FR'})}
            
        else if (e.target.name === 'MC') {
            setMC(true)
            setQuestionForm({...questionForm, type: 'MC'})}
        else if (e.target.name === 'TF') { 
            setTF(true)
            setQuestionForm({...questionForm, type: 'TF'})}
        
    }

    const handleAdvanced = (e)=> {
        if (!advanced){
            document.querySelector(".advanced").style.visibility="visible"
            setAdvanced(true)
        }
        else{
            document.querySelector(".advanced").style.visibility="hidden"
            setAdvanced(false)
        }
        
    }

    const addAnswer = () => {
        const tempArr = questionForm.answers;
        tempArr.push('')
        setQuestionForm({...questionForm, answers: tempArr})
    }

    const handleSubmit =  (e) =>{
    e.preventDefault();

    const addQuestion = async () => {
        try {
            await Client.post('api/question',questionForm)
                setQuestionForm({
                    question:'',
                    topic:'',
                    difficulty: 0,
                    answers:[''],
                    correct:'',
                    image:'',
                    type:'FR',
                    tag:'',
                    bank_id: currentBank.id
                })
                setFR(true)
                setMC(false)
                setTF(false)
                setRefresh(refresh+1)
        }catch (error) {
            throw error
        }
    }
    addQuestion();
    
    }



    return (
        <form onSubmit={handleSubmit} style={{marginLeft:10, marginRight:10}}>
                        <textarea placeholder="question" style={{width:"100%"}} value={questionForm.question} name="question" onChange={handleChange}></textarea><br/>
                        <div style={{display:"flex", justifyContent:"center"}}>
                            <input type="checkbox" checked={FR} name="FR" onChange={handleChecked}/><h5 className="checkbox">Free Response</h5>
                            <input type="checkbox" checked={MC} name="MC" onChange={handleChecked}/><h5 className="checkbox">Multiple Choice</h5>
                            <input type="checkbox" checked={TF} name="TF" onChange={handleChecked}/><h5 className="checkbox">True/False</h5>
                        </div>
{/* Multiple Choice? */}
                        {MC ? (
                        <div className='multipleChoice' >
                            {
                                questionForm.answers.map((data,index)=>(
                                    <div key={index}>{String.fromCharCode(97 + index)}<input type="text" className="MC" value={data} onChange={handleAnswers(index)}/></div>
                                ))
                            }
                            <Button onClick={addAnswer}>add answer</Button>
                            Correct Answer:
                            <select className="correct" name="correct" onChange={handleChange}>
                                <option value=''>select answer</option>
                            {questionForm.answers.map((data,index)=>(
                                <option key={index} value={data}>{data}</option>
                            ))}
                            </select>
                        </div>
                        ) : null}
{/* T/F */}
                        {TF ? (
                        <div className="trueFalse">
                                Correct Answer:<select className="correct" name="correct" onChange={handleChange}>
                            <option value=""></option>
                            <option value="true">true</option>
                            <option value="false">false</option>
                            </select> 
                        </div>
                        ):null}
{/* Images */}                        
                        <input accept="image/" type="file" onChange={handleImage}/><br/>
                        <input type="checkbox" checked={advanced} onChange ={handleAdvanced}/> Show Advanced

                        <div className="advanced" style={{visibility:"hidden"}}>
{/* topic */}
                        <br/><input type="text" placeholder="topic" value={questionForm.topic} name="topic" onChange={handleChange}></input><br/>
{/* Difficulty */}
                        Difficulty: <select  name="difficulty" value={questionForm.difficulty} onChange={handleChange}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select><br/>

{/* Tag */}
                        <br/><input type="text" name="tag" placeholder="tags" onChange={handleChange}/><br/>
                        </div>
                        <Button type='submit' style={{margin:10}}>Submit</Button>
                    </form>
    );
}

export default CreateQuestionForm;