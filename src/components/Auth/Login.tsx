import React from "react";
import {
  DecisionContainer,
  SignUpContainer,
  SignUpWrapper,
} from "./SignUp/Signup.styles";
import {
  Form,
  FormContainer,
} from "../../globals/styles/forms.styles";
import { Link } from "react-router-dom";
import EastIcon from "@mui/icons-material/East";
import Logo from "../../assets/Logo.png";
import InputWithLabel from "../InputWithLabel/InputWithLabel";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
// styles here were copied from signups.styles.tsx and forms.styles.tsx
// and then modified to fit the needs of this component


const schema = yup.object({
  email: yup.string().email().required(),
  full_name:yup.string().required(),
  password:yup.string().required(),
  confirm_password:yup.string().oneOf([yup.ref('password')],'Passwords must match'),
  phone:yup.number().min(11).required(),
})

type FormData = yup.InferType<typeof schema>;
const Login = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });
  return (
    <SignUpContainer>
      <SignUpWrapper>
        <img alt="logo" src={Logo} />
        <FormContainer>
          <h2>Get Started</h2>
          <p>
            Dont have an account yet? <Link to={"/sign-up"}>Sign Up</Link>
          </p>

          <DecisionContainer>
            <Form>
              {/* <InputWithLabel 
                  label="Email"
              /> */}
              
            </Form>

          </DecisionContainer>
        </FormContainer>
      </SignUpWrapper>
    </SignUpContainer>
  );
};

export default Login;
