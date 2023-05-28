import api from "./axios"
import { JobType } from "./jobs.api"


export type getMedicalsInterviewsApiResponse = {
    "job_seeker": number,
    "job_medicals": {
        "job_title": string,
        "job_medicals_id": number,
        "company":string
    },
    "id": number,
    "date_picked": null | string,
    "time_picked": null | string
}

export const getMedicalsInterviewsApi = async({filter_by_scheduled}:{filter_by_scheduled?:'unscheduled'|'scheduled'}):Promise<getMedicalsInterviewsApiResponse[]>=>{

    const resp = await api.get(`/medicals/job_seeker_manage_medic/get_medicals_invitation/?filter_by_scheduled=${filter_by_scheduled}`)
    return resp.data.data
}



export type getMedicalsInterviewDetailsApiResponse ={
    "job_seeker": number,
    "job_medicals": {
        "job": JobType,
        "medicals_id": number,
        "dates_related_data": {
            "dates": {"available_dates":string,is_selected?:string}[],
            "times": {"available_time": string,is_selected?:string}[]
        },
        "interview_link": string,
        "is_time_for_interview": boolean,
        "has_picked_invitation": boolean
    },
    "date_picked": null|string,
    "time_picked": null|string
}
export const getMedicalsInterviewDetailsApi = async(id:string|number):Promise<getMedicalsInterviewDetailsApiResponse>=>{
    const resp = await api.get(`medicals/job_seeker_manage_medic/${id}/`)
    return resp.data.data
}
// 

type PropPickInterviewDate  ={
    "available_time":string,
    "available_dates":string,
    "medicals_id":number
}
export const pick_medic_date = async (data:PropPickInterviewDate)=>{
    const resp = await api.post(`medicals/job_seeker_manage_medic/pick_date/`,data)
    return resp.data.data
}