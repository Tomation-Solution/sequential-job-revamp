import Preloader from "../../../components/Preloader/Preloader";
import Button from "../../../components/Button/Button";
import useToast from "../../../hooks/useToastify";
import OffCanvas from "../../../components/OffCanvas/OffCanvas";
import { useMutation, useQuery } from "react-query";
import Tables from "../../../components/Tables/Tables";
import { ItemCountCon, TopSummaryContainer, TopSummaryItems } from "../../../components/TopSummaryBox/TopSummaryBox.styles";
import { Pane } from "../../../globals/styles/forms.styles";
import JobDropDownSelect from "../../../components/JobDropDownSelect";
import { useRef, useState } from "react";
import TableDataColored from "../../../globals/styles/TableDataColored";
import { getCandidateThatAcceptedInterview, getCandidateThatAcceptedInterviewResponse } from "../../../redux/api/company/interview-management.api";
import moment from "moment";
import TextEditor from "../../../globals/TextEditor/TextEditor";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { getJobOffersAndAcceptedOffersApi, sendJobOfferLetterApi, sendJobOfferLetterApiProp } from "../../../redux/api/company/companyjobs.api";
import { getCandidateJobDocsSubmmitssion } from "../../../redux/api/company/companydocument.api";



const CompanyDocumentManagement =()=>{
    const [dropdownOption, setDropdownOption] = useState<string>('');
    const [steps,setSteps] = useState(0)
  const [isOpen, setIsOpen] = useState(false);
  const [applicants_id,setApplicant_id] = useState<number[]>([])
  const [selectedJobSeeker,setSelectedJobSeeker] = useState<getCandidateThatAcceptedInterviewResponse>()
const [showApplicantDocs,setShowApplicantDocs] = useState()
const [openDocs,setOpenDocs] = useState(false)

    const all_qualified_candidates_columns = [
        {
          Header: "Candidate Name",
          accessor: "name",
          id:1,
          Cell: (tableProps: any) => {
            return (
                <TableDataColored>
                  {tableProps.row.original.job_seeker.full_name}
                </TableDataColored>
              )
          },
        },
        {
          Header: "Date of Application",
          accessor: "date",
          id:2,
          Cell: (tableProps: any) => (
            <TableDataColored>
                {tableProps.row.original.date_picked}
              {/* { `${moment(new Date(tableProps.row.original.created_at)).format("MMMM Do YYYY, ")} `} */}
            </TableDataColored>
          ),
        },
        {
          Header: "Role Applied for",
          accessor: "role",
          id:7,
          Cell: (tableProps: any) => (
            <TableDataColored>
              {tableProps.row.original.job.position}
            </TableDataColored>
          ),
        },
        {
          Header: "CV",
          accessor: "cv",
          id: 3,
          Cell: (tableProps: any) => (
            <TableDataColored
              color="blue"
              where={`/company/cv-details/${tableProps.row.original.job_seeker.id}/${tableProps.row.original?.job?.position}`}
            >
              View
            </TableDataColored>
          ),
        },
        {
          Header: "Interview Result",
          accessor: "time",
          id: 4,
          Cell: (tableProps: any) => (
            <TableDataColored color="green">
                unavailable
             {tableProps.row.original.generated_panelist_total_score_current}
            </TableDataColored>
          ),
        },
        {
          Header: "Decision",
          accessor: "link",
          id: 5,
          Cell: (tableProps: any) => (
            <div style={{'display':'flex','alignItems':'center','justifyContent':'space-between','flexWrap':'wrap'}}>
              <Button  style={{'width':'40%','padding':'.5rem'}}
              onClick={()=>{
                setSelectedJobSeeker((value)=>tableProps.row.original)
                setApplicant_id([tableProps.row.original.job_applicant_id as number])
                setIsOpen(true)
              }}
              >Selected</Button>
              <Button styleType='danger' style={{'width':'40%','padding':'.5rem'}}>Not Selected</Button>

            </div>
          ),
        },
      ];

      const offers_sent_columns = [
        {
          Header: "Candidate Name",
          accessor: "name",
          id:1,
          Cell: (tableProps: any) => (
            <TableDataColored>
              {tableProps.row.original.jobseekers.full_name}
            </TableDataColored>
          ),
        },
        {
          Header: "Date of Application",
          accessor: "date",
          id:2,
          Cell: (tableProps: any) => (
            <TableDataColored>
              { `${moment(new Date(tableProps.row.original.created_at)).format("MMMM Do YYYY, ")} `}
            </TableDataColored>
          ),
        },
        {
          Header: "Role Applied for",
          accessor: "role",
          id:7,
          Cell: (tableProps: any) => (
            <TableDataColored>
              {tableProps.row.original.job.role_applied_for}
            </TableDataColored>
          ),
        },
        {
          Header: "CV",
          accessor: "cv",
          id: 3,
          Cell: (tableProps: any) => (
            <TableDataColored
              color="blue"
              where={`/company/cv-details/${tableProps.row.original.jobseekers.id}/${tableProps.row.original?.jobseekers?.role_applied_for}`}
            >
              View
            </TableDataColored>
          ),
        },
        {
          Header: "Interview Result",
          accessor: "time",
          id: 4,
          Cell: (tableProps: any) => (
            <TableDataColored color="green">
                unavailable
             {/* {tableProps.row.original.time_picked} */}
            </TableDataColored>
          ),
        },
        {
          Header: "Decision",
          accessor: "link",
          id: 5,
          Cell: (tableProps: any) => (
                <div>
                    Sent
                    </div>
            ),
        },
      ];

      const accepted_offers_columns = [
        {
          Header: "Candidate Name",
          accessor: "name",
          id:1,
          Cell: (tableProps: any) => (
            <TableDataColored>
              {tableProps.row.original.jobseekers.full_name}
            </TableDataColored>
          ),
        },
        {
          Header: "Date of Application",
          accessor: "date",
          id:2,
          Cell: (tableProps: any) => (
            <TableDataColored>
              { `${moment(new Date(tableProps.row.original.created_at)).format("MMMM Do YYYY, ")} `}
            </TableDataColored>
          ),
        },
        {
          Header: "Role Applied for",
          accessor: "role",
          id:7,
          Cell: (tableProps: any) => (
            <TableDataColored>
              {tableProps.row.original.job.role_applied_for}
            </TableDataColored>
          ),
        },
        {
          Header: "CV",
          accessor: "cv",
          id: 3,
          Cell: (tableProps: any) => (
            <TableDataColored
              color="blue"
              where={`/company/cv-details/${tableProps.row.original.jobseekers.id}/${tableProps.row.original?.jobseekers?.role_applied_for}`}
            >
              View
            </TableDataColored>
          ),
        },
        {
          Header: "Interview Result",
          accessor: "time",
          id: 4,
          Cell: (tableProps: any) => (
            <TableDataColored color="green">
                unavailable
             {/* {tableProps.row.original.time_picked} */}
            </TableDataColored>
          ),
        },
        {
            Header: "Details",
            accessor: "link",
            id: 5,
            Cell: (tableProps: any) => (
              <div style={{'display':'flex','alignItems':'center','justifyContent':'space-between','flexWrap':'wrap'}}>
                <Button  style={{'width':'40%','padding':'.5rem'}}
                onClick={()=>{
                    setSelectedJobSeeker(tableProps.row.original)
                    setShowApplicantDocs(
                        tableProps.row.original.id
                    )
                    setOpenDocs(true)
                }}
                >View { tableProps.row.original.job_applicant_id}</Button>
              </div>
            ),
          },
      ];


      const {data,isLoading} = useQuery('getCandidateThatAcceptedInterview',()=>getCandidateThatAcceptedInterview(dropdownOption as string),{
        'enabled': dropdownOption.length !==0?true:false
      })

      const {isLoading:gettingOfferssent,data:offers_sent} = useQuery('getJobOffersAndAcceptedOffersApi-get_offers_sent',()=>getJobOffersAndAcceptedOffersApi({
        'get_accepted_offers':false,
        'get_offers_sent':true,
        'job_id':dropdownOption
      }),
      {
        'enabled': dropdownOption.length !==0?true:false
      })
      const {isLoading:gettingAcceptedoffers,data:accepted_offers} = useQuery('getJobOffersAndAcceptedOffersApi-get_accepted_offers',()=>getJobOffersAndAcceptedOffersApi({
        'get_accepted_offers':true,
        'get_offers_sent':false,
        'job_id':dropdownOption
      }),
      {
        'enabled': dropdownOption.length !==0?true:false
      })
      console.log({
        selectedJobSeeker
      })
      return (
        <div>
      <Preloader loading={isLoading || gettingOfferssent||gettingAcceptedoffers} />
    <TopSummaryContainer>
      <TopSummaryItems
          newColor={'#8CFF90'}
          style={
            steps === 0
              ? { backgroundColor: "#24CDE2" }
              : {}
          }
          onClick={e=>{
            setSteps(0)
          }}
        >
          <ItemCountCon>
            <h1>150</h1>

          </ItemCountCon>
          <p>All qualified Candidates</p>
        </TopSummaryItems>

        <TopSummaryItems
          newColor={'#8CFF90'}
          style={
            steps === 1
              ? { backgroundColor: "#24CDE2" }
              : {}
          }
          onClick={e=>{
            setSteps(1)
          }}
        >
          <ItemCountCon>
            <h1>150</h1>

          </ItemCountCon>
          <p>Offers Sent</p>
        </TopSummaryItems>

        <TopSummaryItems
          newColor={'#8CFF90'}
          style={
            steps === 2
              ? { backgroundColor: "#24CDE2" }
              : {}
          }
          onClick={e=>{
            setSteps(2)
          }}
        >
          <ItemCountCon>
            <h1>150</h1>

          </ItemCountCon>
          <p>Accepted Offer</p>
        </TopSummaryItems>

    </TopSummaryContainer>
<br />
<br />
    <Pane>
        <br />
        <div style={{'padding':'1rem'}}>
            <JobDropDownSelect
            onChange={setDropdownOption}
            defaultValue={dropdownOption}
            disabledValue=""
            disabledOption="Select a Job"
            />
        </div>
        <br />
        {
            steps ===0?
            <Tables tableColumn={all_qualified_candidates_columns} tableData={data?data:[]} customHooks={[]} />
            :''
        }

        {
            steps ===1?
            <Tables tableColumn={offers_sent_columns} tableData={offers_sent?offers_sent:[]} customHooks={[]} />
            :''
        }

        {
            steps ===2?
            <Tables tableColumn={accepted_offers_columns} tableData={accepted_offers?accepted_offers:[]} customHooks={[]} />
        :''
        }
{/*  */}



    </Pane>

<OffCanvas
size={50} setIsOpen={setIsOpen} isOpen={isOpen}
>

<DraftAcceptanceForm
applicants_id={applicants_id}
name={selectedJobSeeker?.job_seeker?.full_name}
position={selectedJobSeeker?.job.position??''}

/>
    
</OffCanvas>

<OffCanvas
size={50} 
setIsOpen={setOpenDocs} isOpen={openDocs}
>
 {
    showApplicantDocs?
<ApplicantDocs 
// @ts-ignore
applicants_id={showApplicantDocs}
// @ts-ignore
name={selectedJobSeeker?.jobseekers?.full_name}
// @ts-ignore
position={selectedJobSeeker?.job.role_applied_for??''}
/>

:'s'
 }
 
</OffCanvas>
        </div>
    )
}


