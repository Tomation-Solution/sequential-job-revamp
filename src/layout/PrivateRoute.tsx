//THIS IS UNUSED TO BE REMOVED ON THE NEXT PUSH, IF YOU SEE IT HERE PLEASE REMOVE OR INGONRE

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useToast from "../hooks/useToastify";
import { getUser } from "../utils/extraFunction";

type Prop = React.PropsWithChildren<{
  user_type: "company" | "job_seakers" | "hr" | "admin" | "panelist";
}>;
const PrivateLayoutRoute = ({ user_type, children }: Prop) => {
  const location = useLocation();
  const user = getUser();

  const { notify } = useToast();
  if (!user || user.user_type !== user_type) {
    notify("please login", "error");
    return <Navigate to={"/login"} state={{ from: location.pathname }} />;
  }
  return <>{children}</>;
};

export default PrivateLayoutRoute;
