import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { get_interviews } from "../../redux/api/jobSeekerInterview.api";
import { getUser } from "../../utils/extraFunction";
import MedicalsContent from "../Medicals/MedicalsContent/MedicalsContent";
import Preloader from "../Preloader/Preloader";
import {
  TestManagementContainer,
  TestManagementSubCon,
} from "../TestManagement/TestManagement.style";
import dayjs from "dayjs";

const InterviewManagement = () => {
  
  const user = getUser()
  const {isLoading,data} = useQuery('get_interviews_for_jobseekers',get_interviews,{
      enabled:user?.user_type==='job_seakers'?true:false
  })
  const  navigate = useNavigate();
  return (
    <TestManagementContainer>
      <h1>Interview Schedule</h1>
    <Preloader loading={isLoading}/>
      <TestManagementSubCon>
        {data?.map((item,index) => (
          <MedicalsContent
            key={index}
            time={`${item.date_picked} ${item.time_picked}`}
            data={item}
            testDetails={` You Have Beenx Invite For this job "${item.interview.job_title}"`}
            testDate={item.date_picked}
          />
        ))}
      </TestManagementSubCon>
    </TestManagementContainer>
  );
};

export default InterviewManagement;
