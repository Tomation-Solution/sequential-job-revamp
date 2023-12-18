import React, {useState} from "react";
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
import ProfileImg from "../../../assets/ProfileImg.jpeg";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../../../assets/Logo.png";
import SideBar from "../../SideBar/SideBar";
import {useQuery} from "react-query";
import {get_jobseerker_profile} from "../../../redux/api/authentication.api";

const MainNavBar = () => {
    const [showNav, setShowNav] = useState(false);
    const {data: mydata} = useQuery(
        "mycv",
        get_jobseerker_profile
    );

    const showNavHandler = () => {
        setShowNav(!showNav);
    };

    return (
        <>
            <SideBar show={showNav}/>
            <MainNavLogoCon>
                <img alt="" src={Logo}/>

                <MenuIcon onClick={showNavHandler}/>
            </MainNavLogoCon>
            <MainNavContainer>
                <MainNavContentHolder>
                    <p style={{fontSize: "1.5rem", fontWeight: "500", textTransform: "uppercase"}}>{mydata?.full_name || ""}</p>
                    {/*<MainNavDropDown>*/}
                    {/*  <CalendarMonthIcon />*/}
                    {/*  <p>12.03.23</p>*/}
                    {/*  <p>-</p>*/}
                    {/*  <p>20.03.23</p>*/}
                    {/*  <ArrowDropDownIcon />*/}
                    {/*</MainNavDropDown>*/}

                    {/*<MainNavDropDown>*/}
                    {/*  <WorkIcon />*/}
                    {/*  All Jobs*/}
                    {/*  <ArrowDropDownIcon />*/}
                    {/*</MainNavDropDown>*/}
                </MainNavContentHolder>

                <MainNavContentHolder>
                    <MainNavProfile>
                        <NotificationsNoneOutlinedIcon/>
                        <img alt="" src={mydata?.profile_image || ProfileImg} style={{backgroundColor: "#aaa"}} />
                    </MainNavProfile>
                </MainNavContentHolder>
            </MainNavContainer>
        </>
    );
};

export default MainNavBar;
