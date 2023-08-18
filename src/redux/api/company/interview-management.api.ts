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
