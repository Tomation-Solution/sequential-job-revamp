import api from "../axios"

type getCompanyDashboardSummaryResponse = {
    "total_applicant": number,
    "applicant_hired": number,
    "total_number_of_job_post": number,
    "closed_jobs": number,
    "total_number_of_cv": number,
    "active_jobs": number
}
export const getCompanyDashboardSummaryApi = async( ):Promise<getCompanyDashboardSummaryResponse>=>{
    const resp = await api.get('/jobs/company-job-handler/company_dashboard_summary/')
    return resp.data.data
}


export const getCompanyTotalApplicantApi = async( ):Promise<any>=>{
    const resp = await api.get('/jobs/company-job-handler/total_applicant/')
    return resp.data.data
}





export const getCompanyTotalApplicantHiredApi = async( ):Promise<any>=>{
    const resp = await api.get('/jobs/company-job-handler/applicant_hired/')
    return resp.data.data
}


export const getCompanyTotalJobApi = async( ):Promise<any>=>{
    const resp = await api.get('/jobs/company-job-handler/total_job_post/')
    return resp.data.data
}


export const getCompanyClosedJobApi = async( ):Promise<any>=>{
    const resp = await api.get('/jobs/company-job-handler/total_job_post/')
    return resp.data.data
}

export const getCompanyActiveJobApi = async( ):Promise<any>=>{
    const resp = await api.get('/jobs/company-job-handler/?is_active=true')
    return resp.data.data
}