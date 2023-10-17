import TableDataColored from "../../globals/styles/TableDataColored";
import Tables from "../Tables/Tables";
import { InterviewTestMockData } from "../../constants/interview-test";
import { useQuery } from "react-query";
import { getCandidateThatAcceptedInterview } from "../../redux/api/company/interview-management.api";
import moment from "moment";
import Preloader from "../Preloader/Preloader";

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
      id:1,
      Cell: (tableProps: any) => (
        <TableDataColored>
          {tableProps.row.original.job_seeker.full_name}
        </TableDataColored>
      ),
    },
    {
      Header: "Interview Date",
      accessor: "date",
      id:2,
      Cell: (tableProps: any) => (
        <TableDataColored>
          { `${moment(new Date(tableProps.row.original.date_picked)).format("MMMM Do YYYY, ")} `}
        </TableDataColored>
      ),
    },
    {
      Header: "Role Applied for",
      accessor: "role",
      id:7,
      Cell: (tableProps: any) => (
        <TableDataColored>
          {tableProps.row.original.job.position}
        </TableDataColored>
      ),
    },
    {
      Header: "CV",
      accessor: "cv",
      id: 3,
      Cell: (tableProps: any) => (
        <TableDataColored
          color="blue"
          where={`/company/cv-details/${tableProps.row.original.job_seeker.id}/${tableProps.row.original?.job?.position}`}
        >
          View
        </TableDataColored>
      ),
    },
    {
      Header: "Time scheduled",
      accessor: "time",
      id: 4,
      Cell: (tableProps: any) => (
        <TableDataColored color="green">
         {tableProps.row.original.time_picked}
        </TableDataColored>
      ),
    },
    {
      Header: "Rate",
      accessor: "link",
      id: 5,
      Cell: (tableProps: any) => (
        <TableDataColored
          cursor="pointer"
          onClick={() => {
            window.localStorage.setItem('job_applicant_id',tableProps.row.original.job_applicant_id)
            setOverview("notOverview")
          }}
          color="gold"
        >
          Rate
        </TableDataColored>
      ),
    },
  ];

  const {data,isLoading} = useQuery('getCandidateThatAcceptedInterview',()=>getCandidateThatAcceptedInterview(jobId as string),{
    'enabled':jobId !=='create_mode'?true:false
  })
  return (
    <div>
      <Preloader  loading={isLoading}/>
      <Tables
        tableColumn={columns}
        tableData={data ? data : []}
        customHooks={[]}
      />
    </div>
  );
}

export default PanelistCandidateDetailedList;
