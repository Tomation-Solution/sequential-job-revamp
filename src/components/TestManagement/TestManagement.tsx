import React from "react";
import {
  TestManagementContainer,
  TestManagementSubCon,
} from "./TestManagement.style";
import TestManagementContent from "./TestManagementContent/TestManagementContent";

const TestManagement = () => {
  return (
    <TestManagementContainer>
      <h1>Test Schedules</h1>

      <TestManagementSubCon>
        {[1, 2, 3, 4, 5].map((item) => (
          <TestManagementContent
            key={item}
            testDetails="Interview with Elijah Papi for the position of Software Engineer"
            testDate="20 March 2023, 14:15 - 15:30 "
          />
        ))}
      </TestManagementSubCon>
    </TestManagementContainer>
  );
};

export default TestManagement;
