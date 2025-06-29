import React,{useState,useEffect} from 'react';
import './navbar.css';
import MenuIcon from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import userImg from '../../src/assets/user.png';
import {Link,useNavigate} from 'react-router-dom';
import Login from '../Login/login';
import axios from 'axios'

const Navbar = ({setSideNavbarFunc,sideNavbar}) => {
  const [userPic,setUserPic]=useState(userImg);
  const [navbarModel,setNavbarModel]=useState(false);
  const [login,setLogin]=useState(false)
  const [isLoggedIn,setIsLoggedIn]=useState(false);

  const navigate=useNavigate();
  const handClickModel=()=>{
    setNavbarModel(!navbarModel);
  }
  const sideNavbarFunc=()=>{
    setSideNavbarFunc(!sideNavbar)
  }
  const handleProfile=()=>{
    navigate(`/user/${localStorage.getItem('userId')}`);
    setNavbarModel(false)
  }
  const closeModel=()=>{
    setLogin(false)
  }
  const onclickOfPopUpOption=(button)=>{
    setNavbarModel(false)
    if(button==='login'){
      setLogin(true)
    }else{
      localStorage.clear();
      logoutApi();
    }
  }
  const logoutApi=async()=>{
    axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`,{}, {
      withCredentials: true, 
    })
    .then((res)=>{
      console.log(res);
      window.location.reload();
    }).catch(err=>console.log(err));
  }
  useEffect(()=>{
    const profilePic=localStorage.getItem("userProfilePic");
    console.log(profilePic)
    setIsLoggedIn(localStorage.getItem("userId")!==null?true:false);
    if(profilePic!==null){
      setUserPic(profilePic)
    }
  })

  return (
    <div className='navbar'>

      <div className='navbar-left'>
        <div className='navbarhamburger' onClick={sideNavbarFunc}>
          <MenuIcon sx={{color:'white'}}/>
        </div>
        <Link to={'/'}className='navbar_youtubeImg'>
          <YouTubeIcon sx={{fontSize:'34px'}} className='navbar_youtubeImage'/>
          <div className='navbar_utubeTitle'>youtube</div>
        </Link>
      </div>

      <div className='navbar-middle'>
        <div className="navbar_searchBox">
          <input type="text" placeholder='Search' className='navbar_searchBoxInput'/>
          <div className="navbar_searchIcon"><SearchIcon sx={{color:'white' , fontSize:'28px'}}/></div>
        </div>
        <div className="navbar_mic">
            <KeyboardVoiceIcon sx={{color:'white' , fontSize:'28px'}}/>
        </div>        
      </div>

      <div className="navbar-right">
        <Link to='/1/upload'>
          <VideoCallIcon sx={{color:'white',fontSize:'30px',cursor:'pointer'}}/>
        </Link>
        <NotificationsIcon sx={{color:'white',fontSize:'30px',cursor:'pointer'}}/>
        <img onClick={handClickModel} src={userPic} alt="user" className='navbar_userPic'/>

        {navbarModel && 
          <div className="navbar-model">
            {isLoggedIn&&<div className="navbar-model-option" onClick={handleProfile}>Profile</div>}
            {isLoggedIn&&<div className="navbar-model-option" onClick={()=>onclickOfPopUpOption('logout')}>Logout</div>}
            {!isLoggedIn&&<div className="navbar-model-option" onClick={()=>onclickOfPopUpOption('login')}>Login</div>}
          </div>  }      
      </div>
      {
        login && <Login closeModel={closeModel}/>
      }
    </div>
  )
}

export default Navbar
