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
