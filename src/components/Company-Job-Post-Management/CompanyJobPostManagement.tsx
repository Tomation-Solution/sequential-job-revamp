import { FlexBox } from "../../globals/styles/FlexBox";
import Button from "../Button/Button";
import CompanyNavBar, {
  CompanyNavBarTab,
} from "../Company-NavBar/CompanyNavBar";
import { CompanyNavBarItemsContainer } from "../Company-NavBar/CompanyNavBar.styles";

import CompanyJobPostTab1 from "./CompanyJobPostTab1";
import { useState } from "react";
import { SavedTabs } from "./types";
import useToast from "../../hooks/useToastify";
import CompanyJobPostTab2 from "./CompanyJobPostTab2";
import CompanyJobPostTab3 from "./CompanyJobPostTab3";
import Dropdown from "../../globals/Dropdown/Dropdown";
import { useCustomFetcher } from "../../utils/fetcher";
import { JobType } from "../Company-Job-Test-Management/types";
import { getAllCompanyJobs } from "../../redux/api/company/jobs-test-management.api";
import EmptyState from "../EmptyState/EmptyState";
import moment from "moment";

function CompanyJobPostManagement() {
  const [currentRender, setCurrentRender] = useState(1);

  const [dropdownOption, setDropdownOption] = useState<string>("create_mode");

  const setSavedTabs = useState<SavedTabs>({
    tab1: false,
    tab2: false,
    tab3: false,
  })[1];

  const { notify } = useToast();

  const btnDisabler = () => {
    // if (currentRender === 1 && !savedTabs.tab1) {
    //   return true;
    // } else if (currentRender === 2 && !savedTabs.tab2) {
    //   return true;
    // }
    return false;
  };

  const changeRenderedTab = (type: "incr" | "decr") => {
    if (type === "incr" && currentRender < 3) {
      setCurrentRender(currentRender + 1);
    } else {
      setSavedTabs({ tab1: false, tab2: false, tab3: false });
      setCurrentRender(currentRender - 1);
    }
  };

  const { loadingState, isError, data } = useCustomFetcher<JobType[]>(
    "all-jobs",
    getAllCompanyJobs,
    (data) =>
      data.data.map((item: any) => ({
        id: item.id,
        job_title: item.job_title,
        created_at: item.created_at,
      }))
  );

  if (loadingState) {
    return <EmptyState header="Fetching all Jobs" />;
  }

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
      <CompanyNavBar>
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

          <CompanyNavBarTab isSelected={currentRender === 1}>
            <p>Job Post Creation</p>
          </CompanyNavBarTab>

          <CompanyNavBarTab isSelected={currentRender === 2}>
            <p>Set CV sorting Questions</p>
          </CompanyNavBarTab>

          <CompanyNavBarTab isSelected={currentRender === 3}>
            <p>Set Cut off Points</p>
          </CompanyNavBarTab>
        </CompanyNavBarItemsContainer>
      </CompanyNavBar>

      <FlexBox justifyContent="space-between">
        {currentRender === 2 ? (
          <Button styleType="sec" onClick={() => changeRenderedTab("decr")}>
            Back to Job Creation
          </Button>
        ) : null}

        {currentRender === 3 ? (
          <Button styleType="sec" onClick={() => changeRenderedTab("decr")}>
            Back to Set CV Sorting Questions
          </Button>
        ) : null}

        <Button
          // disabled={btnDisabler()}
          onClick={() => {
            if (btnDisabler()) {
              notify("save this job to proceed", "error");
            } else {
              changeRenderedTab("incr");
            }
          }}
        >
          {currentRender === 1 && "Proceed to set CV sorting Question"}
          {currentRender === 2 && "Proceed to CV Cut off point"}
          {currentRender === 3 && "Post another job"}
        </Button>
      </FlexBox>

      {/* <FlexBox justifyContent="flex-end">
        <Button
          // disabled={btnDisabler()}
          onClick={() => {
            if (btnDisabler()) {
              notify("save this job to proceed", "error");
            } else if (currentRender === 3) {
              setCurrentRender(1);
            } else {
              changeRenderedTab("incr");
            }
          }}
        >
          {currentRender === 1 && "Proceed to set CV sorting Question"}
          {currentRender === 2 && "Proceed to CV Cut off point"}
          {currentRender === 3 && "Post another job"}
        </Button>
      </FlexBox> */}

      {currentRender === 1 ? (
        <CompanyJobPostTab1
          selectedJobId={dropdownOption}
          setSavedTabs={setSavedTabs}
        />
      ) : null}
      {currentRender === 2 ? (
        <CompanyJobPostTab2
          selectedJobId={dropdownOption}
          setSavedTabs={setSavedTabs}
        />
      ) : null}
      {currentRender === 3 ? (
        <CompanyJobPostTab3 selectedJobId={dropdownOption} />
      ) : null}
    </>
  );
}

export default CompanyJobPostManagement;
