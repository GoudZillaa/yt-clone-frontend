import React,{useState,useEffect} from 'react'
import './login.css'
import YouTubeIcon from '@mui/icons-material/YouTube'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { toast, ToastContainer } from "react-toastify";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const login = ({closeModel}) => {
  const [loginField,setLoginField] = useState({'userName':'','password':''})
  const [progressBar,setProgressBar]=useState(false);
  
  const handleOnChange=(event,name)=>{
    setLoginField({...loginField,[name]:event.target.value})
  }
  const handleLogin=async()=>{
    setProgressBar(true);
    axios.post('http://localhost:4000/auth/logIn',loginField,{withCredentials:true})
    .then((res)=>{
      setProgressBar(false);
      console.log(res);
      localStorage.setItem("token",res.data.token)
      localStorage.setItem("userId",res.data.user._id)
      localStorage.setItem("userProfilePic",res.data.user.profilePic)
      toast.success("Logged in Successfully!")
      window.location.reload();
    }).catch(err=>{
      setProgressBar(false);
      toast.error("Invalid Credenials!")
      console.log(err)}
    );
  }
  

  return (
    <div className='login'>
      <div className="login_card">
        <div className="login_title">
          <YouTubeIcon sx={{fontSize:'54px' , color: 'red'}} />Login
        </div>
        <div className="login_credentials">
            <input type="email" placeholder='Username' value={loginField.userName} onChange={(e)=>handleOnChange(e,'userName')} className="loginFormInput" />
            <input type="password" placeholder='Password' value={loginField.password} onChange={(e)=>handleOnChange(e,'password')} className="loginFormInput" />
        </div>
        <div className="loginBtns">
          <div className="loginBtn-form" onClick={handleLogin}>Login</div>
          <Link to='/signup' className="loginBtn-form" onClick={()=>closeModel()}>SignUp</Link>
          <div className="loginBtn-form" onClick={()=>closeModel()}>Cancel</div>
        </div>
        {progressBar&&
                    <Box sx={{ width: "100%" }}>
                        <LinearProgress />
                    </Box>}
      </div>
      <ToastContainer/>
    </div>
  )
}
export default login
