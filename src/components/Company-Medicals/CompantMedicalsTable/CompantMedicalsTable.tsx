import Preloader from "../../Preloader/Preloader";
import Tables from "../../Tables/Tables";
import { medicalsMockData } from "../CompanyMedicalsMockData/MedicalsMockData";
import {
  TableAccept,
  TableReject,
  TableView,
} from "../../Tables/Tables.styles";
import { Hooks } from "react-table";

function CompantMedicalsTable() {
  const columns = [
    {
      Header: "Candidate Name",
      accessor: "job_title",
    },
    {
      Header: "Date of Application",
      accessor: "location",
    },
    {
      Header: "Role Applied For",
      accessor: "job_type",
    },
  ];

  const tableHooks = (hooks: Hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "CV",
        Header: "CV",
        Cell: ({ row }) => (
          <TableAccept
            onClick={() => alert("Accept row it the id " + row.values.id)}
          >
            View
          </TableAccept>
        ),
      },
      {
        id: "Decision",
        Header: "Decision",
        Cell: ({ row }) => (
          <TableReject
            onClick={() => alert("Reject row it the id " + row.values.id)}
          >
            Hired
          </TableReject>
        ),
      },
      {
        id: "Medicals Schedule",
        Header: "Medicals Schedule",
        Cell: ({ row }) => (
          <TableView
            onClick={() => alert("Offer Letter row it the id " + row.values.id)}
          >
            Click to Share
          </TableView>
        ),
      },
    ]);
  };

  return (
    <>
      <div>
        <Preloader loading={false} />
        <Tables
          tableColumn={columns}
          tableData={medicalsMockData}
          customHooks={[tableHooks]}
        />
      </div>
    </>
  );
}

export default CompantMedicalsTable;
