import React, { useState } from "react";
import {
  MainNavContainer,
  MainNavContentHolder,
  MainNavDropDown,
  MainNavLogoCon,
  MainNavProfile,
} from "./MainNavBar.styles";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import WorkIcon from "@mui/icons-material/Work";
import ProfileImg from "../../../assets/ProfileImg.png";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../../../assets/Logo.png";
import SideBar from "../../SideBar/SideBar";
import NofiicationComponent from "../../NofiicationComponent";
import { getUser } from "../../../utils/extraFunction";
import moment from "moment";

const MainNavBar = () => {
  let now = moment();
  const [showNav, setShowNav] = useState(false);
  const user = getUser()
  const showNavHandler = () => {
    setShowNav(!showNav);
  };
console.log({now})
  return (
    <>
      <SideBar show={showNav} />
      <MainNavLogoCon>
        <img alt="" src={Logo} />

        <MenuIcon onClick={showNavHandler} />
      </MainNavLogoCon>
      <MainNavContainer>
        <MainNavContentHolder>
          <MainNavDropDown>
            <CalendarMonthIcon />

            {now.date()}.{now.month()}.{now.year()}
          </MainNavDropDown>

            {/* <ArrowDropDownIcon /> */}
          {/* <MainNavDropDown>
            <WorkIcon />
            All Jobs
            <ArrowDropDownIcon />
          </MainNavDropDown> */}
        </MainNavContentHolder>
            {/* <p>12.03.23</p>
            <p>-</p>
            <p>20.03.23</p> */}
        <MainNavContentHolder>
          <MainNavProfile>
            <NofiicationComponent />
            {/* <NotificationsNoneOutlinedIcon /> */}
            <p>{user?.full_name}</p>

            <img alt="" src={user?.profile_image} />
          </MainNavProfile>
        </MainNavContentHolder>
      </MainNavContainer>
    </>
  );
};

export default MainNavBar;
