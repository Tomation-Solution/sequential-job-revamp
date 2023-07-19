import { CompanyTopSummaryBox } from "../../components/TopSummaryBox/TopSummaryBox";
import { useAppSelector } from "../../redux/hooks";
import { selectCompanyDashboard } from "../../redux/company/companyDashboardSlice";
import TotalApplicant from "./CompanyDashBoardFilterTables/TotalApplicantTable";
import TotalApplicantHired from "./CompanyDashBoardFilterTables/TotalApplicantHiredTable";
import TotalJob from "./CompanyDashBoardFilterTables/TotalJobTable";
import ActiveJobs from "./CompanyDashBoardFilterTables/ActiveJobsTable";
import ClosedJobs from "./CompanyDashBoardFilterTables/ClosedJobsTable";
import SummaryChartsSection from "./CompanyDashBoardFilterTables/SummaryChartsSection";
import CompanyNavBar from "../../components/Company-NavBar/CompanyNavBar";
import { CompanyNavBarItemsContainer } from "../../components/Company-NavBar/CompanyNavBar.styles";
import Dropdown from "../../globals/Dropdown/Dropdown";
import { useState } from "react";
import { useCustomFetcher } from "../../utils/fetcher";
import { getCompanyTotalJobApi } from "../../redux/api/company/companyjobs.api";
import { JobType } from "../../components/Company-Job-Test-Management/types";
import EmptyState from "../../components/EmptyState/EmptyState";
import moment from "moment";
import { FormInput } from "../../globals/styles/forms.styles";
import TotalCVNumberTable from "./CompanyDashBoardFilterTables/TotalCVNumberTable";

const CompanyIndexPage = () => {
  const { dashboardJobSummaryStatus } = useAppSelector(selectCompanyDashboard);
  const [dateFilter, setDateFilter] = useState("");
  const [jobFilter, setJobFilter] = useState("");

  const { loadingState, isError, data } = useCustomFetcher<JobType[]>(
    "getCompanyTotalJobApi",
    getCompanyTotalJobApi,
    (data) =>
      data.map((item: any) => ({
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
          <FormInput>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </FormInput>

          <Dropdown
            disabledOption="Filter By Jobs Posted"
            options={[
              { label: "Clear Filter", value: "" },
              ...data.map((item) => ({
                label: `${item.job_title} // ${moment(
                  new Date(item.created_at)
                ).format("MMM Do YY")}`,
                value: `${item.id}`,
              })),
            ]}
            onChange={setJobFilter}
            defaultValue={jobFilter}
          />
        </CompanyNavBarItemsContainer>
      </CompanyNavBar>

      <br />
      <CompanyTopSummaryBox />
      <br />

      {dashboardJobSummaryStatus === "summary-charts" ? (
        <SummaryChartsSection />
      ) : (
        ""
      )}

      {dashboardJobSummaryStatus === "total_application" ? (
        <TotalApplicant filterJobId={jobFilter} filterByDate={dateFilter} />
      ) : (
        ""
      )}
      {dashboardJobSummaryStatus === "applicants_hired" ? (
        <TotalApplicantHired
          filterJobId={jobFilter}
          filterByDate={dateFilter}
        />
      ) : (
        ""
      )}
      {dashboardJobSummaryStatus === "total_number_of_job_post" ? (
        <TotalJob filterJobId={jobFilter} filterByDate={dateFilter} />
      ) : (
        ""
      )}
      {dashboardJobSummaryStatus === "active_jobs" ? (
        <ActiveJobs filterJobId={jobFilter} filterByDate={dateFilter} />
      ) : (
        ""
      )}
      {dashboardJobSummaryStatus === "closed_jobs" ? (
        <ClosedJobs filterJobId={jobFilter} filterByDate={dateFilter} />
      ) : (
        ""
      )}
      {dashboardJobSummaryStatus === "total_number_of_cv" ? (
        <TotalCVNumberTable filterJobId={jobFilter} filterByDate={dateFilter} />
      ) : (
        ""
      )}
    </>
  );
};

export default CompanyIndexPage;