export default CompanyDocumentManagement



const DraftAcceptanceForm = ({applicants_id,name,position}:{
    applicants_id:number[],name?:string,position:string
})=>{
    const editorRef = useRef<any>();
    const {notify} = useToast()
    const {isLoading,mutate} = useMutation(sendJobOfferLetterApi,{
        'onSuccess':(d)=>{
            notify('Sent Successfully','success')
        }
    })
      const onSubmit = ()=>{
        const letterContent = editorRef.current.getContent();
        const submitdata:sendJobOfferLetterApiProp['list_of_applicant_and_action'] = applicants_id.map((d,index)=>({
            "applicant_id":`${d}`,
            "action":"selected",
            "letter":letterContent
        }))

        mutate({'list_of_applicant_and_action':submitdata})
      }
    return (
        <form>
            <Preloader loading={isLoading} />
            <h1 style={{'fontSize':'3.5rem','fontFamily':'Ubuntu','fontWeight':'normal','textAlign':'center'}}>
                {name?name:'All'}</h1>
                <br />
            <h3
            style={{
                'fontSize':'2rem','fontFamily':'Ubuntu','fontWeight':'normal','textAlign':'center'
            }}
            >{position}</h3>
<br /><br />
            
            <p>Draft Offfer Letter</p>
            <TextEditor
            editorRef={editorRef}
            initialValue={'<h1>hello </h1>'}
            />
    <br />
            <Button 
            style={{'width':'40%','margin':'0 auto'}}
            onClick={e=>{
                e.preventDefault()
                onSubmit()
            }}>Submit</Button>
            {/* <FormError>{errors.description_content?.message}</FormError> */}
        </form>
    )
} 


