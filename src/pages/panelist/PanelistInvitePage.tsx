import PanelistInvites from "../../components/Panelist-Invites/PanelistInvites";
import { getAllPanelistJobs } from "../../redux/api/panelist/panelist-interview-management.api";
import { useCustomFetcher } from "../../utils/fetcher";

function PanelistInvitePage() {
  const { data,error } = useCustomFetcher(
    "all-panelist-jobs",
    getAllPanelistJobs,
    (data) =>
      data.data.map((item: any) => ({
        id: item.id,
        org_name: item?.org_name || "",
        job_title: item.job_title,
        created_at: item.created_at,
      }))
  );
  // console.log({data,error})

  return (
    <>
      <PanelistInvites userType="panelist" allJobsData={data} />
    </>
  );
}

export default PanelistInvitePage;
