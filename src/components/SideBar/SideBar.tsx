import React, { FC } from "react";
import {
  SideBarContainer,
  SideBtn,
  SideBtnCon,
  SideLogo,
} from "./SideBar.style";
import Logo from "../../assets/Logo.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import QuizIcon from "@mui/icons-material/Quiz";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

type Props = {
  show?: boolean;
  navlinks?:{
    name:string,
    link:string,
    icon:any
  }[]
};

const SideBar: FC<Props> = ({ show,navlinks=[
  {name:'DashBoard',link:'/',icon:<DashboardIcon />},
  {name:'Jobs',link:'/',icon:<LibraryBooksIcon />},
  {name:'CV Management',link:'/cvmanagement',icon:<ArrowUpwardIcon />},
  {name:'Test Management',link:'/test-management',icon:<QuizIcon/>},
  {name:'Interview Management',link:'/interviews',icon:<ImportContactsIcon />},
  {name:'Documentation Management',link:'/document_managent',icon:<FileOpenIcon />},
  {name:'Medicals Invite',link:'/medicals',icon:<FileOpenIcon  />},
  {name:'',link:'/',icon:<DashboardIcon />},
] }) => {
  const navigate = useNavigate()
  return (
    <SideBarContainer show={show}>
      <SideLogo>
        <img alt="" src={Logo} />
      </SideLogo>

      <SideBtnCon>
        {/* <SideBtn onClick={e=>navigate('')}>
        </SideBtn> */}
        {/* <SideBtn onClick={e=>navigate('/jobs_list')}>
          <LibraryBooksIcon />
          
        </SideBtn> */}
 {
  navlinks.map((d,index)=>(
    <SideBtn key={index} onClick={e=>navigate(d.link)}>
    {d.icon}
    {d.name}
  </SideBtn>
  ))
 }

 
        <SideBtn>
          <LogoutIcon />
          Logout
        </SideBtn>
      </SideBtnCon>
    </SideBarContainer>
  );
};

export default SideBar;
