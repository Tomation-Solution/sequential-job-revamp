import React from "react";
import MainBody from "../components/MainBody/MainBody";
import SideBar from "../components/SideBar/SideBar";
import PrivateLayoutRoute from "./PrivateRoute";
const  MainLayout = () => {
  // const use/
  return (
    <PrivateLayoutRoute>
      <SideBar />
      <MainBody />
    </PrivateLayoutRoute>
  );
};

export default MainLayout;
