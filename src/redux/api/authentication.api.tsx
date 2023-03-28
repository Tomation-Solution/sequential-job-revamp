import { signUpAsJobSeekerForm } from "../../components/Auth/SignUp/SignUp";
import api from "./axios";



export type UserType = {
    "token_type": "access" |"refresh",
  "exp": number,
  "iat":number,
  "jti": string,
  "user_id": string,
  "email": string,
  "user_type": 'company'|'job_seakers'|'hr'|'admin'|'panelist';
  'full_name':string;
  'profile_image':string
}

type SigupJobSeekerResponse = {
  "status": 201,
  "message": string,
  "data": any[]
}

export const signUpAsJobSeekerApi = async (data:signUpAsJobSeekerForm ):Promise<SigupJobSeekerResponse>=>{
    const  resp = await api.post('/auth/create-seeker/',data)
    return resp.data
}



type SignInApiResponse = {
  "status": 200,
  "message":string,
  "data": {
      "tokens": {
          "refresh": string,
          "access": string
      }
  }
}
export const signInApi =async(data:{'email':string,'password':string}):Promise<SignInApiResponse>=>{
    const resp = await api.post('/auth/login/',{'email':data.email.toLowerCase().trim(),'password':data.password})
    return resp.data
}
