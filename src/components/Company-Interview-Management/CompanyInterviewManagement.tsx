import { useState } from "react";
import Dropdown from "../../globals/Dropdown/Dropdown";
import CompanyNavBar, {
  CompanyNavBarTab,
} from "../Company-NavBar/CompanyNavBar";
import { CompanyNavBarItemsContainer } from "../Company-NavBar/CompanyNavBar.styles";
import { CompanyInterviewManagementContainer } from "./CompanyInterviewManagement.styles";
import CompanyInterviewTab1 from "./CompanyInterviewTab1";
import CompanyInterviewTab2 from "./CompanyInterviewTab2";
import CompanyInterviewTab3 from "./CompanyInterviewTab3";
import CompanyInterviewTab4 from "./CompanyInterviewTab4";
import { useCustomFetcher } from "../../utils/fetcher";
import { getAllCompanyJobs } from "../../redux/api/company/jobs-test-management.api";
import EmptyState from "../EmptyState/EmptyState";
import { JobType } from "../Company-Job-Test-Management/types";
import moment from "moment";

function CompanyInterviewManagement() {
  const [dropdownOption, setDropdownOption] = useState<string>("");
  const [currentRender, setCurrentRender] = useState(1);

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

  if (isError || data?.length! <= 0 || !data) {
    return (
      <EmptyState
        header="Oops something went wrong"
        subHeader="No jobs requiring test were found, try uploading some or refreshing the page."
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
            options={data.map((item) => ({
              label: `${item.job_title} // ${moment(
                new Date(item.created_at)
              ).format("MMM Do YY")}`,
              value: `${item.id}`,
            }))}
            onChange={setDropdownOption}
            defaultValue={dropdownOption}
          />

          <CompanyNavBarTab
            onClick={() => setCurrentRender(1)}
            isSelected={currentRender === 1}
          >
            <p>Set Intreview</p>
          </CompanyNavBarTab>

          <CompanyNavBarTab
            onClick={() => setCurrentRender(2)}
            isSelected={currentRender === 2}
          >
            <p>Panelist Invitation</p>
          </CompanyNavBarTab>

          <CompanyNavBarTab
            onClick={() => setCurrentRender(4)}
            isSelected={currentRender === 4}
          >
            <p>Set Rating Scale</p>
          </CompanyNavBarTab>

          <CompanyNavBarTab
            onClick={() => setCurrentRender(3)}
            isSelected={currentRender === 3}
          >
            <p>Invite Applicants</p>
          </CompanyNavBarTab>
        </CompanyNavBarItemsContainer>
      </CompanyNavBar>

      <CompanyInterviewManagementContainer>
        <main>
          {currentRender === 1 ? (
            <CompanyInterviewTab1 jobId={dropdownOption} />
          ) : null}
          {currentRender === 2 ? (
            <CompanyInterviewTab2 jobId={dropdownOption} />
          ) : null}

          {currentRender === 4 ? (
            <CompanyInterviewTab4 jobId={dropdownOption} />
          ) : null}
          {currentRender === 3 ? (
            <CompanyInterviewTab3 jobId={dropdownOption} />
          ) : null}
        </main>
      </CompanyInterviewManagementContainer>
    </>
  );
}

export default CompanyInterviewManagement;
