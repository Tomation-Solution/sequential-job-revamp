import SideBar from "../components/SideBar/SideBar"
import PrivateLayoutRoute from "./PrivateRoute"
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import QuizIcon from "@mui/icons-material/Quiz";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import MainBody, { CompanyMainBody } from "../components/MainBody/MainBody";


const CompanyLayout = ()=>{
    return (
        <PrivateLayoutRoute>
            <SideBar
                navlinks={[
                    {name:'DashBoard',link:'/company/dashboard',icon:<DashboardIcon />},
                    {name:'Job Post Management',link:'/',icon:<LibraryBooksIcon />},
                    {name:'Job Test Management',link:'/',icon:<LibraryBooksIcon />},
                    {name:'Interview Managent',link:'/cvmanagement',icon:<NoteAltIcon />},
                    {name:'Documentation Management',link:'/test-management',icon:<QuizIcon/>},
                    {name:'Interview Management',link:'/interviews',icon:<ImportContactsIcon />},
                    {name:'Documentation Management',link:'/document_managent',icon:<FileOpenIcon />},
                    {name:'Medicals',link:'/medicals',icon:<MedicalServicesIcon  />},
                    {name:'Calendar',link:'/medicals',icon:<CalendarMonthIcon  />},
                    {name:'Settings',link:'/medicals',icon:<SettingsIcon  />},
                    {name:'',link:'/',icon:<DashboardIcon />},
                ]}
            />
            <CompanyMainBody />
        </PrivateLayoutRoute>
    )
}
export default CompanyLayout