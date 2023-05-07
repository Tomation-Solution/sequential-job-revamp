import {AiOutlineHeart} from 'react-icons/ai'
import {ImDownload2} from 'react-icons/im'
import Button from '../Button/Button'
import { JobDetailComponentContainer ,JobTitleContainer, MoreDetailInfo} from './JobDetailComponent.style'
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { applyForJobsApi, getCvFilterQuetions, getJobDetailApi } from '../../redux/api/jobs.api';
import Preloader from '../Preloader/Preloader';
import useToast from '../../hooks/useToastify';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const JobDetailComponent =():React.ReactElement=>{
    const {id} = useParams()
    const {notify} = useToast()
    const navigate = useNavigate()


    const {data:job,isLoading} = useQuery(['job_detail',id],()=>getJobDetailApi(typeof id==='string'?id:''),{
        enabled:id?true:false,
        'refetchOnWindowFocus':false
    })

    const {mutate:apply, isLoading:applying} = useMutation(()=>applyForJobsApi(typeof id==='string'?id:''),{
        'onSuccess':(data)=>{
            console.log({'application message':data})
            notify('Application Successfull','success')
            navigate(`/job-quetion-info/${id}/`)
        },
        'onError':(err:any)=>{
            console.log({err})
            notify('you have applied already','error')

        }
    })
    const handleApplication = ()=>apply()
    return (
        <JobDetailComponentContainer >
            {/* <Preloader/> */}
            <Preloader loading={isLoading}/>
            <p style={{'fontWeight':'lighter',}}><small>{job?.org_name}</small></p>
<br />

            <JobTitleContainer >
                <h2 style={{'color':'black'}} >{job?.job_title}</h2>
                
                <div>
                    <AiOutlineHeart/>
                    <ImDownload2/>
                </div>
            </JobTitleContainer>
            <p><small>{job?.location}</small></p>

            <h3 style={{'color':'#24CDE2','padding':'1rem 0',fontWeight: 400}}>Job details</h3>
            <MoreDetailInfo>

                <div className="job_details" style={{'color':'black'}}>
                    <p>Salary</p>
                    
                    <p>{': '}{job?.salary}</p>
                </div>
                <br />
                <div className="job_details" style={{'color':'black'}}>
                    <p>JobType</p>
                    <p>{': '} {job?.job_type}</p>
                </div>

            </MoreDetailInfo>
            <br />
               
            

            <h2 style={{'color':'#24CDE2','padding':'1rem 0',fontWeight: 400}}>Job Description</h2>
            <br /><br />
            <div style={{'textAlign':'center','overflow':'scroll','padding':'0 1rem','color':'black'}}>
            {/* <Editor
          text={job?.description_content.replaceAll('"',' ')}
          options={{
            'disableEditing':true
          }}
        />  */}
        <ReactMarkdown remarkPlugins={[[remarkGfm, {singleTilde: false}]]}>
   {job?.description_content?.replaceAll('"',' ')+''}
  </ReactMarkdown>
            </div>
            <br /><br />
          
                <div>
                    <Button 
                    onClick={handleApplication}
                    style={{'margin':'0 auto','width':'200px'}}
                    
                    >Apply</Button>
                </div>
            <br /><br />
              



            <br /><br />
            <br /><br />
        </JobDetailComponentContainer>
    )
}

export default JobDetailComponent