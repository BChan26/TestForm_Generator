import './App.css';
import {Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Landing from './components/Landing'
import SignUp from './components/SignUp'
import Login from './components/Login';
import Profile from './components/Profile';
import {DataContext} from './DataContext'
import { useContext, useState } from 'react';

function App() {
  const [authenticated, setAuth] = useState(false)
  const [user, setUser] = useState(false)

//Login is username:dev password:dev
  return (

    
    <DataContext.Provider value ={{authenticated, setAuth,
                            user,setUser}}>
    <div className="App">
      <Header/>
      <main>
        <Routes>
          <Route exact path ='/' element = {<Landing/>}/>
          <Route exact path ='/SignUp' element = {<SignUp/>}/>
          <Route exact path ='/profile' element = {<Profile/>}/>
          <Route exact path ='/login' element = {<Login/>}/>
        </Routes>
      </main>
      
    </div>
    </DataContext.Provider>
  );
}

export default App;
