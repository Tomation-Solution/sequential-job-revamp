
import React, { useState } from "react";
import { jobMockData, medicalsMockData } from "../MockData";
import { TableAccept, TableReject, TableView } from "../Tables.styles";
import { Hooks } from "react-table";
import Tables from "../Tables";
import { IndeterminateCheckbox } from "../Checkbox";
import {
  // JobsAcceptSlides,
  // JobsRejectSlides,
  JobsTakeTestSlides,
} from "../../JobsSlides/JobsSlides";
import OffCanvas from "../../OffCanvas/OffCanvas";




export const MedicalsSubmissionTables = ():React.ReactElement=>{
    const [isOpen, setIsOpen] = useState(false)
    const handleFloatingBtnClick=()=>{
      //
    }
    const columns = [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Position",
        accessor: "position",
      },
      {
        Header: "Company",
        accessor: "Company",
      },
      {
        Header: "Date Of Upload",
        accessor: "date_of_upload" ,
      },
      {
        Header: "Candidates Applied",
        accessor: "CandidatesApplied",
      },
    //   {
    //     Header: "status",
    //     accessor: "status",
    //   },
    ];
  
    const statusHook = (hooks:Hooks)=>{
         hooks.visibleColumns.push((columns: any) => [
      ...columns,
      {
        id: "Status",
        Header: "Status",
        Cell: ({ row }) => (
          <TableAccept
          style={{'color':'#23D685'}}
            onClick={() => alert("Editing row it the id " + row.values.id)}
          >
            Applied
          </TableAccept>
        ),
      },
    ]);
    }
    return (
        <div>
 <Tables
        tableColumn={columns}
        tableData={medicalsMockData}
        customHooks={[statusHook]}
      />
        </div>
    )
}

export default MedicalsSubmissionTables