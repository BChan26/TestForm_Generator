import React from 'react';
import { DataContext } from '../DataContext';
import { useState, useContext, useEffect} from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {Button, Modal, Card} from 'react-bootstrap'
import Client from '../services/api'


const StyledProfile = styled.div`

.grid-container{
    width: 70%;
    height: 100vh;
    margin:10px;
}
.grid{
    display:grid;
    grid-template-columns: repeat(auto-fit, minmax(25vw, 1fr));
}
`;



function Profile(props) {
    let navigate = useNavigate()
    const {user,setCurrentBank} = useContext(DataContext)
    const [showCreate, setCreate] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        user_id: 0,
    })
    const [banks, setBanks] = useState([])



    const handleClose = () => {setCreate(false);}
    const showCreateModal = () => {
        setCreate(true)
    }
    const handleChange = (e) => {
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
            setFormData({...formData, user_id: user.id})
            createBank();
        }
    }
    const toEditBank = (bank) => {
        setCurrentBank(bank)
        navigate('/editBank')
    }

    useEffect(()=>{
        setBanks([]);
        const getBanks = async () => {
            const res = await Client.get(`/api/bank/${user.id}`)
            setBanks(res.data)
        }
        getBanks();
        
    },[])


    return (
        <StyledProfile>
        <div>
            <h1>profile, {user.username}</h1>
            <Button onClick={showCreateModal}>Create Question Bank</Button>
            {banks.length > 0 ? (
            <div className="grid-container">
                <div className="grid">
                {
                    banks.map((bank)=>(
                        <Card key={bank.id} style={{margin:"10px"}}>
                            <Card.Title>
                                <h3>{bank.title}</h3>
                                    <div className="breakdown">
                                        Questions:{bank.q.length}
                                    </div>
                                    <br/>
                                <Button onClick={()=>toEditBank(bank)}>Edit Bank</Button>
                            </Card.Title>
                        </Card>
                    ))
                }

                </div>
            </div>
            ): null} 



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
        </div>
    </StyledProfile>
    );}

export default Profile;