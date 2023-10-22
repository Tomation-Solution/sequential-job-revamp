import { AxiosError } from "axios";
import api from "../axios";
import { JobSeerkerInterviewType } from "../jobSeekerInterview.api";

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

export type sendJobOfferLetterApiProp = {
  "list_of_applicant_and_action":{
    "applicant_id":string,
    "action":string,
    "letter":string
}[ ]
}

export const sendJobOfferLetterApi = async(data:sendJobOfferLetterApiProp)=>{
  const res = await api.post(`/jobs/company-generate-job-final-result/send_final_letters/`,data);
  return res.data;   
}


type  getJobOffersAndAcceptedOffersApiResponse =  {
  "id": number,
  "jobseekers": {
      "email": string,
      "full_name": string,
      "role_applied_for": string,
      "date_applied": string,
      'id':string
  },
  "cv_id": number,
  "filter_quetions_score": number,
  "test_quetions_score":number,
  "has_written_exam": boolean,
  "has_written_test": boolean,
  "has_mail_sent":boolean,
  "generated_panelist_total_score": number,
  "has_been_invited_for_medicals": boolean,
  "acceptance_letter": string,
  "final_selection_state": string,
  "has_sent_selection_mail":boolean,
  "accept_application":boolean,
  "created_at": string,
  "updated_at":string,
  "job": number
}

type getJobOffersAndAcceptedOffersApiProp ={
  get_offers_sent:boolean,
  get_accepted_offers:boolean,
  job_id:string|number
}
export const getJobOffersAndAcceptedOffersApi = async({get_offers_sent,get_accepted_offers,job_id}:getJobOffersAndAcceptedOffersApiProp):Promise<getJobOffersAndAcceptedOffersApiResponse[]>=>{
  const res = await api.get(`/jobs/company-generate-job-final-result/${get_offers_sent?'?offers_sent=1':''}${get_accepted_offers?'?jobseeker_acccept_offer=1':''}&job_id=${job_id}`,);
  return res.data.data;   
}



type get_applicantFinal_resultResponseType = {
  "id": number,
  "jobseekers": {
      "email":string,
      "full_name": string
  },
  "filter_quetions_score": number,
  "test_quetions_score": number,
  "has_written_exam":boolean,
  "has_written_test": boolean,
  "has_mail_sent": boolean,
  "generated_panelist_total_score": number,
  "job": number,
  "interview_breakdown": {
    "score": number,
    "value": string,
    "cut_off": number
}[],
"generated_panelist_total_score_current": number,
}

export const  get_applicantFinal_result = async (job_seeker_id:number):Promise<get_applicantFinal_resultResponseType>=>{
  const resp = await api.get('/jobs/company-generate-job-final-result/get_jobseeker_finial_result?job_seeker_id='+job_seeker_id)
  return resp.data.data
}

export const get_scheduled_interviews_invite = async():Promise<JobSeerkerInterviewType[]>=>{
  const resp = await api.get('/interview/interview_setup/get_scheduled_interviews_invite/')
  return resp.data.data
}