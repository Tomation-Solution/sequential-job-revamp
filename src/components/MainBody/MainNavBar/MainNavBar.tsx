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

const MainNavBar = () => {
  const [showNav, setShowNav] = useState(false);

  const showNavHandler = () => {
    setShowNav(!showNav);
  };

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
            <p>12.03.23</p>
            <p>-</p>
            <p>20.03.23</p>
            <ArrowDropDownIcon />
          </MainNavDropDown>

          <MainNavDropDown>
            <WorkIcon />
            All Jobs
            <ArrowDropDownIcon />
          </MainNavDropDown>
        </MainNavContentHolder>

        <MainNavContentHolder>
          <MainNavProfile>
            <NotificationsNoneOutlinedIcon />
            <p>Elijah Papi</p>

            <img alt="" src={ProfileImg} />
          </MainNavProfile>
        </MainNavContentHolder>
      </MainNavContainer>
    </>
  );
};

export default MainNavBar;
