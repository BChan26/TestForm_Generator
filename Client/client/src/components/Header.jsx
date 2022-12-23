import { useNavigate } from "react-router-dom"
import styled from 'styled-components';
import {Button, Modal} from 'react-bootstrap'

const StyledHeader = styled.div `

border:2px solid black;

.container{
    height:10vh;
    display:flex;
    justify-content: flex-end;
    align-items:center;
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

return(
    <StyledHeader>
    <div className="container">
        <Button className="button" onClick={toHome}>Home</Button>
        <Button className="button" onClick ={toCreate}>Create Account</Button>
        <Button className="button" onClick ={toLogin}>Login</Button>
    </div>
    </StyledHeader>
)}

export default Header