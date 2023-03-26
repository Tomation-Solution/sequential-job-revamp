import React, { FC } from "react";
import { TestManagementContentContainer } from "../../TestManagement/TestManagementContent/TestManagementContent.styles";
import { MedicalsBtnContainer, MedicalsRedBtn } from "./MedicalsContent.styles";

type Props = {
  time?: string;
  testDetails: string;
  testDate: string;
};

const MedicalsContent: FC<Props> = ({ testDate, testDetails, time }) => {
  return (
    <TestManagementContentContainer>
      <MedicalsBtnContainer>
        {time ? <MedicalsRedBtn>{time}</MedicalsRedBtn> : null}
        <button>Take Test</button>
      </MedicalsBtnContainer>
      <p>{testDetails}</p>
      <h5>{testDate}</h5>
    </TestManagementContentContainer>
  );
};

export default MedicalsContent;
