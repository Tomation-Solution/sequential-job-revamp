import SideBar from "../components/SideBar/SideBar";
import PrivateLayoutRoute from "./PrivateRoute";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import QuizIcon from "@mui/icons-material/Quiz";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { CompanyMainBody } from "../components/MainBody/MainBody";

export const companyNavLinks = [
  {
    name: "DashBoard",
    link: "/company/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Job Post Management",
    link: "/company/job-post-management",
    icon: <LibraryBooksIcon />,
  },
  {
    name: "Job Test Management",
    link: "/company/job-test-management",
    icon: <LibraryBooksIcon />,
  },
  {
    name: "Interview Managent",
    link: "/company/job-interview-management",
    icon: <NoteAltIcon />,
  },
  {
    name: "Interview Rating",
    link: "/company/interview-rating",
    icon: <NoteAltIcon />,
  },
  { name: "Documentation Management", link: "/company/documentation-management/", icon: <QuizIcon /> },
  // {
  //   name: "Medicals",
  //   link: "/company/medicals",
  //   icon: <MedicalServicesIcon />,
  // },
  { name: "Calendar", link: "/company/calendar", icon: <CalendarMonthIcon /> },
  {
    name: "Settings",
    link: "/company/settings",
    icon: <SettingsIcon />,
  },
];

const CompanyLayout = () => {
  return (
    <PrivateLayoutRoute user_type="company">
      <SideBar navlinks={companyNavLinks} />
      <CompanyMainBody />
    </PrivateLayoutRoute>
  );
};
export default CompanyLayout;
