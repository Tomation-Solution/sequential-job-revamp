import api from "../axios"



export type etCandidateJobDocsSubmmitssion ={
    "id": number,
    "name_of_file": string,
    "file":string,
    "job_applicant": number
}

export const getCandidateJobDocsSubmmitssion = async (applicant_id:any):Promise<etCandidateJobDocsSubmmitssion[]>=>{
    const form = new FormData()
    form.append('applicant_id',applicant_id)

    const resp = await api.post('/jobs/company-job-handler/get_candidate_docs/',form)

    return resp.data.data
}