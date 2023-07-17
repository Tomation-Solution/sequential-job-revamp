import { AxiosError } from "axios";
import api from "../axios";

export const getAllCompanyJobs = async () => {
  try {
    const res = await api.get(`/jobs/company-job-handler/`);
    return res.data;
  } catch (err: any) {
    throw new AxiosError(err);
  }
};

export const postCompanyJobTest = async (payload: any) => {
  try {
    const { jobId, payloadData } = payload;

    const res = await api.post(`/jobs/company-test-handler/`, payloadData);

    const testToJobPayload = {
      job_id: jobId,
      id: res.data?.data?.job_test_id,
      title: ".",
    };

    await api.post(
      `/jobs/company-test-handler/add_qeution_to_job/`,
      testToJobPayload
    );

    return res.data;
  } catch (err: any) {
    throw new AxiosError(err);
  }
};

export const getJobTestQuestions = async (jobId: string) => {
  try {
    const res = await api.get(
      `/jobs/company-test-handler/get_job_test_questions?job_id=${jobId}`
    );
    return res.data;
  } catch (err: any) {
    throw new AxiosError(err);
  }
};

export const postCompanyCutOffMark = async (payload: any) => {
  try {
    const res = await api.post(
      `/jobs/company-test-handler/set_cut_off_for_quetion/`,
      payload
    );
    return res.data;
  } catch (err: any) {
    throw new AxiosError(err);
  }
};

export const getJobInvitationLetter = async (jobId: any) => {
  try {
    const res = await api.get(
      `/jobs/company-test-handler/find-jobs-inivitation-letter/${jobId}`
    );
    return res.data;
  } catch (err: any) {
    if (err?.response.status === 404) {
      return {
        data: null,
      };
    } else {
      throw new AxiosError(err);
    }
  }
};

export const saveInvitationLetter = async (payload: any) => {
  try {
    const res = await api.post(
      `/jobs/company-test-handler/invitation-letter`,
      payload
    );
    return res.data;
  } catch (err: any) {
    throw new AxiosError(err);
  }
};

export const updateInvitationLetter = async (payload: any) => {
  const { invitationId, ...data } = payload;

  try {
    const res = await api.patch(
      `/jobs/company-test-handler/invitation-letter/${invitationId}`,
      data
    );
    return res.data;
  } catch (err: any) {
    throw new AxiosError(err);
  }
};
