import React,{useState,useEffect} from 'react'
import './video.css'
import user from '../../src/assets/user.png'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import {Link} from 'react-router-dom'
import {useParams} from 'react-router-dom'
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";

const video = () => {
  const [message,setMessage]=useState('')
  const [data,setData]=useState(null)
  const [videoUrl,setVideoUrl]=useState('')
  const [comments,setComments]=useState([])
  const [videoData, setVideoData] = useState([]);
  const {id}=useParams();
  
  const fetchVideoById= async()=>{
    await axios.get(`${import.meta.env.VITE_API_URL}/api/getVideoById/${id}`)
    .then((response)=>{
      // console.log(response.data.video);
      setData(response.data.video)
      setVideoUrl(response?.data?.video?.videoLink)
    }).catch(err=>{
      console.log(err)
    })
  }
  const getCommentByVideoId= async()=>{
    await axios.get(`${import.meta.env.VITE_API_URL}/commentApi/comment/${id}`)
    .then((response)=>{
      console.log(response)
      setComments(response?.data?.comments)
    }).catch(err=>{
      console.log(err)
    })
  }
  const uploadComment=async()=>{
    const body={'video':id,'message':message}
    await axios.post(`${import.meta.env.VITE_API_URL}/commentApi/comment`,body,{withCredentials:true})
    .then((res)=>{
      setMessage('')
      toast.success("commented")
      console.log(res)
      getCommentByVideoId();
    }).catch(
      err=>{console.log(err)
        toast.error('Please Login first to Comment')
      }
    )
  }
  const getVideoSuggestions= async() => {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/allVideo`)
        .then((res) => {
          console.log(res.data.videos);
          setVideoData(res.data.videos);
        })
        .catch((err) => {
          console.log(err);
        });
  }
  useEffect(()=>{
    fetchVideoById();
    getCommentByVideoId();
    getVideoSuggestions();
  },[])
  const handleOnChange=(event,name)=>{
    setMessage(event.target.value)
  }
  return (
    <div className='video'>
      <div className="videoPostSection">
        <div className="youtubeVideo">
            {data && 
            <video width='400' controls autoPlay className='videoPlayer'>
                <source src={videoUrl} types='video/mp4'/>
                <source src={videoUrl} types='video/webm'/>
                Your Browser does not support the video tag.
            </video>}
        </div>

        <div className="videoDetails">
          <div className="videoTitle">{data?.title}</div>

          <div className="youtube_video_ProfileBlock">
            <div className="youtube_video_ProfileBlock_left">

              <Link to={`/user/${data?.user?._id}`} className="youtube_video_ProfileBlock_left_img">
                <img src={data?.user?.profilePic} alt="" className="youtube_video_ProfileBlock_left_image" />
              </Link>

              <div className="youtube_video_subsView">
                <div className="youtubePostProfileName">{data?.user?.channelName}</div>
                <div className="youtubePostProfileDate">{data?.user?.createdAt.split("T")[0]}</div>
              </div>

              <div className="subscribeBtn">{'Subscribe'}</div>

            </div>

            <div className="youtube_likeBlock">
              <div className="youtube_likeBlock_like">
                <ThumbUpOffAltIcon sx={{color:'white'}} />
                <div className="numberOfLike">{data?.like}</div>
              </div>

              <div className="likeDivider"></div>

              <div className="youtube_likeBlock_like">
                <ThumbDownOffAltIcon sx={{color:'white'}} />
              </div>

            </div>
          </div>

          <div className="videoAbout">
            <div>{data?.createdAt.slice(0,10)}</div>
            <div>{data?.description}</div>
          </div>

          <div className="youtube_commentSection">
            <div className="youtube_commentSection_title">{comments?.length} Comments</div>

            <div className="youtubeSelfComment">
              <img src={user} alt="" className="youtubeSelfCommentImg" />
              <div className="addComment">
                <input type="text" value={message} onChange={(e)=>handleOnChange(e)} placeholder='Add a comment' className="addAcommentInput" />
                <div className="submitBtns">
                  <div className="cancelComment">Cancel</div>
                  <div className="cancelComment" onClick={uploadComment} >Comment</div>
                </div>
              </div>
            </div>

            <div className="youtubeOthersComments">

              {comments?.map((item,ind)=>{
                return(
                <div className="youtubeSelfComment">
                <img src={item?.user?.profilePic} alt="" className="youtubeSelfCommentImg" />
                <div className="others_commentsection">
                  <div className="others_commentsectionHeader">
                    <div className="channelName_comment">{item?.user?.channelName}</div>
                    <div className="commentDate">{item?.createdAt.slice(0,10)}</div>
                  </div>

                  <div className="actualComment">{item?.message}</div>
                </div>
              </div>);
              })}
              
              

              

            </div>
          </div>
        </div>
      </div>

      <div className="videoSuggestions">

        {videoData?.map((item,ind)=>{
          return(
            <Link to={`/watch/${item._id}`} className="videoSuggestionsBlock">
              <div className="videoSuggestionThumbnail">
                <img src={item?.thumbnail} alt="" className="videoThumbnail" />
              </div>
              <div className="videoSuggestionsAbout">
                <div className="suggestionsTitle">{item?.title}</div>
                <div className="suggestionsChannelName non-focus">{item?.user.channelName}</div>
                <div className="suggestionsViewsUploadTime non-focus">{item?.createdAt.slice(0,10)}</div>
              </div>
            </Link>
          )
        })}
        

      </div>
      <ToastContainer/>
    </div>
  )
}

export default video
