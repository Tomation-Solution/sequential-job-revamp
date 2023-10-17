import { AxiosError } from "axios";
import api from "../axios";
import { rating_job_seekersProp } from "../../../components/Panelist-Invites/PanelistRateCandidate";

export const getAllPanelistJobs = async () => {
  try {
    const res = await api.get(`/interview/panelist_view_jobs/`);
    return res.data;
  } catch (err: any) {
    throw new AxiosError(err);
  }
};



export const rating_job_seekers = async (data:rating_job_seekersProp)=>{
  const resp = await api.post(`/interview/panelist_view_jobs/rating_job_seekers/`,data);
  return resp.data.data
}


type get_rating_sheetProp ={
  "job_id":number,
  "job_applicant":number
}

export type  getRatingSheetResponse =  {
  "interview": number,
  "job_seeker": number,
  "panelist": number,
  "rating_sheet": {
      "name": string,
      "value": string,
      "cut_off": number,
      'score'?:number
  }[],
  "interviewer_remark":string,
  "summary_of_qualification": string,
  "id": number;
}


export const get_rating_sheet =  async (data:get_rating_sheetProp):Promise<getRatingSheetResponse>=>{


  const resp = await api.post(`/interview/panelist_view_jobs/get_rating_sheet/`,data);
  return resp.data.data
}