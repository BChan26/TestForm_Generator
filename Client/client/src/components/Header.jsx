import { useNavigate } from "react-router-dom"

const Header = (props) => {

    let navigate = useNavigate();

const toCreate = () => {
navigate('/SignUp')
}


return(
    <div>
        <button onClick ={toCreate}>Create Account</button>
        <button>Login</button>
    </div>
)
}

export default Header