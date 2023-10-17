import { useState } from "react";
import { CompanyNavBarItemsContainer } from "../Company-NavBar/CompanyNavBar.styles";
import Dropdown from "../../globals/Dropdown/Dropdown";
import PanelistNavBar from "../Panelist-NavBar/PanelistNavBar";
import PanelistCandidateDetailedList from "./PanelistCandidateDetailedList";
import PanelistRateCandidate from "./PanelistRateCandidate";
import { FlexBox } from "../../globals/styles/FlexBox";
import Button from "../Button/Button";
import { getUser } from "../../utils/extraFunction";
import { Navigate } from "react-router-dom";
import useToast from "../../hooks/useToastify";
import { useCustomFetcher } from "../../utils/fetcher";
import { JobType } from "../Company-Job-Test-Management/types";
import { getAllCompanyJobs } from "../../redux/api/company/jobs-test-management.api";
import moment from 'moment'
import EmptyState from "../EmptyState/EmptyState";
type Props = {
  allJobsData: any;
  userType: "company" | "panelist";
};

function PanelistInvites({ userType, allJobsData }: Props) {
  const [dropdownOption, setDropdownOption] = useState<string>("create_mode");

  const [overview, setOverview] = useState<"isOverview" | "notOverview">(
    "isOverview"
  );
  // const [data, setData] = useState<any>([]);
  const currentUser = getUser();
  const { notify } = useToast();
  const { loadingState, isError, data } = useCustomFetcher<JobType[]>(
    "all-jobs",
    getAllCompanyJobs,
    (data) =>
      data.data.map((item: any) => ({
        id: item.id,
        job_filter: item.job_filter,
        is_active: item.is_active,
        job_title: item.job_title,
        created_at: item.created_at,
      }))
  );


  if (currentUser?.user_type !== userType) {
    notify("unauthorized user", "error");
    return <Navigate to={"/login"} />;
  }

  // console.log("allJobsData", allJobsData);

  if (isError || !data) {
    return (
      <EmptyState
        header="Oops something went wrong"
        subHeader="Failed to fetch all company job, you can try refreshing the page."
      />
    );
  }

  return (
    <>
      <PanelistNavBar>
        <CompanyNavBarItemsContainer>
          <Dropdown
            disabledValue="create_mode"
            disabledOption="Select a Job"
            options={[
              { label: "Create Job Mode", value: "create_mode" },
              ...data.map((item) => ({
                label: `${item.job_title} // ${moment(
                  new Date(item.created_at)
                ).format("MMM Do YY")}`,
                value: `${item.id}`,
              })),
            ]}
            onChange={setDropdownOption}
            defaultValue={dropdownOption}
          />

        </CompanyNavBarItemsContainer>
      </PanelistNavBar>

      <FlexBox justifyContent="flex-end">
        {overview === "notOverview" ? (
          <Button onClick={() => setOverview("isOverview")} styleType="sec">
            Back to Overview
          </Button>
        ) : null}
      </FlexBox>

      {overview === "isOverview" ? (
        <PanelistCandidateDetailedList
          jobId={dropdownOption}
          setOverview={setOverview}
          userType={userType}
        />
      ) : null}

      {overview === "notOverview" ? (
        <PanelistRateCandidate jobId={dropdownOption} userType={userType} />
      ) : null}
    </>
  );
}

export default PanelistInvites;
