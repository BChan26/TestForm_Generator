import React from 'react';
import { DataContext } from '../DataContext';
import { useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginUser } from '../services/Auth';
import styled from "styled-components"
import {Button} from 'react-bootstrap'

const StyledWrapper = styled.div `
text-align:center;
height:100vh;

h1{
    font-family: 'Roboto Slab', serif;
}
input[type=text]{
    margin: 10px;
    width: 40%;
    box-shadow: 3px 3px 3px #D6E3F8;
    border-radius:10px;
    padding:10px;
}
input[type=submit]{
    width: 15%;
    height: 50px;
}
`;

function Login(props) {
    let navigate = useNavigate()
    const {setUser, setAuth} = useContext(DataContext)
    const {isLoggedIn, setLoggedIn} = useContext(DataContext)
    const [formData, setFormData] = useState({username: '', password: ''})

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
        const payload = await LoginUser(formData)
        setFormData({username: '', password: ''})
        setUser(payload)
        setAuth(true)
        setLoggedIn(true)

        navigate('/profile')
        } catch (error) {
          alert("invalid username or password")
          setFormData({username: '', password: ''})
        }
    }
    return (
        <StyledWrapper>
        <div>
            <h1>Look who came back!</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" name ="username" value={formData.username} onChange={handleChange}/><br/>
                <input type="text" placeholder="password" name ="password" value={formData.password} onChange={handleChange}/><br/>
                <Button type="submit">Log In!</Button>
            </form>
        </div>
        </StyledWrapper>
    );
}

export default Login;