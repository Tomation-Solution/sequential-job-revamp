import React, { useState } from "react";
import {
  ItemCountCon,
  TopSummaryContainer,
  TopSummaryItems,
} from "./TopSummaryBox.styles";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ApplicantDashboardSliceStateType, changeApplicationDashboardState, selectApplicantDashboard } from "../../redux/applicantDashboardSlice";
import { useQuery } from "react-query";
import { jobDasboardSummaryApi } from "../../redux/api/jobSeekerInterview.api";
import Preloader from "../Preloader/Preloader";


const TopSummaryBox = () => {
  const { dashboardJobSummaryStatus } = useAppSelector(selectApplicantDashboard)
  const [data,setData] = useState([
    { color: "red", name: "Jobs Applied ",status:'job_applied',count:0},
    { color: "green", name: "Interviews Attended" ,status:'interviews_attended' ,count:0},
    { color: "gray", name: "Jobs Test Taken",status:'job_test_taken',count:0 },
    { color: "purple", name: "Jobs Test Scheduled",status:'job_test_scheduled', count:0},
    { color: "pink", name: "Interview Scheduled",status:'interview_scheduled' ,count:0},
    { color: "brown", name: "Job Offers" ,status:'job_offers',count:0},
  ])
  const dispatch = useAppDispatch()
  const { isLoading,} = useQuery('job-summary',jobDasboardSummaryApi,{
    'onSuccess':(data)=>{
      setData( [
        { color: "red", name: "Jobs Applied ",status:'job_applied',count:data.jobs_applied_for},
        { color: "green", name: "Interviews Attended" ,status:'interviews_attended' ,count:data.interviews_attended},
        { color: "gray", name: "Jobs Test Taken",status:'job_test_taken',count:data.jobs_test_taken },
        { color: "purple", name: "Jobs Test Scheduled",status:'job_test_scheduled', count:data.jobs_test_scheduled},
        { color: "pink", name: "Interview Scheduled",status:'interview_scheduled' ,count:data.interview_scheduled},
        { color: "brown", name: "Job Offers" ,status:'job_offers',count:data.job_offers},
      ])
      
    }
  })
  
  return (
    <TopSummaryContainer>
      <Preloader loading={isLoading} />
      {data.map((item, index) => (
        <TopSummaryItems 
        newColor={item.color}
        onClick={e=>{
          dispatch(changeApplicationDashboardState(item.status as ApplicantDashboardSliceStateType['dashboardJobSummaryStatus']))
        }}
        style={dashboardJobSummaryStatus===item.status?{'backgroundColor':'#24CDE2'}:{}}
         key={index}>
          <ItemCountCon>
            <h1>{item.count}</h1>

            <div>
              <section></section>
              {/* +3 */}
            </div>
          </ItemCountCon>
          <p>{item.name}</p>
        </TopSummaryItems>
      ))}
    </TopSummaryContainer>
  );
};

export default TopSummaryBox;
