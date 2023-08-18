import TableDataColored from "../../globals/styles/TableDataColored";
import Tables from "../Tables/Tables";
import { InterviewTestMockData } from "../../constants/interview-test";

type Props = {
  jobId: any;
  setOverview: React.Dispatch<
    React.SetStateAction<"isOverview" | "notOverview">
  >;
  userType: "company" | "panelist";
};

function PanelistCandidateDetailedList({
  jobId,
  setOverview,
  userType,
}: Props) {
  const columns = [
    {
      Header: "Candidate Name",
      accessor: "name",
    },
    {
      Header: "Interview Date",
      accessor: "date",
    },
    {
      Header: "Role Applied for",
      accessor: "role",
    },
    {
      Header: "CV",
      accessor: "cv",
      id: 1,
      Cell: (tableProps: any) => (
        <TableDataColored
          color="blue"
          where={`/company/cv-details/${tableProps.row.original.cv}/${tableProps.row.original?.jobseekers?.role_applied_for}`}
        >
          View
        </TableDataColored>
      ),
    },
    {
      Header: "Time scheduled",
      accessor: "time",
      id: 2,
      Cell: (tableProps: any) => (
        <TableDataColored color="green">
          {tableProps.row.original.time}
        </TableDataColored>
      ),
    },
    {
      Header: "Rate",
      accessor: "link",
      id: 3,
      Cell: (tableProps: any) => (
        <TableDataColored
          cursor="pointer"
          onClick={() => setOverview("notOverview")}
          color="gold"
        >
          Rate
        </TableDataColored>
      ),
    },
  ];

  return (
    <div>
      <Tables
        tableColumn={columns}
        tableData={InterviewTestMockData ? InterviewTestMockData : []}
        customHooks={[]}
      />
    </div>
  );
}

export default PanelistCandidateDetailedList;
