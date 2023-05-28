import React, { useState } from "react";
import {
  MedicalInviteContainer,
  MedicalsBtn,
  MedicalsHeader,
  MedicalsSlider,
  MedicalsSliderItem,
} from "./MedicalsInvitation.styles";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import { useParams } from "react-router-dom";
import { getMedicalsInterviewDetailsApi, pick_medic_date } from "../../../redux/api/medicals.api";
import { useMutation, useQuery } from "react-query";
import useToast from "../../../hooks/useToastify";
import InterviewDateSelect from "../../InterviewDateSelect/InterviewDateSelect";
import Button from "../../Button/Button";
import Preloader from "../../Preloader/Preloader";

const MedicalsInvitation = () => {
    const {id} = useParams();
    const {notify} =useToast()

    const { isLoading, data,refetch} = useQuery('getMedicalsInterviewDetailsApi',()=>getMedicalsInterviewDetailsApi(typeof id==='string'?parseInt(id):-1),{
        enabled:typeof id==='string'?true:false
    })
        const [selectedDate,setSelectedDate] = useState('');
    const [selectedTime,setSelectedTime] = useState('');

    const {mutate:pick_date,isLoading:submitting} = useMutation(pick_medic_date,{
      onSuccess:()=>{
          notify('Successfuly Scheduled','success')
  
          if(typeof id == 'string'){
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

        const handleSubmit = ()=>{
        if(selectedDate.length===0 || selectedTime.length === 0){
            notify('Please Complete the Pick','error')
            return 
        }
        if(typeof id === 'string'){
      
        if(data?.job_medicals.medicals_id){
          pick_date({
            'available_dates':selectedDate,
            'available_time':selectedTime,
            'medicals_id':data?.job_medicals.medicals_id
        })
        }
        }
    }
  return (
    <MedicalInviteContainer>
            <Preloader loading={submitting} />

      <MedicalsHeader>
        <QuestionAnswerRoundedIcon />
        <h1>Medicals Inivitation</h1>
      </MedicalsHeader>

      <h5>Instructions</h5>
      <ul>
        <li>Invitation for medical check up</li>
        <li>Invitation for medical check up</li>
        <li>Invitation for medical check up</li>
        <li>Invitation for medical check up</li>
        <li>Invitation for medical check up</li>
      </ul>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
        reiciendis, laudantium est error debitis modi perferendis doloribus
        labore beatae facilis id quod maiores saepe voluptates dolor temporibus
        libero eveniet voluptate.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
        reiciendis, laudantium est error debitis modi perferendis doloribus
        labore beatae facilis id quod maiores saepe voluptates dolor temporibus
        libero eveniet voluptate.
      </p>

      <h1>Slide to pick from available dates</h1>

      {/* <MedicalsSlider>
        {[...Array(30)].map((item, index) => (
          <MedicalsSliderItem key={index}>
            <p>Monday , 14th August, 2022</p>
          </MedicalsSliderItem>
        ))}
      </MedicalsSlider>

      <h1>Slide to pick from available Time</h1>
      <MedicalsSlider>
        {[...Array(30)].map((item, index) => (
          <MedicalsSliderItem key={index}>
            <p>1:00pm</p>
          </MedicalsSliderItem>
        ))}
      </MedicalsSlider> */}
{/* 
      <MedicalsBtn>Schedule</MedicalsBtn> */}



{
                !data?.job_medicals.has_picked_invitation?
            <div>
                <br />
            <br />
            <label htmlFor="">View Available date  for candidates to pick from:</label>
            <br />
            <br />
            <div style={{'display':'flex','flexWrap':'wrap','gap':'10px 6px'}}>
                {
                    data?.job_medicals.dates_related_data.dates.map((date,index)=>(

                            <div key={index}
                                onClick={(e)=>{
                                    if(selectedDate===date.available_dates || date?.is_selected){
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
                    data?.job_medicals.dates_related_data.times.map((time,index)=>(
                    <div
                    key={index}
                    onClick={(e)=>{
                        if(selectedTime===time.available_time || time?.is_selected){
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
                    <strong>{data?.job_medicals.interview_link.includes('https')?'Interview Link ':'Interview Address'}</strong>:
            {
                data?.job_medicals.interview_link.includes('https')?
                <Button style={{'margin':'10px auto'}} onClick={e=>{
                    window.location.href=data?.job_medicals.interview_link
                }}>Attend Interview</Button>:
                <small>
                  {' '}  {data?.job_medicals.interview_link}
                </small>
            }
                </p>
            </div>
            }
    </MedicalInviteContainer>
  );
};

export default MedicalsInvitation;
