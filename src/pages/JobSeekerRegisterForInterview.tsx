import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Button from "../components/Button/Button";
import InterviewDateSelect from "../components/InterviewDateSelect/InterviewDateSelect";
import useToast from "../hooks/useToastify";
import { get_interviewDetail, pick_interview_date } from "../redux/api/jobSeekerInterview.api";
import Preloader from "../components/Preloader/Preloader";




const JobSeekerRegisterForInterview =():React.ReactElement=>{
    const {notify} =useToast()
    const {interview_id, interview_invite_id} = useParams();
    const { isLoading, data,refetch} = useQuery('get_interviewDetail',()=>get_interviewDetail(typeof interview_invite_id==='string'?parseInt(interview_invite_id):-1),{
        enabled:typeof interview_invite_id==='string'?true:false
    })

    const {mutate:pick_date,isLoading:submitting} = useMutation(pick_interview_date,{
        onSuccess:()=>{
            notify('Successfuly Scheduled','success')

            if(typeof interview_invite_id == 'string'){
                // we  it success fetch the data again
                refetch()
            }
        },
        onError:(err:any)=>{
            console.log({err})
            const error= err.response.data.error.error
            notify(error,'error')
        },
      
    })
    const [selectedDate,setSelectedDate] = useState('');
    const [selectedTime,setSelectedTime] = useState('');

    const handleSubmit = ()=>{
        if(selectedDate.length==0 || selectedTime.length == 0){
            notify('Please Complete the Pick','error')
            return 
        }
        if(typeof interview_id === 'string'){
            pick_date({
                'available_dates':selectedDate,
                'available_time':selectedTime,
                'interview_id':parseInt(interview_id)
            })
        }
    }

    // 'interview_link':string,
    // 'is_time_for_interview':string,
    console.log({'details info':data})
    return (
        <div>
            <Preloader loading={submitting} />
            {
                !data?.interview.has_picked_invitation?
            <div>
                <br />
            <br />
            <label htmlFor="">View Available date  for candidates to pick from:</label>
            <br />
            <br />
            <div style={{'display':'flex','flexWrap':'wrap','gap':'10px 6px'}}>
                {
                    data?.interview.dates_related_data.dates.map((date,index)=>(

                            <div key={index}
                                onClick={(e)=>{
                                    if(selectedDate===date.available_dates || date.is_selected===true){
                                        notify('Not Available','error')
                                        return 
                                    }
                                    notify('Picked!','success')
                                    setSelectedDate(date.available_dates)

                                }}
                            >
                                <InterviewDateSelect 
                                is_selected={date?.is_selected?true:false}
                                choosed={selectedDate===date.available_dates}
                                > 
                                {date.available_dates}
                            </InterviewDateSelect>
                            </div> 
                    ))
                }
            </div>

            <br />
            <p>Time Selected</p>
            <br />
            <div style={{'display':'flex','flexWrap':'wrap','gap':'10px 6px'}}>

                {
                    data?.interview.dates_related_data.times.map((time,index)=>(
                    <div
                    key={index}
                    onClick={(e)=>{
                        if(selectedTime===time.available_time || time.is_selected===true){
                            notify('Not Available','error')
                            return 
                        }
                        notify('Picked!','success')
                        setSelectedTime(time.available_time)
                    }}
                    >
                            <InterviewDateSelect
                            is_selected={time?.is_selected?true:false}
                            choosed={selectedTime===time.available_time}
                            
                            >
                            {time.available_time}
                            </InterviewDateSelect>
                    </div>
                    ))
                }
                </div>
                <br />
                <br />

                <Button onClick={handleSubmit} style={{'margin':'0 auto'}}>Submit</Button>
                <br />
                <br />            <br />
                <br />            <br />
                <br />            <br />
                <br />
            </div>:
            <div style={{'textAlign':'center'}}>
                <br /><br />
                <h2>Below is details of your interview</h2>
                <br />

                <p>
                    <strong>{data?.interview.interview_link.includes('https')?'Interview Link ':'Interview Address'}</strong>:
            {
                data?.interview.interview_link.includes('https')?
                <Button style={{'margin':'10px auto'}} onClick={e=>{
                    window.location.href=data?.interview.interview_link
                }}>Attend Interview</Button>:
                <small>
                  {' '}  {data?.interview.interview_link}
                </small>
            }
                </p>
            </div>
            }

        </div>
    )
}

export default JobSeekerRegisterForInterview