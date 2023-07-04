import { Route, Routes } from "react-router-dom";
import SignUp from "./SignUp";
import JobSeekerPersonalDetails from "./JobSeekerPersonalDetails";
import Verify from "./Verify";
import ComapnySignup from "./Company-Signup";

const SignUpRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/sign-up-company" element={<ComapnySignup />} />
        <Route
          path="/jobseekerpersonaldetails"
          element={<JobSeekerPersonalDetails />}
        />{" "}
        <Route path="/verifyemail" element={<Verify />} />
      </Routes>
    </div>
  );
};

export default SignUpRoutes;
