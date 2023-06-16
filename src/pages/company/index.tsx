import { useQuery } from "react-query"
import { CompanyTopSummaryBox } from "../../components/TopSummaryBox/TopSummaryBox"
import { getCompanyActiveJobApi, getCompanyClosedJobApi, getCompanyTotalApplicantApi, getCompanyTotalApplicantHiredApi, getCompanyTotalJobApi } from "../../redux/api/company/companyjobs.api"
import Tables from "../../components/Tables/Tables"
import Preloader from "../../components/Preloader/Preloader"
import { useAppSelector } from "../../redux/hooks"
import { selectCompanyDashboard } from "../../redux/company/companyDashboardSlice"





const CompanyIndexPage =()=>{
    const {dashboardJobSummaryStatus} = useAppSelector(selectCompanyDashboard)


    return (
        <div>
            <CompanyTopSummaryBox />
            <br />
            {/* <h1>Company Index Page</h1> */}

            {
                dashboardJobSummaryStatus==='total_application'?
                <TotalApplicant />:''
            }
            {
                dashboardJobSummaryStatus==='applicants_hired'?
                <TotalApplicantHired />:''

            }
            {
                dashboardJobSummaryStatus==='total_number_of_job_post'?
                <TotalJob/>:
                ''
            }
            {
                dashboardJobSummaryStatus === 'active_jobs'?
                <ActiveJobs />:''
            }
                        {
                dashboardJobSummaryStatus === 'closed_jobs'?
                <ClosedJobs />:''
            }
        </div>
    )
}

export default CompanyIndexPage


const TotalApplicant = ()=>{
    const {isLoading,data} = useQuery('getCompanyTotalApplicantApi',getCompanyTotalApplicantApi)

    const columns = [
        {
          Header: "jobseekers",
          accessor: "job",
            id:1,
            Cell: (tableProps:any)  => (
            <>{tableProps.row.original.jobseekers.full_name}</>
            )
        },
        {
            Header: "Role Applied For",
            accessor: "jobseekers",
              id:2,
              Cell: (tableProps:any)  => (
              <>{tableProps.row.original.jobseekers.role_applied_for}</>
              )
          },
         
          {
            Header: "Status",
            accessor: "final_selection_state",
              id:3,
              Cell: (tableProps:any)  => (
              <>{'Suitable'}</>
              )
          },
          {
            Header: "Selection Report",
            accessor: "final_selection_state",
              id:4,
            //   Cell: (tableProps:any)  => (
            //   <>{tableProps.row.original.jobseekers.role_applied_for}</>
            //   )
          },
         
    ]
    return (
        <div>
             <Preloader loading={isLoading} />
            <Tables
             tableColumn={columns}
             tableData={data?data:[]}
             customHooks={[]}
            />
        </div>
    )
}


const TotalApplicantHired =()=>{
    const {isLoading,data} = useQuery('getCompanyTotalApplicantHiredApi',getCompanyTotalApplicantHiredApi)

    const columns = [
        {
          Header: "jobseekers",
          accessor: "job",
            id:1,
            Cell: (tableProps:any)  => (
            <>{tableProps.row.original.jobseekers.full_name}</>
            )
        },
        {
            Header: "Role Applied For",
            accessor: "jobseekers",
              id:2,
              Cell: (tableProps:any)  => (
              <>{tableProps.row.original.jobseekers.role_applied_for}</>
              )
          },
         
          {
            Header: "Status",
            accessor: "final_selection_state",
              id:3,
              Cell: (tableProps:any)  => (
              <>{'Suitable'}</>
              )
          },
          {
            Header: "Selection Report",
            accessor: "final_selection_state",
              id:4,
            //   Cell: (tableProps:any)  => (
            //   <>{tableProps.row.original.jobseekers.role_applied_for}</>
            //   )
          },
         
    ]
    return (
        <div>
             <Preloader loading={isLoading} />
            <Tables
             tableColumn={columns}
             tableData={data?data:[]}
             customHooks={[]}
            />
        </div>
    )
}


const TotalJob = ()=>{
    // 

    const {isLoading,data} = useQuery('getCompanyTotalJobApi',getCompanyTotalJobApi)

    
    const columns = [
        {
          Header: "Title",
          accessor: "job_title",
        },
        {
            Header: "Location",
            accessor: "location",
          },
          {
            Header: "Job Type",
            accessor: "job_type",
          },
          {
            Header: "job Required Document",
            accessor: "job_required_document",
          },
          {
            Header: "Salary",
            accessor: "salary",
          },
          
    ]
    return (
        <div>
             <Preloader loading={isLoading} />
            <Tables
             tableColumn={columns}
             tableData={data?data:[]}
             customHooks={[]}
            />
        </div>
    )
}



const ActiveJobs  = ()=>{
    // getCompanyActiveJobApi

    const {isLoading,data} = useQuery('getCompanyActiveJobApi',getCompanyActiveJobApi)

    
    const columns = [
        {
          Header: "Title",
          accessor: "job_title",
        },
        {
            Header: "Location",
            accessor: "location",
          },
          {
            Header: "Job Type",
            accessor: "job_type",
          },
          {
            Header: "job Required Document",
            accessor: "job_required_document",
          },
          {
            Header: "Salary",
            accessor: "salary",
          },
          
    ]
    return (
        <div>
             <Preloader loading={isLoading} />
            <Tables
             tableColumn={columns}
             tableData={data?data:[]}
             customHooks={[]}
            />
        </div>
    )
}

const ClosedJobs  = ()=>{
    // getCompanyActiveJobApi

    const {isLoading,data} = useQuery('getCompanyClosedJobApi',getCompanyClosedJobApi)

    
    const columns = [
        {
          Header: "Title",
          accessor: "job_title",
        },
        {
            Header: "Location",
            accessor: "location",
          },
          {
            Header: "Job Type",
            accessor: "job_type",
          },
          {
            Header: "job Required Document",
            accessor: "job_required_document",
          },
          {
            Header: "Salary",
            accessor: "salary",
          },
          
    ]
    return (
        <div>
             <Preloader loading={isLoading} />
            <Tables
             tableColumn={columns}
             tableData={data?data:[]}
             customHooks={[]}
            />
        </div>
    )
}