import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { RegisterUser } from '../services/Auth';

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
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" name ="username" value={allData.username} onChange={handleChange}/>
                <input type="text" placeholder="password" name ="password" value={allData.password} onChange={handleChange}/>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default SignUp