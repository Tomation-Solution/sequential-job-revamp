import React from "react";
import { useQuery } from "react-query";
import { listOfTestApi } from "../../redux/api/jobs.api";
import Preloader from "../Preloader/Preloader";
import {
  TestManagementContainer,
  TestManagementSubCon,
} from "./TestManagement.style";
import TestManagementContent from "./TestManagementContent/TestManagementContent";

const TestManagement = () => {
  // listOfTestApi
  const  {data,isLoading} = useQuery('list_of_undonetest',listOfTestApi,{'refetchOnWindowFocus':false})
  console.log({data})
  return (
    <TestManagementContainer>
      <h1>Test Schedules</h1>
      <Preloader loading={isLoading} />
      <TestManagementSubCon>
        {data?.map((item,index) => (
          <TestManagementContent
            key={index}
            {...item}
          />
        ))}
      </TestManagementSubCon>
    </TestManagementContainer>
  );
};

export default TestManagement;
