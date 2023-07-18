import React from "react";
import { useNavigate } from "react-router-dom";
import { TestPreviewType } from "../../../redux/api/jobs.api";
import Button from "../../Button/Button";
import { TestManagementContentContainer } from "./TestManagementContent.styles";

const TestManagementContent = (data: TestPreviewType): React.ReactElement => {
  const navigate = useNavigate();
  return (
    <TestManagementContentContainer>
      <Button
        onClick={(e) => {
          navigate(`/test-management/taking_test/${data.id}`);
        }}
      >
        Take Test
      </Button>
      <p>{data.job_title}</p>
      <h5>{data?.test_info?.org_name}</h5>
    </TestManagementContentContainer>
  );
};

export default TestManagementContent;
