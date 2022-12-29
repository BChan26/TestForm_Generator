import { useNavigate } from "react-router-dom"
import styled from 'styled-components';
import {Button, Modal} from 'react-bootstrap'
import { useContext } from "react";
import { DataContext } from "../DataContext";

const StyledHeader = styled.div `

background-color: #D6E3F8;

h1{
font-family: 'Roboto Slab', serif;
font-size: 60px;
background-color: #D6E3F8;
}
.container{
    background-color: #D6E3F8;
    height:10vh;
    width: 100%;
    display:flex;
    justify-content: space-between;
    align-items:center
}
.button{
    margin: 10px;
}

`;


const Header = (props) => {

    let navigate = useNavigate();

const toCreate = () => {
navigate('/SignUp')
}
const toLogin = () => {
    navigate('/Login')
}
const toHome = () => {
    navigate('/')
}
const toProfile = ()=>{
    navigate('/profile')
}

const logout = ()=>{
    setUser(false)
    setAuth(false)
    setLoggedIn(false)
    navigate('/')
}

const {setUser, setAuth} = useContext(DataContext)
const {isLoggedIn, setLoggedIn} = useContext(DataContext)

return(
    
    <StyledHeader>
        {!isLoggedIn ? (
    <div className="container">
            <h1>Test Maker.</h1>
        <div style={{backgroundColor: "#D6E3F8"}}>
            <Button className="button" onClick={toHome}>Home</Button>
            <Button className="button" onClick ={toCreate}>Create Account</Button>
            <Button className="button" onClick ={toLogin}>Login</Button>
        </div>
    </div>
    ):
    <div className="container">
    <h1>Test Maker.</h1>
    <div style={{backgroundColor: "#D6E3F8"}}>
        <Button className="button" onClick={toHome}>Home</Button>
        <Button className="button" onClick ={toProfile}>Profile</Button>
        <Button className="button" onClick ={logout}>Logout</Button>
    </div>
</div>}
    </StyledHeader>
)}

export default Header