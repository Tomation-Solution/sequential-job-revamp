import React, { useState } from "react";
import { medicalsMockData } from "../MockData";
import { TableAccept } from "../Tables.styles";
import { Hooks } from "react-table";
import Tables from "../Tables";
import OffCanvas from "../../OffCanvas/OffCanvas";
import Button from "../../Button/Button";

export const MedicalsSubmissionTables = (): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const handleFloatingBtnClick = () => {
    //
  };
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
      accessor: "date_of_upload",
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

  const statusHook = (hooks: Hooks) => {
    hooks.visibleColumns.push((columns: any) => [
      ...columns,
      {
        id: "Status",
        Header: "Status",
        Cell: ({ row }) => (
          <TableAccept
            style={{ color: "#23D685" }}
            onClick={() => alert("Editing row it the id " + row.values.id)}
          >
            Applied
          </TableAccept>
        ),
      },
    ]);
  };
  return (
    <div>
      <Tables
        tableColumn={columns}
        tableData={medicalsMockData}
        customHooks={[statusHook]}
      />

      <button
        onClick={(e) => {
          setIsOpen(true);
        }}
      >
        open congrats
      </button>
      <OffCanvas
        size={30}
        btnClick={handleFloatingBtnClick}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        // btnContrroller={

        // }
      >
        <div style={{ textAlign: "center" }}>
          <h2>Congrat</h2>
          <br />
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo
            cumque dolorem, in atque maxime voluptate accusamus officiis itaque
            commodi quo. Inventore qui officia eligendi aspernatur blanditiis
            totam aliquam dolores ipsum ab repudiandae sint maxime dolorem, ipsa
            facilis magnam architecto obcaecati assumenda illum sequi dolore
            molestias porro impedit. Neque laudantium minus ullam quod harum
            cumque eum id consequuntur ab nisi facilis repellendus, quibusdam
            labore rerum, enim esse. Perferendis laboriosam dolorem quasi ex
            earum omnis mollitia atque rerum nemo eligendi. At reiciendis fugit
            nesciunt, fugiat dolor expedita debitis eveniet. Vel sunt minima
            minus facilis. A minima suscipit hic architecto? Distinctio,
            dolorum. Soluta.
          </p>
          <br />
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo
            cumque dolorem, in atque maxime voluptate accusamus officiis itaque
            commodi quo. Inventore qui officia eligendi aspernatur blanditiis
            totam aliquam dolores ipsum ab repudiandae sint maxime dolorem, ipsa
            facilis magnam architecto obcaecati assumenda illum sequi dolore
            molestias porro impedit. Neque laudantium minus ullam quod harum
            cumque eum id consequuntur ab nisi facilis repellendus, quibusdam
            labore rerum, enim esse. Perferendis laboriosam dolorem quasi ex
            earum omnis mollitia atque rerum nemo eligendi. At reiciendis fugit
            nesciunt, fugiat dolor expedita debitis eveniet. Vel sunt minima
            minus facilis. A minima suscipit hic architecto? Distinctio,
            dolorum. Soluta.
          </p>
          <br />
          <br />
          <div
            style={{
              display: "flex",
              maxWidth: "800px",
              justifyContent: "space-between",
            }}
          >
            <Button>Accept Offer</Button>
            <Button styleType="whiteBg">Decline Offer</Button>
          </div>
        </div>
      </OffCanvas>
    </div>
  );
};

export default MedicalsSubmissionTables;
