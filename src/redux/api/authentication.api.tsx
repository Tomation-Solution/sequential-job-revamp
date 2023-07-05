import { string } from "yup";
import { signUpAsJobSeekerForm } from "../../components/Auth/SignUp/SignUp";
import { CvManagementFormType } from "../../pages/CVManagement/CVManagement";
import api from "./axios";

export type UserType = {
  token_type: "access" | "refresh";
  exp: number;
  iat: number;
  jti: string;
  user_id: string;
  email: string;
  user_type: "company" | "job_seakers" | "hr" | "admin" | "panelist";
  full_name: string;
  profile_image: string;
};

type SigupJobSeekerResponse = {
  status: 201;
  message: string;
  data: any[];
};

export const signUpAsJobSeekerApi = async (
  data: signUpAsJobSeekerForm
): Promise<SigupJobSeekerResponse> => {
  const resp = await api.post("/auth/create-seeker/", data);
  return resp.data;
};

export const signUpAsJobRecruiterrApi = async (
  data: signUpAsJobSeekerForm
): Promise<SigupJobSeekerResponse> => {
  const resp = await api.post("/auth/create-company/", data);
  return resp.data;
};

type SignInApiResponse = {
  status: 200;
  message: string;
  data: {
    tokens: {
      refresh: string;
      access: string;
    };
  };
};
export const signInApi = async (data: {
  email: string;
  password: string;
}): Promise<SignInApiResponse> => {
  const resp = await api.post("/auth/login/", {
    email: data.email.toLowerCase().trim(),
    password: data.password,
  });
  return resp.data;
};

export const updateCvApi = async (payload: CvManagementFormType) => {
  const formData = new FormData();
  formData.append("personal_statement", payload.personal_statement);
  formData.append("phone_number", payload.phone_number);
  formData.append("first_name", payload.first_name);
  formData.append("middle_name", payload.middle_name);
  formData.append("last_name", payload.last_name);
  formData.append("email", payload.email);
  formData.append("addresse", payload.addresse);
  formData.append("state", payload.state);
  formData.append("linkdin", payload.linkdin);
  formData.append("twitter", payload.twitter);
  formData.append("city", payload.city);
  formData.append("education", JSON.stringify(payload.education));
  formData.append("experience", JSON.stringify(payload.experience));
  formData.append("certificaton", JSON.stringify(payload.certification));
  formData.append("refrences", JSON.stringify(payload.refrences));
  formData.append("country_of_residence", payload.country_of_residence);

  const resp = await api.patch("/auth/jobseeker-profile/", formData);
  return resp.data;
};

type CvServerTypeRepsonse = {
  full_name: string;
  profile_image: string;
  phone_number: string;
  user_extra: {
    job_categories: string[];
    job_seakers: {
      cv: string;
      notify_me_on: string;
      cvStucture: {
        first_name: string;
        middle_name: string;
        last_name: string;
        phone_number: string;
        email: string;
        addresse: string;
        state: string;
        country_of_residence: string;
        linkdin: string;
        twitter: string;
        personal_statement: string;
        education: {
          end_year: string;
          start_year: string;
          degree_type: string;
          school_name: string;
          course_of_study: string;
        }[];
        experience: {
          role: string;
          company: string;
          end_year: string;
          start_year: string;
          responsibilities: string;
        }[];
        certificaton: {
          issuer: string;
          start_year: string;
          certification: string;
        }[];
        refrences: {
          email: string;
          full_name: string;
          phone_number: string;
          relationship: string;
        }[];
      };
    };
  };
};
export const get_jobseerker_profile =
  async (): Promise<CvServerTypeRepsonse> => {
    const resp = await api.get("/auth/jobseeker-profile/");
    return resp.data.data;
  };
