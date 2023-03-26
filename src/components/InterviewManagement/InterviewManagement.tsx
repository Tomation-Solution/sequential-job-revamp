import React from "react";
import MedicalsContent from "../Medicals/MedicalsContent/MedicalsContent";
import {
  TestManagementContainer,
  TestManagementSubCon,
} from "../TestManagement/TestManagement.style";

const InterviewManagement = () => {
  return (
    <TestManagementContainer>
      <h1>Interview Schedule</h1>

      <TestManagementSubCon>
        {[1, 2, 3, 4, 5].map((item) => (
          <MedicalsContent
            key={item}
            time="IN 20 MINUTES"
            testDetails="Interview with Elijah Papi for the position of Software Engineer"
            testDate="20 March 2023, 14:15 - 15:30 "
          />
        ))}
      </TestManagementSubCon>
    </TestManagementContainer>
  );
};

export default InterviewManagement;
