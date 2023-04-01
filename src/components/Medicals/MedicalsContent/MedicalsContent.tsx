import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { JobSeerkerInterviewType } from "../../../redux/api/jobSeekerInterview.api";
import { TestManagementContentContainer } from "../../TestManagement/TestManagementContent/TestManagementContent.styles";
import { MedicalsBtnContainer, MedicalsRedBtn } from "./MedicalsContent.styles";

type Props = {
  time?: string;
  testDetails: string;
  testDate: string;
  data:JobSeerkerInterviewType
};

const MedicalsContent: FC<Props> = ({ testDate, testDetails, time ,data}) => {
  const  navigate = useNavigate();

  return (
    <TestManagementContentContainer>
      <MedicalsBtnContainer>
        {time ? <MedicalsRedBtn>{time}</MedicalsRedBtn> : null}
        <button onClick={e=>{
          navigate(`/register-interview/${data.id}/${data.interview.interview_id}/`)
        }}>View Interview</button>
      </MedicalsBtnContainer>
      <p><strong>Job title</strong>:{' '}{data.interview.job_title}</p>
      <p><strong>Company</strong>:{' '}{data.interview.company}</p>
      {/* <h5>{testDate}</h5> */}
    </TestManagementContentContainer>
  );
};

export default MedicalsContent;
