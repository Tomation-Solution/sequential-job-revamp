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


type applyForJobsResponse = {
    "status": number,
    "message": string,
    "data": any
}

export const applyForJobsApi =async (job_id:string):Promise<applyForJobsResponse> => {
    
    const resp = await api.post('/jobs/job-seeker-view/',{job_id})
    return resp.data
}









export type getCvFilterQuetionsResponse = {
    "title": string,
    "fill_in_the_gap":{
        "id": number,
        "quetion":string
    } [],
    "filter_quetion_option": {
        "id": number,
        "quetion": string,
        "option_to_choose_from":string[]
    }[],
    "filter_quetion_multi_choice_quetion": {
        "id": number,
        "quetion": string,
        "option_to_choose_from": string[]
    }[],
}



export const getCvFilterQuetions = async (job_id:string):Promise<getCvFilterQuetionsResponse>=>{

    const resp =  await api.post(`/jobs/job-seeker-view/get_quetion/`,{job_id})
    return resp.data.data
}


export const getJobDetailApi = async (job_id:string):Promise<JobType>=>{

    const  resp = await api.get(`/jobs/job-seeker-view/${job_id}/`)
    return resp.data.data
}

type Prop ={
    data:getCvFilterQuetionsResponse,
    job_id:number
    
}

type submitCvFilterQuetionsResponseType ={
    'fillInTheGap_result':number,
    'quetionOption_result':number,
    'filterQuetionMultiChoiceQuetion':number,
    'job_variant':'filter_only'|'filter_and_test'
}
export const submitCvFilterQuetions = async ({data,job_id}:Prop):Promise<submitCvFilterQuetionsResponseType>=>{
    const senddata :any = {
        'job_id':job_id,
        'filter_quetion_option':data.filter_quetion_option,
        'fill_in_the_gap':data.fill_in_the_gap,
        'filter_quetion_multi_choice_quetion':data.filter_quetion_multi_choice_quetion
    }
    const resp =  await api.post(`/jobs/job-seeker-view/submit_quetion/`,senddata)
    return resp.data.data[0]
}


export type TestPreviewType = {
    "id": number,
    "job_title": string,
    "test_info": {
        "title": string,
        "org_name": string,
        "short_org_name": string
    }|null
}
export const listOfTestApi = async ():Promise<TestPreviewType[]>=>{
    
    const resp =  await api.get(`/jobs/job-seeker-view/get_list_of_test/`,)
    return resp.data 
}








export const getJobTest =  async (job_id:string):Promise<getCvFilterQuetionsResponse>=>{

    const resp =  await api.post(`/jobs/job-seeker-view/get_test/`,{job_id})
    return resp.data.data
}


export const submitJobTestQuetion = async ({data,job_id}:Prop):Promise<submitCvFilterQuetionsResponseType>=>{
    const senddata :any = {
        'job_id':job_id,
        'filter_quetion_option':data.filter_quetion_option,
        'fill_in_the_gap':data.fill_in_the_gap,
        'filter_quetion_multi_choice_quetion':data.filter_quetion_multi_choice_quetion
    }
    const resp =  await api.post(`/jobs/job-seeker-view/submit_test/`,senddata)
    return resp.data.data[0]
}