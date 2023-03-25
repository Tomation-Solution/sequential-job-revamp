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

type Props = {
  show?: boolean;
};

const SideBar: FC<Props> = ({ show }) => {
  return (
    <SideBarContainer show={show}>
      <SideLogo>
        <img alt="" src={Logo} />
      </SideLogo>

      <SideBtnCon>
        <SideBtn>
          <DashboardIcon />
          DashBoard
        </SideBtn>
        <SideBtn>
          <LibraryBooksIcon />
          Jobs
        </SideBtn>
        <SideBtn>
          <ArrowUpwardIcon />
          CV Management
        </SideBtn>
        <SideBtn>
          <QuizIcon />
          Test Management
        </SideBtn>
        <SideBtn>
          <ImportContactsIcon />
          Interview Management
        </SideBtn>
        <SideBtn>
          <FileOpenIcon />
          Documentation Management
        </SideBtn>
        <SideBtn>
          <CalendarMonthIcon />
          Calender
        </SideBtn>
        <SideBtn>
          <SettingsIcon />
          Settings
        </SideBtn>
        <SideBtn>
          <LogoutIcon />
          Logout
        </SideBtn>
      </SideBtnCon>
    </SideBarContainer>
  );
};

export default SideBar;
