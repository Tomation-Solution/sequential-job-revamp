import React, { useState } from "react";
import CompantMedicalsTable from "./CompantMedicalsTable/CompantMedicalsTable";
import {
  ItemCountCon,
  TopSummaryContainer,
  TopSummaryItems,
} from "../TopSummaryBox/TopSummaryBox.styles";
import CompanySchedule from "./CompanySchedule/CompanySchedule";

type Props = {};

const CompanyMedicals = (props: Props) => {
  const [options, setOptions] = useState<"table" | "schedule">("table");

  return (
    <>
      <TopSummaryContainer>
        <TopSummaryItems newColor={"green"} onClick={() => setOptions("table")}>
          <ItemCountCon>
            <h1>20</h1>
          </ItemCountCon>
          <p>Awaiting Medicals</p>
        </TopSummaryItems>

        <TopSummaryItems
          newColor={"white"}
          onClick={() => setOptions("schedule")}
          style={options === "schedule" ? { backgroundColor: "#24CDE2" } : {}}
        >
          <ItemCountCon></ItemCountCon>
          <p>Set Medicals Schedule</p>
        </TopSummaryItems>
      </TopSummaryContainer>

      {options === "table" ? <CompantMedicalsTable /> : null}
      {options === "schedule" ? <CompanySchedule /> : null}
    </>
  );
};

export default CompanyMedicals;
