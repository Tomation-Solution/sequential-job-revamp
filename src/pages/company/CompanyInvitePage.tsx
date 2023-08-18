import PanelistInvites from "../../components/Panelist-Invites/PanelistInvites";
import { getAllCompanyJobs } from "../../redux/api/company/jobs-test-management.api";
import { useCustomFetcher } from "../../utils/fetcher";

function CompanyInvitePage() {
  const { loadingState, isError, data } = useCustomFetcher(
    "all-jobs",
    getAllCompanyJobs,
    (data) =>
      data.data.map((item: any) => ({
        id: item.id,
        job_title: item.job_title,
        created_at: item.created_at,
      }))
  );

  return (
    <>
      <PanelistInvites userType="company" allJobsData={data} />
    </>
  );
}

export default CompanyInvitePage;
