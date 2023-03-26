import React from "react";
import { TestSubmittedContainer } from "./TestSubmitted.styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const TestSubmitted = () => {
  return (
    <TestSubmittedContainer>
      <CheckCircleIcon />
      <h1>Test Submitted</h1>
      <p>
        You will be reached out to as soon as soon as your test has been
        reviewed.
      </p>
      <button>Go Home</button>
    </TestSubmittedContainer>
  );
};

export default TestSubmitted;