const ApplicantDocs = (
    {applicants_id,name,position}:{
        applicants_id:number,name?:string,position:string
    }

)=>{

    const {isLoading,data} = useQuery('getCandidateJobDocsSubmmitssion',()=>getCandidateJobDocsSubmmitssion(applicants_id))

    console.log(data)

    return (
        <div>


<Preloader loading={isLoading} />
            <h1 style={{'fontSize':'3.5rem','fontFamily':'Ubuntu','fontWeight':'normal','textAlign':'center'}}>
                {name?name:'All'}
                
                </h1>
                <br />
            <h3
            style={{
                'fontSize':'2rem','fontFamily':'Ubuntu','fontWeight':'normal','textAlign':'center'
            }}
            >
                {position}
            </h3>
            <h3
            style={{
                'fontSize':'2rem','fontFamily':'Ubuntu','fontWeight':'normal','textAlign':'center'
            }}
            >
                Accepted
            </h3>
<br /><br />
{
    data?.map((d,index)=>(
        <div key={index} style={{'width':'360px','padding':'.5rem,','margin':'20px auto','textAlign':'center'}}>
        <p style={{   'fontSize':'1.3rem',}}>{d.name_of_file}</p>
        <Button style={{'width':'100%'}}
        onClick={e=>{
            window.open(d.file,'_blank')
        }}
        >Download Document</Button>
    </div>
    ))
}

        </div>
    )
}