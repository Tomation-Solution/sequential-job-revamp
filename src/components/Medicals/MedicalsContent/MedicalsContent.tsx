import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { JobSeerkerInterviewType } from "../../../redux/api/jobSeekerInterview.api";
import { TestManagementContentContainer } from "../../TestManagement/TestManagementContent/TestManagementContent.styles";
import { MedicalsBtnContainer, MedicalsRedBtn } from "./MedicalsContent.styles";
import moment from 'moment'
import { getMedicalsInterviewsApiResponse } from "../../../redux/api/medicals.api";
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
        {testDate ? <MedicalsRedBtn>{testDate?moment(time).fromNow():''}</MedicalsRedBtn> : null}
        <button onClick={e=>{
          navigate(`/register-interview/${data.id}/${data.interview.interview_id}/`)
        }}>View Interview</button>
      </MedicalsBtnContainer>
      <p><strong>Job title</strong>:{' '}{data.interview.job_title}</p>
      <p><strong>Company</strong>:{' '}{data.interview.company}</p>
      <h5>{testDate?moment(testDate).format('LLLL'):testDate}</h5>
    </TestManagementContentContainer>
  );
};

export default MedicalsContent;

type Props2 = {
  time?: string;
  testDetails: string;
  testDate: string;
  data:getMedicalsInterviewsApiResponse
};

export const MedicalsContent2: FC<Props2> = ({ testDate, testDetails, time ,data}) => {
  const  navigate = useNavigate();

  return (
    <TestManagementContentContainer>
      <MedicalsBtnContainer>
        {testDate ? <MedicalsRedBtn>{testDate?moment(time).fromNow():''}</MedicalsRedBtn> : null}
        <button onClick={e=>{
          navigate(`/medicals-invite/${data.id}/`)
        }}>View Medicals</button>
      </MedicalsBtnContainer>
      <p><strong>Job title</strong>:{' '}{data.job_medicals.job_title}</p>
      <p><strong>Company</strong>:{' '}{data.job_medicals.company}</p>
      <h5>{testDate?moment(testDate).format('LLLL'):testDate}</h5>
    </TestManagementContentContainer>
  );
};

