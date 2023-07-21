import MainBody from "../components/MainBody/MainBody";
import SideBar from "../components/SideBar/SideBar";
import PrivateLayoutRoute from "./PrivateRoute";
const MainLayout = () => {
  return (
    <PrivateLayoutRoute user_type="job_seakers">
      <SideBar />
      <MainBody />
    </PrivateLayoutRoute>
  );
};

export default MainLayout;
