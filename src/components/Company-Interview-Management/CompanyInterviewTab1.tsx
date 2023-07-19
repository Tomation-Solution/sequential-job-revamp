import { InterviewTestMockData } from "../../constants/interview-test";
import TableDataColored from "../../globals/styles/TableDataColored";
import Tables from "../Tables/Tables";

type Props = {
  jobId: any;
};

function CompanyInterviewTab1({ jobId }: Props) {
  const columns = [
    {
      Header: "Candidate Name",
      accessor: "name",
    },
    {
      Header: "Date of Application",
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
          where={`/company/job-candidate-summary/${tableProps.row.original.cv}`}
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
      Header: "Link",
      accessor: "link",
      id: 3,
      Cell: (tableProps: any) => (
        <TableDataColored
          color="gold"
          where={`${tableProps.row.original.link}`}
        >
          Setup
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

export default CompanyInterviewTab1;
