import {
  BrowserRouter as Router,
  Routes,
  Route,
 
} from "react-router-dom";
import './App.css';
import React, {useState} from 'react'
import AudioStates from './context/audio/AudioStates';
import Home from './component/Home';
import Navbar from './component/Navbar';
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import { Alert } from "./component/Alert";
function App() {
  const [alert, setAlert]=useState(null)
  const showAlert=(message, type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    }, 2000);
  }
  const [isLogged, setIsLogged]= useState(localStorage.getItem("token")? true: false)
  return (
   <div className="main-bg">
   <AudioStates>
   <Router>
   <Navbar isLogged={isLogged} setIsLogged={setIsLogged} />
   <Alert alert={alert}/>
             
        <Routes>
        <Route exact path="/"  element={<Home showAlert={showAlert}/>}>
         
        </Route>
        <Route exact path="/Login"  element={<Login showAlert={showAlert} setIsLogged={setIsLogged}/>}>
         
         </Route>
         <Route exact path="/Signup"  element={<SignUp showAlert={showAlert} setIsLogged={setIsLogged}/>}>
         
        </Route>
        </Routes>
        </Router>
   
  

</AudioStates>
</div> 

  );
}

export default App;
  