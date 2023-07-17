import moment from "moment";
import Preloader from "../../../components/Preloader/Preloader";
import Tables from "../../../components/Tables/Tables";
import TableDataColored from "../../../globals/styles/TableDataColored";
import { getAllCvsForACompany } from "../../../redux/api/company/companyjobs.api";
import { useCustomFetcher } from "../../../utils/fetcher";
import EmptyState from "../../../components/EmptyState/EmptyState";

function TotalCVNumberTable({
  filterJobId,
  filterByDate,
}: {
  filterJobId: any;
  filterByDate: any;
}) {
  const { loadingState, isError, data } = useCustomFetcher(
    `get-all-company-cvs-${filterJobId}`,
    getAllCvsForACompany
  );

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
      Header: "Name",
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
      Header: "Job Title",
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

  if (isError) {
    return <EmptyState header="Oops could not fetch necessary data" />;
  }

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

export default TotalCVNumberTable;
