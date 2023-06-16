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
import { useMutation } from "react-query";
import { signInApi } from "../../redux/api/authentication.api";
import { getUser, setUser } from "../../utils/extraFunction";
import useToast from "../../hooks/useToastify";
import Button from "../Button/Button";
import Preloader from "../Preloader/Preloader";
// styles here were copied from signups.styles.tsx and forms.styles.tsx
// and then modified to fit the needs of this component


const schema = yup.object({
  email: yup.string().email().required(),
  password:yup.string().required(),
})

type LoginFormType = yup.InferType<typeof schema>;
const Login = () => {
  const navigate = useNavigate();
  const {notify} = useToast()
  const {mutate,isLoading} = useMutation(signInApi,{
    'onSuccess':(data)=>{
      if(data.status == 200){
        const user = setUser(data.data.tokens)
        const savedUser = getUser()
        notify(`Welcome back ${savedUser?.full_name}`,'success')
        if(savedUser?.user_type ==='job_seakers'){
          navigate('/')
        }else{
          navigate('/company/dashboard')

        }
      }
    },
    'onError':(error:any)=>{
      const data:any = error.response.data
      notify(data.message,'error')
    }
  })
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormType>({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: LoginFormType) =>{
    console.log({data});
    mutate(data)
  } 
  console.log({'foprm error':errors})

  return (
    <SignUpContainer>
      <SignUpWrapper>
        <img alt="logo" src={Logo} />
        <Preloader loading={isLoading} />
        <FormContainer>
          <h2>Get Started</h2>
          <p>
            Dont have an account yet? <Link to={"/sign-up"}>Sign Up</Link>
          </p>

          <DecisionContainer>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <InputWithLabel 
                  label="email"
                  register={register('email')}
                  errorMessage={errors.email?.message}
              />
               <InputWithLabel 
                  label="password"
                  register={register('password')}
                  errorMessage={errors.password?.message}
                  type='password'
              />
              <br />
              <Button type="submit">
                Login
              </Button>
            </Form>

          </DecisionContainer>
        </FormContainer>
      </SignUpWrapper>
    </SignUpContainer>
  );
};

export default Login;
