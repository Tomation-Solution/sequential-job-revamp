import React, { useState } from "react";
import {
  TestManagementContainer,
  TestManagementSubCon,
} from "../TestManagement/TestManagement.style";
import MedicalsContent, { MedicalsContent2 } from "./MedicalsContent/MedicalsContent";
import { useMutation, useQuery } from "react-query";
import { getMedicalsInterviewsApi, pick_medic_date } from "../../redux/api/medicals.api";
import Preloader from "../Preloader/Preloader";
import SelectWithLabel from "../SelectWithLabel/SelectWithLabel";
import useToast from "../../hooks/useToastify";

const Medicals = () => {
  const [filter,setFilter] = useState<'unscheduled'|'scheduled'>('unscheduled')
  const {notify} = useToast()
  const {isLoading,data,refetch} = useQuery(['getMedicalsInterviewsApi',filter],()=>getMedicalsInterviewsApi({'filter_by_scheduled':filter}),{
    'refetchOnWindowFocus':false
  })

   return (
    <TestManagementContainer>
      <h1>Medicals Schedule</h1>
      <Preloader loading={isLoading}/>
      <div style={{'width':'30%'}}>
      <SelectWithLabel
      label=" "
      name="interview filter"
      onChange={(value:any)=>{
        console.log(value)
        setFilter(value)
      }}
      options={[
        {'label':'unscheduled interviews','value':'unscheduled'},
        {'label':'scheduled interviews','value':'scheduled'},
      ]}
      />
      </div>
      <TestManagementSubCon>
        {/* {[1, 2, 3, 4, 5].map((item) => (
          <MedicalsContent
            key={item}
            time="IN 20 MINUTES"
            testDetails="Interview with Elijah Papi for the position of Software Engineer"
            testDate="20 March 2023, 14:15 - 15:30 "
          />
        ))} */}
        {data?.map((item,index) => (
          <MedicalsContent2
            key={index}
            time={`${item.date_picked} ${item.time_picked}`}
            data={item}
            testDetails={` You Have Beenx Invite For this job "${item.job_medicals.job_title}"`}
            testDate={item.date_picked?item.date_picked:''}
          />
        ))}
      </TestManagementSubCon>
    </TestManagementContainer>
  );
};

export default Medicals;
