import EastIcon from "@mui/icons-material/East";
import {
  DecisionContainer,
  SignUpContainer,
  SignUpWrapper,
} from "./Signup.styles";
import { Link } from "react-router-dom";
import Logo from "../../../assets/Logo.png";
import { FormContainer } from "./styles/forms.styles";

const SignUp = () => {
  return (
    <SignUpContainer>
      <SignUpWrapper>
        <img alt="logo" src={Logo} />
        <FormContainer>
          <h2>Sign Up</h2>
          <p>
            Already have and account? <Link to={"/login"}>Log In</Link>
          </p>

          <DecisionContainer>
            <p>Sign up as an organization/company</p>
            <Link to={"jobseekerpersonaldetails"}>
              <p>Sign up as an Individual</p>
            </Link>
          </DecisionContainer>
        </FormContainer>
      </SignUpWrapper>
    </SignUpContainer>
  );
};

export default SignUp;
