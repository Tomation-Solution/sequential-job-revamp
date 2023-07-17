import { useQuery } from "react-query";
import Preloader from "../../../components/Preloader/Preloader";
import Tables from "../../../components/Tables/Tables";
import { getCompanyTotalApplicantHiredApi } from "../../../redux/api/company/companyjobs.api";
import { dateformatter } from "../../../utils/DateFormatter";
import { JobType } from "../../../components/Company-Job-Test-Management/types";
import TableDataColored from "../../../globals/styles/TableDataColored";
import moment from "moment";

const TotalApplicantHired = ({
  filterJobId,
  filterByDate,
}: {
  filterJobId: any;
  filterByDate: any;
}) => {
  const { isLoading, data } = useQuery(
    `getCompanyTotalApplicantHiredApi-${filterJobId}`,
    () => getCompanyTotalApplicantHiredApi(filterJobId),
    {
      refetchOnWindowFocus: false,
      select: (data) => {
        if (!filterByDate) {
          return data;
        } else {
          return data.filter(
            (item: JobType) =>
              dateformatter(new Date(item.created_at)) ===
              dateformatter(new Date(filterByDate))
          );
        }
      },
    }
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
      <Preloader loading={isLoading} />
      <Tables
        tableColumn={columns}
        tableData={data ? data : []}
        customHooks={[]}
      />
    </div>
  );
};

export default TotalApplicantHired;
