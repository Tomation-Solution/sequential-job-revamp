import api from "./axios"
import { JobType } from "./jobs.api"


export type JobSeerkerInterviewType =  {
    "job_seeker": number,
    "interview": {
        "job_title":string,
        "interview_id": number
    },
    "id": number
}


export const get_interviews=async():Promise<JobSeerkerInterviewType[]>=>{
    const resp = await api.get('interview/job_seeker_manage_invites/')
    return resp.data.data
}

export type JobSeekerInterviewType ={
    "job_seeker": number,
    "interview": {
        "job":JobType,
        "interview_id": number,
        "dates_related_data": {
            "dates": {"available_dates": string,"is_selected"?: boolean}[ ],
            "times":  {
                "available_time":string,
                "is_selected"?: boolean
            }[]
        }
    },
    "date_picked": string,
    "time_picked": string
}
export const get_interviewDetail = async(job_id:number):Promise<JobSeekerInterviewType>=>{

    const resp = await api.get('/interview/job_seeker_manage_invites/'+job_id+'/');
    return resp.data.data
}

type PropPickInterviewDate  ={
    "available_time":string,
    "available_dates":string,
    "interview_id":number
}

export const  pick_interview_date = async (data:PropPickInterviewDate)=>{
    const resp = await api.post('/interview/job_seeker_manage_invites/pick_date/',data);
    return resp.data.data
} 