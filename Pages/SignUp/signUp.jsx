import React, { useRef } from "react";
import "./signUP.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link,useNavigate } from "react-router-dom";
import user from "../../src/assets/user.png";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const signUp = () => {
  const [userPic, setUserPic] = useState(user);
  const [signUpField, setSignUpField] = useState({ channelName: "", userName: "", password: "", about: "", profilePic: userPic });
  const [progressBar,setProgressBar]=useState(false);
  const navigate=useNavigate();

  const handleOnChange = (event, name) => {
    setSignUpField({ ...signUpField, [name]: event.target.value });
  };

  const uploadImage = async (e) => {
    setProgressBar(true)
    const files = e.target.files;
    const data = new FormData();
    console.log(data)
    data.append("file", files[0]);
    data.append("upload_preset", "youtube_clone");
    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/duacs6knw/image/upload", data);
      const globalPic = response.data.url;
      setUserPic(globalPic);
      setSignUpField({ ...signUpField, profilePic: globalPic });
      setProgressBar(false)
    } catch (err) {
        setProgressBar(false)
      console.log(err);
    }
  };
  const handleSignUp = async () => {
    setProgressBar(true)
    axios
      .post("http://localhost:4000/auth/signUp", signUpField)
      .then((res) => {
        toast.success(res.data.message)
        setProgressBar(false)
        setTimeout(()=>{navigate('/')},1000)
      })
      .catch((err) => {
        setProgressBar(false)
        toast.error(err)});
  };
  console.log(signUpField);
  return (
    <div className="signUp">
      <div className="signUpCard">
        <div className="signUpTitle">
          <YouTubeIcon sx={{ fontSize: "54px", color: "red" }} />
          SignUp
        </div>
        <div className="signUpForm">
          <input
            type="text"
            placeholder="Channel Name"
            value={signUpField.channelName}
            onChange={(e) => handleOnChange(e, "channelName")}
            className="signUpFormInput"
          />
          <input
            type="text"
            placeholder="User Name"
            value={signUpField.userName}
            onChange={(e) => handleOnChange(e, "userName")}
            className="signUpFormInput"
          />
          <input
            type="Password"
            placeholder="Password"
            value={signUpField.password}
            onChange={(e) => handleOnChange(e, "password")}
            className="signUpFormInput"
          />
          <input
            type="text"
            placeholder="About Your Channel"
            value={signUpField.about}
            onChange={(e) => handleOnChange(e, "about")}
            className="signUpFormInput"
          />

          <div className="imageDiv">
            <div>
              Profile Photo
              <input type="file" accept="image/*" onChange={(e) => uploadImage(e)} />
            </div>
            <div className="signUpPhoto">
              <img src={userPic} alt="Profile Photo" className="signUpImage" />
            </div>
          </div>
        </div>
        <div className="signUpBtns">
          <div className="signUpBtn-form" onClick={handleSignUp}>
            SignUp
          </div>
          <Link to="/" className="signUpBtn-form">
            Home
          </Link>
        </div>
        {progressBar&&
            <Box sx={{ width: "100%" }}>
                <LinearProgress />
            </Box>}
      </div>
      <ToastContainer />
    </div>
  );
};

export default signUp;
