import React,{useState,useEffect} from 'react'
import './videoUpload.css'
import YouTubeIcon from '@mui/icons-material/YouTube'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const videoUpload = () => {
  const [inputField,setInputField]=useState({'title':'','description':'','videoType':'','thumbnail':'','videoLink':''})
  const [loader,setLoader]=useState(false);
  const navigate=useNavigate();
  const handleOnChange=(event,name)=>{
    setInputField({...inputField,[name]:event.target.value})
  }

  const uploadImage= async(e,type)=>{
    setLoader(true);
    const files=e.target.files;
    const data = new FormData();
    data.append('file',files[0])
    data.append('upload_preset','youtube_clone')
      try{
          const response=await axios.post(`https://api.cloudinary.com/v1_1/duacs6knw/${type}/upload`,data)
          const globalPic=response.data.url
          setLoader(false)
          let val=type==='image'?'thumbnail':'videoLink'
          setInputField({...inputField,[val]:globalPic})
        }catch(err){
          setLoader(false)    
          console.log(err)
        }
    }
    const handleUpload=async()=>{
      console.log(inputField)
      await axios.post('http://localhost:4000/api/video',inputField,{withCredentials:true})
      .then((res)=>{
        console.log(res);
        navigate('/');
      }).catch(err=>{
        console.log(err)
      })
    }
  useEffect(()=>{
    let isLogin = localStorage.getItem('userId');
    if(isLogin===null){
      navigate('/')
    }
  },[])

  return (
    <div className='videoUpload'>
      <div className="uploadBox">
        <div className="uploadVideoTitle">
          <YouTubeIcon sx={{fontSize:'54px' , color: 'red'}} />
          Upload Video
        </div>
        <div className="uploadForm">
          <input type="text" value={inputField.title} placeholder='Title of the Video' onChange={(e)=>handleOnChange(e,'title')} className="uploadFormInput" />
          <input type="text" value={inputField.description} placeholder='Description' onChange={(e)=>handleOnChange(e,'description')} className="uploadFormInput" />
          <input type="text" value={inputField.videoType} placeholder='Category' onChange={(e)=>handleOnChange(e,'videoType')} className="uploadFormInput" />
          <div>Thumbnail<input type="file" accept='image/*' onChange={(e)=>uploadImage(e,'image')}/></div>
          <div>Video<input type="file" accept='video/mp4,video/webm, video/*' onChange={(e)=>uploadImage(e,'video')} /></div>
          {
            loader && 
              <Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box>
          }
        </div>
        
        <div className="uploadBtns">
          <div className="uploadBtn-form" onClick={handleUpload}>Upload</div>
          <Link to='/'className="uploadBtn-form">Home</Link>
        </div>
      </div>
    </div>
  )
}

export default videoUpload
