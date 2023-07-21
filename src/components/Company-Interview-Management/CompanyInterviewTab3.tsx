import moment from "moment";
import TableDataColored from "../../globals/styles/TableDataColored";
import { getCompanyTotalApplicantApi } from "../../redux/api/company/companyjobs.api";
import { colorDeterminer } from "../../utils/extraFunction";
import { useCustomFetcher } from "../../utils/fetcher";
import EmptyState from "../EmptyState/EmptyState";
import Tables from "../Tables/Tables";

type Props = {
  jobId: any;
};

const CompanyInterviewTab3 = ({ jobId }: Props) => {
  const { loadingState, data, isError } = useCustomFetcher<any>(
    `job-details-applicant-${jobId}`,
    () => getCompanyTotalApplicantApi(jobId),
    (data) => data
  );

  const columns = [
    {
      Header: "Candidate name",
      accessor: "job",
      id: 1,
      Cell: (tableProps: any) => (
        <TableDataColored>
          {tableProps.row.original.jobseekers.full_name}
        </TableDataColored>
      ),
    },
    {
      Header: "Date of Application",
      accessor: "job",
      id: 2,
      Cell: (tableProps: any) => (
        <TableDataColored>
          {moment(new Date(tableProps.row.original.created_at)).format(
            "MMMM Do YYYY, h:mm:ss a"
          )}
        </TableDataColored>
      ),
    },
    {
      Header: "Role Applied For",
      accessor: "jobseekers",
      id: 3,
      Cell: (tableProps: any) => (
        <TableDataColored>
          {tableProps.row.original.jobseekers.role_applied_for}
        </TableDataColored>
      ),
    },

    {
      Header: "CV",
      accessor: "view cv",
      id: 4,
      Cell: (tableProps: any) => (
        <TableDataColored
          color="blue"
          where={`/company/cv-details/${tableProps.row.original.cv_id}/${tableProps.row.original.jobseekers.role_applied_for}`}
        >
          view
        </TableDataColored>
      ),
    },
    {
      Header: "Status",
      accessor: "not-stated",
      id: 5,
      Cell: (tableProps: any) => (
        <TableDataColored>{"Nothing Here"}</TableDataColored>
      ),
    },
    {
      Header: "Invite",
      accessor: "final_selection_state",
      id: 6,
      Cell: (tableProps: any) => (
        <TableDataColored
          color={colorDeterminer(tableProps.row.original.final_selection_state)}
        >
          {tableProps.row.original.final_selection_state === "not_selected"
            ? "not selected"
            : tableProps.row.original.final_selection_state}
        </TableDataColored>
      ),
    },
  ];

  if (loadingState) {
    return <EmptyState header="Fetching Job Candidates" />;
  }

  if (isError || !data || data?.length <= 0) {
    return (
      <EmptyState
        header="Oops something went wrong"
        subHeader={`${
          data?.length <= 0
            ? "No candidates for this job"
            : "Failed to fetch all Job Candidates, you can try refreshing the page."
        }`}
      />
    );
  }

  return (
    <div>
      <Tables
        tableColumn={columns}
        tableData={data ? data : []}
        customHooks={[]}
      />
    </div>
  );
};

export default CompanyInterviewTab3;
