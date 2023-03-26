import React from "react";
import { Container } from "./Signup.styles";
import { Link } from "react-router-dom";
import Logo from "../../../assets/Logo.png";
import {
  CodeContainer,
  Form,
  FormButton,
  FormContainer,
  Header,
  VerificationCodeContainer,
} from "../../../globals/styles/forms.styles";

const Verify = () => {
  return (
    <>
      <Container>
        <Link to="/">
          <img alt="logo" src={Logo} />
        </Link>
        <Header>
          <h1>SignUp</h1>
          <h3>Job Seeker</h3>
        </Header>
        <FormContainer>
          <Form>
            <p>
              An email with a verification code was sent to the specified email
              email@email.com
            </p>
            <p>
              {" "}
              If this number is not yours and you misspelled it, click{" "}
              <Link to={"/jobseekerpersonaldetails"}>edit</Link>
            </p>
            <VerificationCodeContainer>
              <p>VERIFICATION CODE</p>
              <CodeContainer>
                <input type="number" min={0} max={9} />
                <input type="number" min={0} max={9} />
                <input type="number" min={0} max={9} />
                <input type="number" min={0} max={9} />
              </CodeContainer>
            </VerificationCodeContainer>

            <FormButton>Verify</FormButton>
          </Form>
        </FormContainer>
      </Container>
    </>
  );
};

export default Verify;
