import { getUser } from "../../utils/extraFunction"
import api from "./axios"


export type getApplicationListApiResponse = {
    "id": number,
    "generated_panelist_total_score": number,
    "company": {
        "id": number,
        "name": string,
        "job_title": string
    },
    "docs_needed": string[],
    "jobseekers": {
        "name": string
    },
    "accept_application": boolean,
    "final_selection_state": "selected" |'in_view' | 'not_selected' | 'idle'
}
export const getApplicationListApi= async ():Promise<getApplicationListApiResponse[]>=>{
    const resp = await api.get('/jobs/jobseeker-application-process/');
    return resp.data.data
}

export const acceptJobApplication= async (data:{job_applicant_id:number})=>{
    const resp = await api.post('/jobs/jobseeker-application-process/accept_offer/',data)

    return resp.data
}