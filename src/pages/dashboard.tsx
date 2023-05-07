import { useMutation, useQuery } from "react-query"
import Tables from "../components/Tables/Tables"
import TopSummaryBox from "../components/TopSummaryBox/TopSummaryBox"
import { selectApplicantDashboard } from "../redux/applicantDashboardSlice"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { getInterviewAttendedApi, get_jobs_applied_for, jobsTestScheduledApi, jobsTestTakenApi } from "../redux/api/jobSeekerInterview.api"
import Preloader from "../components/Preloader/Preloader"
import InterviewManagement from "../components/InterviewManagement/InterviewManagement"
import { getApplicationListApi } from "../redux/api/documentManagement.api"
import Button from "../components/Button/Button"
import { useEffect, useState } from "react"
import { getApplicationListApiResponse } from "../redux/api/documentManagement.api"
import { acceptJobApplication } from "../redux/api/documentManagement.api"
import useToast from "../hooks/useToastify"


const JobAppliedTable = ()=>{
    const {isLoading,data} = useQuery('get_jobs_applied_for',get_jobs_applied_for)

    const columns = [
        {
          Header: "Position",
          accessor: "job",
            id:1,
            Cell: (tableProps:any)  => (
            <>{tableProps.row.original.job.position}</>
            )
        },
        {
            Header: "Company",
            accessor: "job",
              id:2,
              Cell: (tableProps:any)  => (
              <>{tableProps.row.original.job.company_name}</>
              )
          },
          {
            Header: "Date of Upload",
            accessor: "job",
              id:3,
              Cell: (tableProps:any)  => (
              <>True</>
              )
          },
          {
            Header: "Date of Upload",
            accessor: "job",
              id:10,
              Cell: (tableProps:any)  => (
              <>...</>
              )
          },
          {
            Header: "Candidates Applied",
            accessor: "candidates_applied",
              id:4,
            //   Cell: (tableProps:any)  => (
            //   <>True</>
            //   )
          },
          {
            Header: "Status",
            accessor: "final_selection_state",
              id:5,
              Cell: (tableProps:any)  => (
                <>{tableProps.row.original.final_selection_state}</>
              )
          },
          {
            Header: "Details",
            accessor: "job",
              id:7,
              Cell: (tableProps:any)  => (
                <><p
                style={{'color':'#FFB0B0','cursor':'pointer'}}
                onClick={e=>{
                    // {tableProps.row.original.id}
                }}
                >details</p></>
              )
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

const InterViewAttended = ()=>{
    const {isLoading,data} = useQuery('get_interview_attended',getInterviewAttendedApi)

    const columns = [
        {
          Header: "Position",
          accessor: "job",
            id:1,
            Cell: (tableProps:any)  => (
            <>{tableProps.row.original.job.position}</>
            )
        },
        {
            Header: "Company",
            accessor: "job",
              id:2,
              Cell: (tableProps:any)  => (
              <>{tableProps.row.original.job.company_name}</>
              )
          },
          {
            Header: "Date of Upload",
            accessor: "job",
              id:3,
              Cell: (tableProps:any)  => (
              <>True</>
              )
          },
          {
            Header: "Date of Upload",
            accessor: "job",
              id:10,
              Cell: (tableProps:any)  => (
              <>...</>
              )
          },
          {
            Header: "Candidates Applied",
            accessor: "candidates_applied",
              id:4,
            //   Cell: (tableProps:any)  => (
            //   <>True</>
            //   )
          },
          {
            Header: "Status",
            accessor: "final_selection_state",
              id:5,
              Cell: (tableProps:any)  => (
                <>{tableProps.row.original.final_selection_state}</>
              )
          },
          {
            Header: "Details",
            accessor: "job",
              id:7,
              Cell: (tableProps:any)  => (
                <><p
                style={{'color':'#FFB0B0','cursor':'pointer'}}
                onClick={e=>{
                    // {tableProps.row.original.id}
                }}
                >details</p></>
              )
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
const JobsTestScheduled = ()=>{
    const {isLoading,data} = useQuery('job_test_scheduled',jobsTestScheduledApi)

    const columns = [
        {
          Header: "Position",
          accessor: "job",
            id:1,
            Cell: (tableProps:any)  => (
            <>{tableProps.row.original.job.position}</>
            )
        },
        {
            Header: "Company",
            accessor: "job",
              id:2,
              Cell: (tableProps:any)  => (
              <>{tableProps.row.original.job.company_name}</>
              )
          },
          {
            Header: "Date of Upload",
            accessor: "job",
              id:3,
              Cell: (tableProps:any)  => (
              <>True</>
              )
          },
          {
            Header: "Date of Upload",
            accessor: "job",
              id:10,
              Cell: (tableProps:any)  => (
              <>...</>
              )
          },
          {
            Header: "Candidates Applied",
            accessor: "candidates_applied",
              id:4,
            //   Cell: (tableProps:any)  => (
            //   <>True</>
            //   )
          },
          {
            Header: "Status",
            accessor: "final_selection_state",
              id:5,
              Cell: (tableProps:any)  => (
                <>{tableProps.row.original.final_selection_state}</>
              )
          },
          {
            Header: "Details",
            accessor: "job",
              id:7,
              Cell: (tableProps:any)  => (
                <><p
                style={{'color':'#FFB0B0','cursor':'pointer'}}
                onClick={e=>{
                    // {tableProps.row.original.id}
                }}
                >details</p></>
              )
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


const JobTestTakenTable = ()=>{
    const {isLoading,data} = useQuery('jobs_test_taken',jobsTestTakenApi)

    const columns = [
        {
          Header: "Position",
          accessor: "job",
            id:1,
            Cell: (tableProps:any)  => (
            <>{tableProps.row.original.job.position}</>
            )
        },
        {
            Header: "Company",
            accessor: "job",
              id:2,
              Cell: (tableProps:any)  => (
              <>{tableProps.row.original.job.company_name}</>
              )
          },
          {
            Header: "Date of Upload",
            accessor: "job",
              id:3,
              Cell: (tableProps:any)  => (
              <>True</>
              )
          },
          {
            Header: "Date of Upload",
            accessor: "job",
              id:10,
              Cell: (tableProps:any)  => (
              <>...</>
              )
          },
          {
            Header: "Candidates Applied",
            accessor: "candidates_applied",
              id:4,
            //   Cell: (tableProps:any)  => (
            //   <>True</>
            //   )
          },
          {
            Header: "Status",
            accessor: "final_selection_state",
              id:5,
              Cell: (tableProps:any)  => (
                <>{tableProps.row.original.final_selection_state}</>
              )
          },
          {
            Header: "Details",
            accessor: "job",
              id:7,
              Cell: (tableProps:any)  => (
                <><p
                style={{'color':'#FFB0B0','cursor':'pointer'}}
                onClick={e=>{
                    // {tableProps.row.original.id}
                }}
                >details</p></>
              )
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

const InterviewScheduleTab = ()=>{


    return (
        <div>
            <br /><br />
          <InterviewManagement />
        </div>
    )
}

const JobOffers = ()=>{
    const [status,setStatus] = useState<undefined|getApplicationListApiResponse['final_selection_state']>(undefined)
    const {notify} = useToast()
    const {isLoading,data,refetch} = useQuery('docs_application_list',()=>getApplicationListApi(status?{status}:{}),)
    const {mutate,isLoading:accepting_jobs} =useMutation(acceptJobApplication,{
        'onSuccess':()=>{
            notify('Accepted we would get back to you please upload "Required Docs" ','success')
        }
    })
 
    const columns = [
        {
          Header: "Company name",
          accessor: "company",
          id:1,
         Cell: (tableProps:any)  => (
            <>{tableProps.row.original.company.name}</>
      )
        },
       
        {
          Header: "Role Applied for",
          accessor: "role_applied_for",
          Cell: (tableProps:any)  => (
            <>{tableProps.row.original.company.job_title}</>
        ),
      id:2
        },
        {
            Header:"Decision",
            accessor:'final_selection_state',
            Cell: (tableProps:any)  =>{
                const choice = tableProps.row.original.final_selection_state
                const colorScheme:any= {
                    'selected':{'color':'white','backcolor':'green'},
                    'in_view':{'color':'white','backcolor':'gray'},
                    'idle':{'color':'white','backcolor':'#79790d'},
                    'not_selected':{'color':'white','backcolor':'red'},
                }
                return(
                    <div style={{'display':'inline-block','color':`${colorScheme[choice].color}`,'borderRadius':'10px','padding':'.7rem',
                'backgroundColor':`${colorScheme[choice].backcolor}`}}>
                    {tableProps.row.original.final_selection_state.replace('_',' ')}
                </div>
                )
            }
        },
        {
            Header:"Accept Offer",
            accessor:'accept_application',
            Cell: (tableProps:any)  => (
                <>
                
                
                <Preloader loading={isLoading || accepting_jobs} />
            <Button 
            onClick={e=>{
                if(window.confirm('Are You sure you want to accept')){
                    mutate({'job_applicant_id':parseInt(tableProps.row.original.id)})
                }
            }}  disabled={tableProps.row.original.final_selection_state=='selected'?false:true} style={{'margin':'0 auto','opacity':`${tableProps.row.original.final_selection_state==='selected'?'1':'.2'}`}}>
                Accept
            </Button>
                </>
          )
        },
      
      ];
      useEffect(()=>{
        if(status){
            refetch()
        }
      },[status])
    return (
        <div>
            {
                data?
                <Tables
                tableColumn={columns}
                tableData={data}
                customHooks={[]}
              />:''
            }
        </div>
    )
}
const Dashboard =()=>{
    const { dashboardJobSummaryStatus } = useAppSelector(selectApplicantDashboard)
    const dispatch = useAppDispatch()

    return (
        <div>
            
            <TopSummaryBox />
            
        {
            dashboardJobSummaryStatus==='job_applied'?
            <JobAppliedTable/>:''
        }
        {
            dashboardJobSummaryStatus==='interviews_attended'?
            <InterViewAttended/>:''
        }
        {
            dashboardJobSummaryStatus === 'job_test_scheduled' ?
            <JobsTestScheduled/>:''
        }
        {
            dashboardJobSummaryStatus ==='job_test_taken'?
            <JobTestTakenTable/>:''
        }
        {
            dashboardJobSummaryStatus ==='interview_scheduled'?
            <InterviewScheduleTab />:''
        }
        {
            dashboardJobSummaryStatus==='job_offers'?
            <JobOffers />:''
        }
        </div>
    )

    
}

export default Dashboard