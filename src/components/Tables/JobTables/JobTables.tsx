import React, { useState } from "react";
import { jobMockData } from "../MockData";
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

const JobTables = () => {
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
      accessor: "title",
    },
  ];

  const tableHooks = (hooks: Hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Click to Accept",
        Header: "Click to Accept",
        Cell: ({ row }) => (
          <TableAccept
            onClick={() => alert("Editing row it the id " + row.values.id)}
          >
            Accept
          </TableAccept>
        ),
      },
      {
        id: "Click to Reject",
        Header: "Click to Reject",
        Cell: ({ row }) => (
          <TableReject
            onClick={() => alert("Editing row it the id " + row.values.id)}
          >
            Reject
          </TableReject>
        ),
      },
      {
        id: "Offer Letter",
        Header: "Offer Letter",
        Cell: ({ row }) => (
          <TableView
            onClick={() => {
              setIsOpen(true)
            }}
          >
            View
          </TableView>
        ),
      },
    ]);
  };

  const selectionHook = (hooks: any) => {
    hooks.visibleColumns.push((columns: any) => [
      // Let's make a column for selection
      {
        id: "selection",
        // The header can use the table's getToggleAllRowsSelectedProps method
        // to render a checkbox
        Header: ({
          getToggleAllRowsSelectedProps,
        }: {
          getToggleAllRowsSelectedProps: any;
        }) => (
          <div>
            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
          </div>
        ),
        // The cell can use the individual row's getToggleRowSelectedProps method
        // to the render a checkbox
        Cell: ({ row }: { row: any }) => (
          <div>
            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
          </div>
        ),
      },
      ...columns,
    ]);
  };

  return (
    <>
      {/* <JobsAcceptSlides /> */}
      {/* <JobsRejectSlides /> */}
      <OffCanvas
        size={30}
        btnClick={handleFloatingBtnClick}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        // btnContrroller={ 
             
        // } 
      >
      <JobsTakeTestSlides />
     
      </OffCanvas>
      <Tables
        tableColumn={columns}
        tableData={jobMockData}
        customHooks={[tableHooks, selectionHook]}
      />
    </>
  );
};

export default JobTables;
