import React from 'react';
import { DataContext } from '../DataContext';
import { useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginUser } from '../services/Auth';

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
        console.log(payload)
        navigate('/profile')
        } catch (error) {
          alert("invalid username or password")
          setFormData({username: '', password: ''})
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" name ="username" value={formData.username} onChange={handleChange}/>
                <input type="text" placeholder="password" name ="password" value={formData.password} onChange={handleChange}/>
                <input type="submit"/>
            </form>
        </div>
    );
}

export default Login;