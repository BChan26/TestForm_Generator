import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { RegisterUser } from '../services/Auth';
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

const SignUp = (props) => {

let navigate = useNavigate();

const [allData, setAllData] = useState({
    username: '',
    password: '',
})

const handleChange = (e) => {
    setAllData({...allData, [e.target.name]:[e.target.value]})
}

const handleSubmit = async (e) =>{
    e.preventDefault()
    await RegisterUser({
    username: allData.username[0],
    password: allData.password[0]
    })
    setAllData({
        username: '',
        password: '',
    })

    navigate('/login')
}

return(
    <StyledWrapper>
        <div>
            <h1>Sign up with Test Maker</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" name ="username" value={allData.username} onChange={handleChange}/><br/>
                <input type="text" placeholder="password" name ="password" value={allData.password} onChange={handleChange}/><br/>
                <Button type="submit">Sign me up!</Button>
            </form>
        </div>
        </StyledWrapper>
    )
}

export default SignUp