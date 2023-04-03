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
            time="."
            data={item}
            testDetails={` You Have Been Invite For this job "${item.interview.job_title}"`}
            testDate="20 March 2023, 14:15 - 15:30 "
          />
        ))}
      </TestManagementSubCon>
    </TestManagementContainer>
  );
};

export default InterviewManagement;
