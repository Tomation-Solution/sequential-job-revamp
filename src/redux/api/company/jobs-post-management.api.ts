import { AxiosError } from "axios";
import api from "../axios";

export const companyCreateJobs = async (payload: any) => {
  try {
    const res = await api.post(`/jobs/company-job-handler/`, payload);
    return res.data;
  } catch (err: any) {
    throw new AxiosError(err);
  }
};

export const companyFilterQuestions = async (payload: any) => {
  try {
    const { jobId, ...data } = payload;
    const res = await api.post(`/jobs/company-filterquetion-handler/`, data);

    const postToJobPayload = {
      job_id: jobId,
      id: res.data?.data[0]?.job_filter_question_id,
      title: ".",
    };

    await api.post(
      `/jobs/company-filterquetion-handler/add_qeution_to_job/`,
      postToJobPayload
    );

    return res.data;
  } catch (err: any) {
    throw new AxiosError(err);
  }
};

export const companyGetJob = async (jobId: any) => {
  try {
    if (jobId === "" || jobId === "create_mode") {
      return { data: [] };
    }
    const res = await api.get(`/jobs/company-job-handler/${jobId}/`);
    return res.data;
  } catch (err: any) {
    throw new AxiosError(err);
  }
};

export const companyUpdateJobDetails = async (payload: any) => {
  const { jobId, formData } = payload;

  try {
    const res = await api.patch(
      `/jobs/company-job-handler/${jobId}/`,
      formData
    );
    return res.data;
  } catch (err: any) {
    throw new AxiosError(err);
  }
};

export const companySetCutOffDetails = async (payload: any) => {
  try {
    const res = await api.post(
      `/jobs/company-filterquetion-handler/set_cut_off_for_quetion/`,
      payload
    );
    return res.data;
  } catch (err: any) {
    throw new AxiosError(err);
  }
};

export const getJobCVSortingQuestions = async (jobId: string) => {
  try {
    if (jobId === "" || jobId === "create_mode") {
      return { data: [] };
    }

    const res = await api.get(
      `/jobs/company-filterquetion-handler/get_job_filter_questions?job_id=${jobId}`
    );
    return res.data;
  } catch (err: any) {
    throw new AxiosError(err);
  }
};
