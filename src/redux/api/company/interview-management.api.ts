import { AxiosError } from "axios";
import api from "../axios";

export const companyCreateInterview = async (payload: any) => {
  try {
    const res = await api.post(`/interview/interview_setup/`, payload);
    return res.data;
  } catch (err: any) {
    throw new AxiosError(err);
  }
};

export const companyGetJobInterview = async (jobId: any) => {
  try {
    if (jobId === "") {
      return [];
    }
    const res = await api.get(`/interview/interview_setup/${jobId}/`);

    return res.data;
  } catch (err: any) {
    throw new AxiosError(err);
  }
};

export const companyInterviewManagementFilterCandidatesByStatus = async (
  payload: any
) => {
  try {
    const res = await api.post(
      `/jobs/company-job-handler/get_sorted_job_candidate/`,
      payload
    );
    return res.data;
  } catch (error: any) {
    throw new AxiosError(error);
  }
};

export const companyInterviewManagementFilterCandidatesByTest = async (
  payload: any
) => {
  try {
    const res = await api.post(
      `/jobs/company-job-handler/get_sorted_job_candidate_test/`,
      payload
    );
    return res;
  } catch (error: any) {
    throw new AxiosError(error);
  }
};

export const companyInviteCandidateForInterview = async (payload: any) => {
  try {
    const res = await api.post(
      `/jobs/company-job-handler/invite_candidate/`,
      payload
    );
    return res.data;
  } catch (error: any) {
    throw new AxiosError(error);
  }
};

export type getCandidateThatAcceptedInterviewResponse ={
  "id": number,
  "interview": number,
  "date_picked": string,
  "time_picked": string,
  "has_mail_sent": boolean,
  "has_picked_invitation":boolean,
  "job_seeker": {
      "full_name": string,
      "email":string,
      "cv": string
  },
  "candidates_applied": number,
  "job": {
      "company_name": string,
      "position": string
  }
}
export const getCandidateThatAcceptedInterview = async(job_id:string):Promise<getCandidateThatAcceptedInterviewResponse[]>=>{
  const resp = await api.get(`/interview/interview_setup/get_candidate_that_accepted_interview/?job_id=${job_id}`)
  return resp.data.data
}