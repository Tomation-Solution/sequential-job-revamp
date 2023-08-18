import { AxiosError } from "axios";
import api from "../axios";

type getCompanyDashboardSummaryResponse = {
  total_applicant: number;
  applicant_hired: number;
  total_number_of_job_post: number;
  closed_jobs: number;
  total_number_of_cv: number;
  active_jobs: number;
};
export const getCompanyDashboardSummaryApi =
  async (): Promise<getCompanyDashboardSummaryResponse> => {
    const resp = await api.get(
      "/jobs/company-job-handler/company_dashboard_summary/"
    );
    return resp.data.data;
  };

export const getCompanyTotalApplicantApi = async (
  filterJobId: any
): Promise<any> => {
  if (!filterJobId) {
    return [];
  }
  const resp = await api.get(
    `/jobs/company-job-handler/total_applicant/?filter_job_id=${filterJobId}`
  );
  return resp.data.data;
};

export const getCompanyTotalApplicantHiredApi = async (
  filterJobId?: any
): Promise<any> => {
  const resp = await api.get(
    `/jobs/company-job-handler/applicant_hired/?filter_job_id=${filterJobId}`
  );
  return resp.data.data;
};

export const getCompanyTotalJobApi = async (): Promise<any> => {
  const resp = await api.get("/jobs/company-job-handler/total_job_post/");
  return resp.data.data;
};

export const getCompanyClosedJobApi = async (): Promise<any> => {
  const resp = await api.get("/jobs/company-job-handler/?is_active=false");
  return resp.data.data;
};

export const getCompanyActiveJobApi = async (): Promise<any> => {
  const resp = await api.get("/jobs/company-job-handler/?is_active=true");
  return resp.data.data;
};

export const getCVDetailsApi = async (jobId: any) => {
  try {
    const res = await api.get(`/jobs/company-job-handler/cv-details/${jobId}`);
    return res;
  } catch (error: any) {
    throw new AxiosError(error);
  }
};

export const getAllCvsForACompany = async () => {
  try {
    const res = await api.get(`/jobs/company-job-handler/cv-details/all`);
    return res.data;
  } catch (error: any) {
    throw new AxiosError(error);
  }
};

export const switchJobOn = async (payload: any) => {
  /**
   * payload must be Form Data
   * switch contains the booleans (True, False)
   * job_id contains job id
   */
  try {
    const res = await api.post(
      `/jobs/company-job-handler/switch_job_on/`,
      payload
    );
    return res.data;
  } catch (error: any) {
    throw new AxiosError(error);
  }
};
