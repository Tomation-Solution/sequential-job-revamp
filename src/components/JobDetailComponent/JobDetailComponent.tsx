import {AiOutlineHeart} from 'react-icons/ai'
import {ImDownload2} from 'react-icons/im'
import Button from '../Button/Button'
import { JobDetailComponentContainer ,JobTitleContainer, MoreDetailInfo} from './JobDetailComponent.style'
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { applyForJobsApi, getCvFilterQuetions, getJobDetailApi } from '../../redux/api/jobs.api';
import Preloader from '../Preloader/Preloader';
import useToast from '../../hooks/useToastify';

// @ts-ignore
// const TurndownService = require('turndown')
/* @ts-ignore */
// import Editor from 'react-medium-editor';

const JobDetailComponent =():React.ReactElement=>{
    const {id} = useParams()
    const {notify} = useToast()
    const navigate = useNavigate()
    // const turndownService = new TurndownService()

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
    const markdown = `
    | S/N | Pet | Image |
    |--|--|--|
    | 1 | Cat |![A cat looking at you](https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=465&quality=45&auto=format&fit=max&dpr=2&s=68615bab04be2077a471009ffc236509) |
    | 2 | Dog |![A dog looking at you](https://ichef.bbci.co.uk/news/976/cpsprodpb/17638/production/_124800859_gettyimages-817514614.jpg)|
    `

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
            <div style={{
                // 'textAlign':'justify',
                'overflow':'scroll','padding':'0 1rem','color':'black',
            }}>
           
        {
            job?
            <p  className='job-details' dangerouslySetInnerHTML={{__html: `${job?.description_content?.replaceAll('"',' ')  }`.replaceAll('\\',' ')}}/>:''
        }
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