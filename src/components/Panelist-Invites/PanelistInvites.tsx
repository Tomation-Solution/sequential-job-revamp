import { useEffect, useState } from "react";
import { CompanyNavBarItemsContainer } from "../Company-NavBar/CompanyNavBar.styles";
import Dropdown from "../../globals/Dropdown/Dropdown";
import PanelistNavBar from "../Panelist-NavBar/PanelistNavBar";
import PanelistCandidateDetailedList from "./PanelistCandidateDetailedList";
import PanelistRateCandidate from "./PanelistRateCandidate";
import { FlexBox } from "../../globals/styles/FlexBox";
import Button from "../Button/Button";
import { getUser } from "../../utils/extraFunction";
import { Navigate } from "react-router-dom";
import useToast from "../../hooks/useToastify";

type Props = {
  allJobsData: any;
  userType: "company" | "panelist";
};

function PanelistInvites({ userType, allJobsData }: Props) {
  const [dropdownOption, setDropdownOption] = useState("");
  const [overview, setOverview] = useState<"isOverview" | "notOverview">(
    "isOverview"
  );
  const [data, setData] = useState<any>([]);
  const currentUser = getUser();
  const { notify } = useToast();

  if (currentUser?.user_type !== userType) {
    notify("unauthorized user", "error");
    return <Navigate to={"/login"} />;
  }

  console.log("allJobsData", allJobsData);

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
          userType={userType}
        />
      ) : null}

      {overview === "notOverview" ? (
        <PanelistRateCandidate jobId={dropdownOption} userType={userType} />
      ) : null}
    </>
  );
}

export default PanelistInvites;
