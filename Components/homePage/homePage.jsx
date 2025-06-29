import React, { useEffect, useState } from "react";
import "./homePage.css";
import { Link } from "react-router-dom";
import axios from "axios";

const HomePage = ({ sideNavbar }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/allVideo`)
      .then((res) => {
        console.log(res.data.videos);
        console.log("v-0.1.0")
        setData(res.data.videos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const options = [
    "All",
    "Gaming",
    "Camping",
    "Comedy",
    "Bike ride",
    "Motovlogs",
    "gta",
    "Bike ride",
    "tech",
    "Gym",
    "Gaming",
    "pc builds",
    "Day in the life",
    "Music",
    "Gaming",
    "Motovlogs",
    "gta",
    "Bike ride",
    "tech",
    "Gym",
    "Gaming",
    "pc builds",
  ];

  return (
    <div className={sideNavbar ? "homePage" : "fullHomePage"}>
      <div className="homePage_options">
        {options.map((item, index) => {
          return (
            <div key={index} className="homepage_option">
              {" "}
              {item}
            </div>
          );
        })}
      </div>

      <div className={sideNavbar ? "home_mainPage" : "home_mainPageFull"}>
        {data?.map((item, ind) => {
          return (
            <Link to={`/watch/${item._id}`} className="youtube_video">
              <div className="youtube_thumbnailBox">
                <img
                  src={item.thumbnail}
                  alt="Thumbnail"
                  className="youtube_thumbnailPic"
                />
                <div className="youtube_thumbnailTiming">28:25</div>
              </div>

              <div className="youtubeTitleBox">
                <div className="youtubeTitleBoxProfile">
                  <img
                    src={item.user.profilePic}
                    alt="Profile"
                    className="youtubeTitleBoxProfileImg"
                  />
                </div>

                <div className="youtubeTitleBoxInfo">
                  <div className="youtubeTitleBoxTitle">{item.title}</div>
                  <div className="youtubeTitleBoxChannel">{item.user.channelName}</div>
                  <div className="youtubeTitleBoxLikes">{item.like} likes</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
