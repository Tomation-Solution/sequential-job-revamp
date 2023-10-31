import { FC, useState } from "react";
import {
  SideBarCloseButton,
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
import LogoutIcon from "@mui/icons-material/Logout";
import { useLocation, useNavigate } from "react-router-dom";
import { removeUserCred } from "../../utils/extraFunction";
import { RxHamburgerMenu } from "react-icons/rx";
import { ImCancelCircle } from "react-icons/im";
import { seqLightBlue } from "../../globals/colors";

type Props = {
  show?: boolean;
  width?: string;
  navlinks?: {
    name: string;
    link: string;
    icon: any;
  }[];
};

const SideBar: FC<Props> = ({
  show,
  width,
  navlinks = [
    { name: "DashBoard", link: "/", icon: <DashboardIcon /> },
    { name: "Jobs", link: "/jobs_list", icon: <LibraryBooksIcon /> },
    { name: "CV Management", link: "/cvmanagement", icon: <ArrowUpwardIcon /> },
    { name: "Test Management", link: "/test-management", icon: <QuizIcon /> },
    {
      name: "Interview Management",
      link: "/interviews",
      icon: <ImportContactsIcon />,
    },
    {
      name: "Documentation Management",
      link: "/document_managent",
      icon: <FileOpenIcon />,
    },
    // { name: "Medicals Invite", link: "/medicals", icon: <FileOpenIcon /> },
    { name: "Settings", link: "/settings", icon: <DashboardIcon /> },
  ],
}) => {
  const navigate = useNavigate();

  const location = useLocation();

  const [showNavBar, setShowNavBar] = useState(false);

  return (
    <>
      <SideBarCloseButton onClick={() => setShowNavBar(!showNavBar)}>
        {!showNavBar ? (
          <RxHamburgerMenu
            size={25}
            color={`${seqLightBlue}`}
            fontWeight={800}
          />
        ) : (
          <ImCancelCircle size={25} color="red" fontWeight={800} />
        )}
      </SideBarCloseButton>

      <SideBarContainer width={width} show={showNavBar}>
        <SideLogo>
          <img alt="" src={Logo} />
        </SideLogo>

        <SideBtnCon>
          {navlinks.map((d, index) => (
            <SideBtn
              key={index}
              onClick={(e) => navigate(d.link)}
              isSelected={location.pathname === d.link}
            >
              {d.icon}
              {d.name}
            </SideBtn>
          ))}

          <SideBtn
            onClick={(e) => {
              removeUserCred();
              navigate("/login");
            }}
          >
            <LogoutIcon />
            Logout
          </SideBtn>
        </SideBtnCon>
      </SideBarContainer>
    </>
  );
};

export default SideBar;
