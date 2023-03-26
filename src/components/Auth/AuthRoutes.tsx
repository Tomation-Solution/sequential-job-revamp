import { Route, Routes } from "react-router-dom";
import SignUpRoutes from "./SignUp/SignUpRoutes";
import Login from "./Login";

const AuthRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<SignUpRoutes />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default AuthRoutes;
