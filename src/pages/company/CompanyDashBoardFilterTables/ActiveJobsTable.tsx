import { useQuery } from "react-query";
import Preloader from "../../../components/Preloader/Preloader";
import Tables from "../../../components/Tables/Tables";
import { getCompanyActiveJobApi } from "../../../redux/api/company/companyjobs.api";
import TableDataColored from "../../../globals/styles/TableDataColored";
import moment from "moment";
import { JobType } from "../../../components/Company-Job-Test-Management/types";
import { dateformatter } from "../../../utils/DateFormatter";

const ActiveJobs = ({
  filterJobId,
  filterByDate,
}: {
  filterJobId: any;
  filterByDate: any;
}) => {
  // getCompanyActiveJobApi

  const { isLoading, data } = useQuery(
    "getCompanyActiveJobApi",
    getCompanyActiveJobApi,
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

export default ActiveJobs;
