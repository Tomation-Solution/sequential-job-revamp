import moment from "moment";
import EmptyState from "../../../../components/EmptyState/EmptyState";
import TableDataColored from "../../../../globals/styles/TableDataColored";
import Preloader from "../../../../components/Preloader/Preloader";
import Tables from "../../../../components/Tables/Tables";

type Props = {
  loadingState: any;
  isError: any;
  data: any;
};

function JobCandidateSummary({ loadingState, isError, data }: Props) {
  if (loadingState) {
    return <EmptyState header="Loading Job Details" />;
  }

  if (isError || !data) {
    return <EmptyState header="Oops could not fetch necessary data" />;
  }

  if (data.length <= 0) {
    return <EmptyState header="No candidates for this job" />;
  }

  const colorDeterminer = (value: string) => {
    if (value === "selected") {
      return "green";
    } else if (value === "in_view") {
      return "yellow";
    } else if (value === "not_selected") {
      return "red";
    } else if (value === "idle") {
      return "#FCBE2B";
    } else {
      return "black";
    }
  };

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
      Header: "Selection Report",
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

  return (
    <div>
      <Preloader loading={loadingState} />
      <Tables
        tableColumn={columns}
        tableData={data ? data : []}
        customHooks={[]}
      />
    </div>
  );
}

export default JobCandidateSummary;
