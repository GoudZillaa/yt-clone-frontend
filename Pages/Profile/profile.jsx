import React,{useState,useEffect} from 'react'
import './profile.css'
import SideNavbar from '../../Components/sideNavbar/sideNavbar'
import user from '../../src/assets/user.png'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import {Link,useParams} from 'react-router-dom'
import axios from 'axios'

const profile = ({sideNavbar}) => {
  const {id} = useParams();
  const [data,setData]=useState([]);
  const [user,setUser]=useState(null)

  const fetchProfileData=async()=>{
    await axios.get(`http://localhost:4000/api/${id}/channel`)
    .then((response)=>{
      setData(response?.data?.video)
      console.log(response?.data?.video)
      setUser(response?.data?.video[0].user)
    }).catch(err=>{
      console.log(err)
    })
  }
  useEffect(()=>{
    fetchProfileData();
  },[])
  return (
    <div className='profile'>
        <SideNavbar sideNavbar={sideNavbar}/>
        <div className={sideNavbar?"profilePage":"fullProfilePage"}>

            <div className="topSection">

                <div className="profileSection">
                    <img src={user?.profilePic} alt="" className="profileImage" />
                </div>
                <div className="aboutSection">
                  <div className="profileUsername">
                    {user?.channelName}
                  </div>
                  <div className="profileInfo">
                    @{user?.userName} . {data?.length} Videos
                  </div>
                  <div className="profileInfo">
                    {user?.about}
                  </div>
                </div>

            </div>

            <div className="profileVideos">

              <div className="profileVideosTitle">
                Videos &nbsp; <ArrowRightIcon/>
              </div>

              <div className="profile_videos">
                {
                  data?.map((item,ind)=>{
                    return(
                      <Link to={`/watch/${item._id}`} className="profileVideo_block">
                        <div className="profileVideo_block_thumbnail">
                          <img src={item.thumbnail} alt="" className="thumbnailProfile" />
                        </div>

                        <div className="profileVideo_block_details">
                          <div className="profileVideo_block_details_name">{item.title}</div>
                          <div className="profileVideo_block_details_info">create at {item.createdAt.slice(0,10)}</div>
                        </div>

                      </Link>
                    )
                  })
                }

              </div>

            </div>
        </div>
    </div>
  )
}

export default profile
