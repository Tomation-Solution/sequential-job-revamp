import { PanelistMainBody } from "../components/MainBody/MainBody";
import SideBar from "../components/SideBar/SideBar";
import PrivateLayoutRoute from "./PrivateRoute";
import DashboardIcon from "@mui/icons-material/Dashboard";

const panelistNavLinks = [
  {
    name: "Panelist Candidate Rating",
    link: "/panelist/invite",
    icon: <DashboardIcon />,
  },
];

const PanelistLayout = () => {
  return (
    <PrivateLayoutRoute user_type="panelist">
      <SideBar width="290px" navlinks={panelistNavLinks} />
      <PanelistMainBody />
    </PrivateLayoutRoute>
  );
};

export default PanelistLayout;
