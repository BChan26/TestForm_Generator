import React from 'react';
import { DataContext } from '../DataContext';
import { useState, useContext, useEffect} from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {Button, Modal, Card} from 'react-bootstrap'
import Client from '../services/api'


const StyledProfile = styled.div`

height:100vh;
text-align:center;

.container {
    display:flex;
    
}
h1{
    font-family: 'Lobster', cursive;
    font-size: 60px;
}

.grid-container{
    width: 70%;
    margin:10px;
    
}
.grid{
    display:grid;
    grid-template-columns: repeat(auto-fit, minmax(25vw, 1fr));
}
`;



function Profile(props) {
    let navigate = useNavigate()
    const {user,setCurrentBank, currentBank} = useContext(DataContext)
    const [showCreate, setCreate] = useState(false)
    const [showDesign, setShowDesign]=useState(false)
    const [formData, setFormData] = useState({
        title: '',
        user_id: user.id,
    })
    const [banks, setBanks] = useState([])
    const [refresh, setRefresh] = useState(0)
    const {testData, setTestData}=useContext(DataContext)



    const handleClose = () => {setCreate(false);
    setShowDesign(false)}
    const showCreateModal = () => {
        setCreate(true)
    }
    const showDesignModal =()=>{
        setShowDesign(true)
    }
    const handleChange = (e) => {
        if (e.target.name ==="testData"){
            setCurrentBank(e.target.value)
        }
        setFormData({...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const createBank = async () => {
            try{
                const res = await Client.post('api/bank',formData)
                setFormData({title:'', user_id:0})
                document.querySelector('.success').style.visibility= "visible";
            } catch (error) {
                console.log('error creating bank')
                throw error
            }
        }
        if (formData.title == '')
        {
            alert("This field cannot be empty")
        }
        else {
            createBank();
        }
        setRefresh(refresh+1)
    }
    const toEditBank = (bank) => {
        setCurrentBank(bank)
        navigate('/editBank')
    }

    const toTestMaker = (bank)=>
    {
        setCurrentBank(bank)
        navigate(`/test_maker`)
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
        <StyledProfile>
        <div>
            <h1>Welcome to your profile, {user.username}</h1>
            <Button onClick={showCreateModal}>Create Question Bank</Button>
            <div className="container">
            {banks.length > 0 ? (
            <div className="grid-container">
                <div className="grid">
                {
                    banks.map((bank)=>(
                        <Card key={bank.id} style={{margin:"10px", boxShadow: "2px 2px 10px lightgrey", backgroundColor: "#D6E3F8", border: "3px solid black"}}>
                            <Card.Title style={{backgroundColor: "#D6E3F8"}}>
                                <h3 style={{backgroundColor: "#D6E3F8"}}>{bank.title}</h3>
                                    <div className="breakdown" style={{backgroundColor: "#D6E3F8"}}>
                                        Questions:{bank.q.length}
                                    </div>
                                    <br/>
                                <Button onClick={()=>toEditBank(bank)} style={{marginRight: "10px"}}>Edit Bank</Button>
                                <Button onClick={()=>toTestMaker(bank)}>Create Test</Button>
                            </Card.Title>
                        </Card>
                    ))
                }

                </div>
            </div>
            ): null}
            <div style={{width:"30%", textAlign:"left"}}>
            <h1>Step 1</h1>
            <h2>Create a bank and fill it with questions</h2>
            <h1> Step 2</h1>
            <h2>Start designing your test!</h2>
            </div>

            </div>
        </div>
{/* Create Question Bank */}
            <Modal show={showCreate} onHide={handleClose}>
                <Modal.Header closeButton>
                    <h1>Create Question Bank</h1>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit = {handleSubmit}>
                    <h4>Bank Name</h4>
                    <input type='text' name="title" value={formData.title} onChange = {handleChange}></input>
                    <br/><br/>
                    <Button type="submit">Create Bank!</Button>
                    <br/><br/>
                    <h3 className = "success" style={{visibility:"hidden"}}>Success!</h3>
                    </form>
                </Modal.Body>
            </Modal>
        </StyledProfile>
    )
}

export default Profile