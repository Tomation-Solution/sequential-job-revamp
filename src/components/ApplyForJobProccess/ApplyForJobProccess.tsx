import { ApplyForJobProccessContainer } from "./ApplyForJobProccess.style"
import {AiOutlineRight} from 'react-icons/ai'
import { useMutation } from "react-query"
import { applyForJobsApi } from "../../redux/api/jobs.api"
import Preloader from "../Preloader/Preloader"
import useToast from "../../hooks/useToastify"

import { useNavigate } from "react-router-dom"


const ApplyForJobProccess =({job_id}:{job_id:string}):React.ReactElement=>{
    const {notify} = useToast()
    const navigate = useNavigate()
    // applyForJobsApi
    const {mutate, isLoading} = useMutation(()=>applyForJobsApi(job_id),{
        'onSuccess':(data)=>{
            console.log({'application message':data})
            notify('Application Successfull','success')
            navigate(`/job-quetion-info/${job_id}/`)
        },
        'onError':(err:any)=>{
            console.log({err})
            notify('you have applied already','error')

        }
    })
    return (
        <ApplyForJobProccessContainer>
                <Preloader loading={ isLoading}/>
                <h2>Apply Now</h2>
                <br />
                <br />
           <div className="proccess_btn_container">
            <div className="proccess_btn" onClick={e=>{
                    mutate()
            }}>
                <p>Apply using current CV </p>

                <AiOutlineRight/>
                </div>
           </div>
            <br />
            <br />

            <div className="proccess_btn_container"
            onClick={e=>{
                e.preventDefault()
            navigate(`/cvmanagement/?job=${job_id}`)
            }}
            >
                <div className="proccess_btn">
                <p>Update current CV </p>

                <AiOutlineRight/>
                </div>
            </div>
        </ApplyForJobProccessContainer>
    )
}

export default ApplyForJobProccess