import React from 'react'
import './sideNavbar.css'
import HomeIcon from '@mui/icons-material/Home'
import VideocamIcon from '@mui/icons-material/Videocam'
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import HistoryIcon from '@mui/icons-material/History'
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ContentCutOutlinedIcon from '@mui/icons-material/ContentCutOutlined';

const SideNavbar = ({sideNavbar}) => {
  return (
    <div className={sideNavbar?"home-sideNavbar":"home-sideNavbar-hidden"}>
        <div className="home_sideNavbarTop">

            <div className={`home_sideNavbarTopOption`}>
                <HomeIcon sx={{color:'white'}}/>
                <div className="home_sideNavbarTopOptionTitle">Home</div>
            </div>

            <div className={`home_sideNavbarTopOption`}>
                <VideocamIcon sx={{color:'white'}}/>
                <div className="home_sideNavbarTopOptionTitle">Shorts</div>
            </div>

            <div className={`home_sideNavbarTopOption`}>
                <SubscriptionsIcon sx={{color:'white'}}/>
                <div className="home_sideNavbarTopOptionTitle">Subscriptions</div>
            </div>

        </div>

        <div className="home_sideNavbarMiddle">

            <div className={`home_sideNavbarTopOption`}>
                <div className="home_sideNavbarTopOptionTitle">You</div>
                <ChevronRightIcon sx={{color:'white'}}/>
            </div>

            <div className={`home_sideNavbarTopOption`}>
                <RecentActorsIcon sx={{color:'white'}}/>
                <div className="home_sideNavbarTopOptionTitle">Your Channel</div>                
            </div>

            <div className={`home_sideNavbarTopOption`}>
                <HistoryIcon sx={{color:'white'}}/>
                <div className="home_sideNavbarTopOptionTitle">History</div>                
            </div>

            <div className={`home_sideNavbarTopOption`}>
                <PlaylistPlayIcon sx={{color:'white'}}/>
                <div className="home_sideNavbarTopOptionTitle">Playlists</div>                
            </div>

            <div className={`home_sideNavbarTopOption`}>
                <SlideshowIcon sx={{color:'white'}}/>
                <div className="home_sideNavbarTopOptionTitle">Your videos</div>                
            </div>

            <div className={`home_sideNavbarTopOption`}>                
                <WatchLaterOutlinedIcon sx={{color:'white'}}/>
                <div className="home_sideNavbarTopOptionTitle">Watch Later</div>                
            </div>

            <div className={`home_sideNavbarTopOption`}>                
                <ThumbUpOutlinedIcon sx={{color:'white'}}/>
                <div className="home_sideNavbarTopOptionTitle">Liked Videos</div>                
            </div>

            <div className={`home_sideNavbarTopOption`}>                
                <ContentCutOutlinedIcon sx={{color:'white'}}/>
                <div className="home_sideNavbarTopOptionTitle">Your clips</div>                
            </div>

        </div>

        <div className="home_sideNavbarMiddle">
            <div className="home_sideNavbarTopOption">
                <div className="home_sideNavbarTopOptionTitleHeader">
                    Subscription                    
                </div>
            </div>

            <div className="home_sideNavbarTopOption">
                <img src="https://notcommon-production.s3.amazonaws.com/uploads/collection/image/21109/open-uri20240708-17078-owizqu" alt="" className="home_sideNavbar_ImgLogo" />
                <div className="home_sideNavbarTopOptionTitle">Aaj Tak</div>
            </div>

            <div className="home_sideNavbarTopOption">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8t7oy87rkFf7MqMkYim4St0aaK1XDIO0DLQ&s" alt="" className="home_sideNavbar_ImgLogo" />
                <div className="home_sideNavbarTopOptionTitle">NDTV News</div>
            </div>

            <div className="home_sideNavbarTopOption">
                <img src="https://yt3.googleusercontent.com/ytc/AIdro_kr4Xv6GpEaeOVO9n6gQ29NDGs4YuW2HJkGOSqaZ1IAoA=s900-c-k-c0x00ffffff-no-rj" alt="" className="home_sideNavbar_ImgLogo" />
                <div className="home_sideNavbarTopOptionTitle">Chetan Bhagat</div>
            </div>
        </div>
    </div>
  )
}

export default SideNavbar
