import { DecisionContainer, SignUpContainer, SignUpWrapper } from "./SignUp/Signup.styles"
import InputWithLabel from "../InputWithLabel/InputWithLabel"
import Button from "../Button/Button"
import {Form, FormContainer } from "../../globals/styles/forms.styles"

import Logo from "../../assets/Logo.png";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useMutation } from "react-query";
import { requestForgotPasswordApi, resetPasswordAPi } from "../../redux/api/authentication.api";
import { useState } from "react";
import useToast from "../../hooks/useToastify";
import Preloader from "../Preloader/Preloader";


const schema = yup.object({
    'email':yup.string().email().required()
})
type ForgotPasswordForm = yup.InferType<typeof schema>
const ForgotPassword = ()=>{
    const navigate = useNavigate();
    const {notify} = useToast()
    const go = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordForm>({
        resolver: yupResolver(schema)
      });
      const {mutate,isLoading} = useMutation(requestForgotPasswordApi,{
        'onSuccess':(data)=>{
            notify('Please check your mail for reset password link','success')
            // go('/reset-password')
        },'onError':(error:any)=>{
            notify('Please Check your internet and try again','error')
        }   
      })
      const onSubmit = ({email}: ForgotPasswordForm) =>{
        mutate({'email':email})
      }
    return (
                <SignUpContainer>
      <SignUpWrapper>
        <img alt="logo" src={Logo} />
        <Preloader loading={isLoading} />
        <FormContainer>
          <h2>Forgot your password</h2>
          <p>
          Enter your email address below and we’ll send you an email with a link to update your password.
          </p>

          <DecisionContainer>
            <Form 
            onSubmit={handleSubmit(onSubmit)}
            >
             <InputWithLabel 
                  label="Email"
                  register={register('email')}
                  errorMessage={errors.email?.message}
              />
              <br />
              <p
              onClick={e=>{
                navigate('/sign-up')
              }}
              style={{'color':'#24cde2','textAlign':'right','margin':'5px 0'}}><strong>Sign up here?</strong></p>
              <Button type="submit">
                SIGN IN
              </Button>
            </Form>

          </DecisionContainer>
        </FormContainer>
      </SignUpWrapper>
    </SignUpContainer>
    )
}

export default ForgotPassword


const ResetPasswordSchema = yup.object({
    new_password:yup.string().required(),
})
type ResetPasswordSchemaI = yup.InferType<typeof ResetPasswordSchema>
export const ResetPassword =()=>{
    const {notify} = useToast()
    const go = useNavigate()


    const {isLoading,mutate} = useMutation(resetPasswordAPi,{
        'onSuccess':(data)=>{
            notify('Password Reset Successfully','success')
            go('/login')
        },
        'onError':(error)=>{
            notify('Invalid reset password link','error')
        }
    })
    const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordSchemaI>({
        resolver: yupResolver(ResetPasswordSchema)
      });
      const {uid,token} = useParams()
    // const [searchParams, setSearchParams] = useSearchParams();
        const onSubmit = (data: ResetPasswordSchemaI) =>{
            // let uid =searchParams.get('uid') 
            // let token =searchParams.get('token') 
            // console.log(data,{uid,token})
            if(uid&&token){
                mutate({
                    'token':token,
                    'uidb64':uid,
                    'new_password':data.new_password
                })
            }
        }
    return (
        <SignUpContainer>
        <SignUpWrapper>
          <img alt="logo" src={Logo} />
          <Preloader loading={isLoading} />
          <FormContainer>
            <h2>Reset your password</h2>
            <p>
            Please enter your new password
            </p>
  
            <DecisionContainer>
              <Form 
              onSubmit={handleSubmit(onSubmit)}
              >
               <InputWithLabel 
                    label="New Password"
                    register={register('new_password')}
                    errorMessage={errors.new_password?.message}
                />
                <Button type="submit">
                  Reset Password
                </Button>
              </Form>
  
            </DecisionContainer>
          </FormContainer>
        </SignUpWrapper>
      </SignUpContainer>
    )
}