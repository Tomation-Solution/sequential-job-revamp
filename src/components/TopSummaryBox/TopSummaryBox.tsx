import React, { useState } from "react";
import {
  ItemCountCon,
  TopSummaryContainer,
  TopSummaryItems,
} from "./TopSummaryBox.styles";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useQuery } from "react-query";
import { jobDasboardSummaryApi } from "../../redux/api/jobSeekerInterview.api";
import Preloader from "../Preloader/Preloader";
import { getCompanyDashboardSummaryApi } from "../../redux/api/company/companyjobs.api";
import {
  selectCompanyDashboard,
  changeApplicationDashboardState,
  CompanyDashboardSliceStateType,
} from "../../redux/company/companyDashboardSlice";
import { selectApplicantDashboard } from "../../redux/applicantDashboardSlice";

const TopSummaryBox = () => {
  const { dashboardJobSummaryStatus } = useAppSelector(
    selectApplicantDashboard
  );
  const [data, setData] = useState([
    { color: "red", name: "Jobs Applied ", status: "job_applied", count: 0 },
    {
      color: "green",
      name: "Interviews Attended",
      status: "interviews_attended",
      count: 0,
    },
    {
      color: "gray",
      name: "Jobs Test Taken",
      status: "job_test_taken",
      count: 0,
    },
    {
      color: "purple",
      name: "Jobs Test Scheduled",
      status: "job_test_scheduled",
      count: 0,
    },
    {
      color: "pink",
      name: "Interview Scheduled",
      status: "interview_scheduled",
      count: 0,
    },
    { color: "brown", name: "Job Offers", status: "job_offers", count: 0 },
  ]);
  const dispatch = useAppDispatch();
  const { isLoading } = useQuery("job-summary", jobDasboardSummaryApi, {
    onSuccess: (data) => {
      setData([
        {
          color: "red",
          name: "Jobs Applied ",
          status: "job_applied",
          count: data?.jobs_applied_for,
        },
        {
          color: "green",
          name: "Interviews Attended",
          status: "interviews_attended",
          count: data?.interviews_attended,
        },
        {
          color: "gray",
          name: "Jobs Test Taken",
          status: "job_test_taken",
          count: data?.jobs_test_taken,
        },
        {
          color: "purple",
          name: "Jobs Test Scheduled",
          status: "job_test_scheduled",
          count: data.jobs_test_scheduled,
        },
        {
          color: "pink",
          name: "Interview Scheduled",
          status: "interview_scheduled",
          count: data.interview_scheduled,
        },
        {
          color: "brown",
          name: "Job Offers",
          status: "job_offers",
          count: data.job_offers,
        },
      ]);
    },
  });

  return (
    <TopSummaryContainer>
      <Preloader loading={isLoading} />
      {data.map((item, index) => (
        <TopSummaryItems
          newColor={item.color}
          onClick={(e) => {
            dispatch(
              changeApplicationDashboardState(
                item.status as CompanyDashboardSliceStateType["dashboardJobSummaryStatus"]
              )
            );
          }}
          style={
            dashboardJobSummaryStatus === item.status
              ? { backgroundColor: "#24CDE2" }
              : {}
          }
          key={index}
        >
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

export const CompanyTopSummaryBox = () => {
  const { dashboardJobSummaryStatus } = useAppSelector(selectCompanyDashboard);
  const [data, setData] = useState([
    {
      color: "red",
      name: "Total Applications",
      status: "total_application",
      count: 0,
    },
    {
      color: "green",
      name: "Applicants hired",
      status: "applicants_hired",
      count: 0,
    },
    {
      color: "gray",
      name: "Total Number of Job Post",
      status: "total_number_of_job_post",
      count: 0,
    },
    { color: "purple", name: "Closed Jobs", status: "closed_jobs", count: 0 },
    {
      color: "pink",
      name: "Total Number of CV",
      status: "total_number_of_cv",
      count: 0,
    },
    { color: "brown", name: "Active Jobs", status: "active_jobs", count: 0 },
  ]);
  const dispatch = useAppDispatch();
  const { isLoading } = useQuery(
    "getCompanyDashboardSummaryApi",
    getCompanyDashboardSummaryApi,
    {
      onSuccess: (data) => {
        setData([
          {
            color: "red",
            name: "Total Applications",
            status: "total_application",
            count: data.total_applicant,
          },
          {
            color: "green",
            name: "Applicant Hired",
            status: "applicants_hired",
            count: data.applicant_hired,
          },
          {
            color: "gray",
            name: "Total Number of Job Post",
            status: "total_number_of_job_post",
            count: data.total_number_of_job_post,
          },
          {
            color: "purple",
            name: "Closed Jobs",
            status: "closed_jobs",
            count: data.closed_jobs,
          },
          {
            color: "pink",
            name: "Total Number of CV",
            status: "total_number_of_cv",
            count: data.total_number_of_cv,
          },
          {
            color: "brown",
            name: "Active Jobs",
            status: "active_jobs",
            count: data.active_jobs,
          },
        ]);
      },
    }
  );

  return (
    <TopSummaryContainer>
      <Preloader loading={isLoading} />
      {data?.map((item, index) => (
        <TopSummaryItems
          newColor={item.color}
          onClick={(e) => {
            dispatch(
              changeApplicationDashboardState(
                item.status as CompanyDashboardSliceStateType["dashboardJobSummaryStatus"]
              )
            );
          }}
          style={
            dashboardJobSummaryStatus === item.status
              ? { backgroundColor: "#24CDE2" }
              : {}
          }
          key={index}
        >
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
