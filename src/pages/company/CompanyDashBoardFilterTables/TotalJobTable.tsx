import { useQuery } from "react-query";
import Preloader from "../../../components/Preloader/Preloader";
import Tables from "../../../components/Tables/Tables";
import { getCompanyTotalJobApi } from "../../../redux/api/company/companyjobs.api";
import TableDataColored from "../../../globals/styles/TableDataColored";
import moment from "moment";
import { dateformatter } from "../../../utils/DateFormatter";
import { JobType } from "../../../components/Company-Job-Test-Management/types";
import { seqGray200 } from "../../../globals/colors";

const TotalJob = ({
  filterJobId,
  filterByDate,
}: {
  filterJobId: any;
  filterByDate: any;
}) => {
  //

  const { isLoading, data } = useQuery(
    "getCompanyTotalJobApi2",
    getCompanyTotalJobApi,
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

  const colorDeterminer = (isActive: boolean) => {
    if (isActive) {
      return "green";
    } else {
      return "red";
    }
  };

  const columns = [
    {
      Header: "Position",
      accessor: "job_title",
    },
    {
      Header: "Date of Upload",
      accessor: "created_at",
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
      Header: "Salary",
      accessor: "salary",
      id: 3,
      Cell: (tableProps: any) => (
        <TableDataColored
          color={colorDeterminer(tableProps.row.original.is_active)}
        >
          {tableProps.row.original.is_active ? "Active" : "Closed"}
        </TableDataColored>
      ),
    },
    {
      Header: "See More",
      accessor: "see-more",
      id: 7,
      Cell: (tableProps: any) => (
        <TableDataColored
          color={seqGray200}
          where={`/company/job-candidate-summary/${tableProps.row.original.id}`}
        >
          see more
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

export default TotalJob;
