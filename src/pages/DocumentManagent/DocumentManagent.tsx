import { useMutation, useQuery } from "react-query";
import Tables from "../../components/Tables/Tables"
import { acceptJobApplication, getApplicationListApi, getApplicationListApiResponse } from "../../redux/api/documentManagement.api";
import Preloader from "../../components/Preloader/Preloader";
import Button from "../../components/Button/Button";
import useToast from "../../hooks/useToastify";
import OffCanvas from "../../components/OffCanvas/OffCanvas";
import { useState } from "react";
import { JobsRejectSlides } from "../../components/JobsSlides/JobsSlides";
// getpplicationListApiResponse



const DocumentManagent = ():React.ReactElement=>{
    // getApplicationListApi
    const {notify} = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const {isLoading,data} = useQuery('docs_application_list',getApplicationListApi,)
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
          Header: "Date of Application",
          accessor: "date_of_application",
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
            <Button onClick={e=>{
                if(window.confirm('Are You sure you want to accept')){
                    mutate({'job_applicant_id':parseInt(tableProps.row.original.id)})
                }
            }}  disabled={tableProps.row.original.final_selection_state=='selected'?false:true} style={{'opacity':`${tableProps.row.original.final_selection_state==='selected'?'1':'.2'}`}}>
                Accept
            </Button>
                </>
          )
        },
        {
            Header:"Submit Required Docs",
            accessor:'accept_application',
            id:4,
            Cell:(tableProps:any)=>(
                <div>
                    <Button 
                    disabled={tableProps.row.original.accept_application?false:true}
                    style={{'opacity':`${tableProps.row.original.accept_application?'1':'.3'}`}}
                    onClick={e=>{
                        console.log('hello world')
                        setIsOpen(true)
                    }}>
                        upload required docs
                    </Button>
                </div>
            )
        },
      ];
    return (
        <div >
            <Preloader loading={isLoading} />

            {
                data?
                <Tables
                tableColumn={columns}
                tableData={data}
                customHooks={[]}
              />:''
            }
            <OffCanvas
                size={50}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
            >
                <JobsRejectSlides/>
            </OffCanvas>
        </div>
    )
}

export default DocumentManagent