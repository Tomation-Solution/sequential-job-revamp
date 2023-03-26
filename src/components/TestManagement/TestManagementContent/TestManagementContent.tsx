import React, { FC } from "react";
import { TestManagementContentContainer } from "./TestManagementContent.styles";

type Props = {
  testDetails: string;
  testDate: string;
};

const TestManagementContent: FC<Props> = ({ testDetails, testDate }) => {
  return (
    <TestManagementContentContainer>
      <button>Take Test</button>
      <p>{testDetails}</p>
      <h5>{testDate}</h5>
    </TestManagementContentContainer>
  );
};

export default TestManagementContent;
