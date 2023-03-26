import React from "react";
import {
  DecisionContainer,
  SignUpContainer,
  SignUpWrapper,
} from "./SignUp/Signup.styles";
import { Form, FormContainer, FormInput } from "./SignUp/styles/forms.styles";
import { Link } from "react-router-dom";
import EastIcon from "@mui/icons-material/East";
import Logo from "../../assets/Logo.png";

// styles here were copied from signups.styles.tsx and forms.styles.tsx
// and then modified to fit the needs of this component

const Login = () => {
  return (
    <SignUpContainer>
      <SignUpWrapper>
        <img alt="logo" src={Logo} />
        <FormContainer>
          <h2>Get Started</h2>
          <p>
            Dont have an account yet? <Link to={"/"}>Sign Up</Link>
          </p>

          <DecisionContainer>
            <Form>
              <FormInput>
                <label htmlFor="phoneNumber">Phone Number</label>
                <input type="phone" id="phoneNumber" />
              </FormInput>
              <FormInput>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" />
              </FormInput>
            </Form>
            <button>
              <span>Continue</span>
              <EastIcon />
            </button>
          </DecisionContainer>
        </FormContainer>
      </SignUpWrapper>
    </SignUpContainer>
  );
};

export default Login;
