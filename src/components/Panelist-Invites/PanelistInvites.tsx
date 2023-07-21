import { useState } from "react";
import { CompanyNavBarItemsContainer } from "../Company-NavBar/CompanyNavBar.styles";
import Dropdown from "../../globals/Dropdown/Dropdown";
import PanelistNavBar from "../Panelist-NavBar/PanelistNavBar";
import PanelistCandidateDetailedList from "./PanelistCandidateDetailedList";
import PanelistRateCandidate from "./PanelistRateCandidate";
import { FlexBox } from "../../globals/styles/FlexBox";
import Button from "../Button/Button";

function PanelistInvites() {
  const [dropdownOption, setDropdownOption] = useState("");
  const [overview, setOverview] = useState<"isOverview" | "notOverview">(
    "isOverview"
  );

  return (
    <>
      <PanelistNavBar>
        <CompanyNavBarItemsContainer>
          <Dropdown
            disabledOption="Select a Job"
            options={[{ label: "Filter by Job Posted", value: "none" }]}
            onChange={setDropdownOption}
            defaultValue={dropdownOption}
          />
        </CompanyNavBarItemsContainer>
      </PanelistNavBar>

      <FlexBox justifyContent="flex-end">
        {overview === "notOverview" ? (
          <Button onClick={() => setOverview("isOverview")} styleType="sec">
            Back to Overview
          </Button>
        ) : null}
      </FlexBox>

      {overview === "isOverview" ? (
        <PanelistCandidateDetailedList
          jobId={dropdownOption}
          setOverview={setOverview}
        />
      ) : null}

      {overview === "notOverview" ? (
        <PanelistRateCandidate jobId={dropdownOption} />
      ) : null}
    </>
  );
}

export default PanelistInvites;
