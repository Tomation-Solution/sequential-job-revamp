import { getUser } from "../../utils/extraFunction"
import api from "./axios"

export type JobType = {
    id:number;
    "job_title": string,
    "is_active": boolean,
    "location": string,
    'country':string,
    'org_name':string,
    "job_type": string,
    "salary": string,
    "currency": string,
    "job_required_document": string,
    "description": null,
    "job_filter": null|number,
    "description_content":string,
    interview?:number|null;
    job_test:null|number;
    job_variant:'filter_only'|'filter_and_test',
    'job_categories':string;
}

export const get_jobs_api =async ({is_active=true}:{is_active?:boolean}):Promise<JobType[]>=> {
    // console.log
    let user = getUser()
    let url =`/jobs/company-job-handler/?is_active=${is_active}`
        if(user?.user_type==='job_seakers'){
            url = '/jobs/job-seeker-view/'
        }

    const resp = await api.get(url);
    return  resp.data.data
}
