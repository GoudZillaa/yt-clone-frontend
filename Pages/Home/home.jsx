import react from "react";
import SideNavbar from "../../Components/sideNavbar/sideNavbar";
import "./home.css";
import HomePage from "../../Components/homePage/homePage";

const Home = ({ sideNavbar, setSideNavbarFunc}) => {
  return (
    <div className="home">
      <SideNavbar sideNavbar={sideNavbar}  setSideNavbarFunc={setSideNavbarFunc} />
        <HomePage sideNavbar={sideNavbar} />
    </div>
  );
};

export default Home;
