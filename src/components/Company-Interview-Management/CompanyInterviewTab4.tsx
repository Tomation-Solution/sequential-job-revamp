import { useState } from "react";
import { FlexBox } from "../../globals/styles/FlexBox";
import { CompanyNavBarTab } from "../Company-NavBar/CompanyNavBar";
import { CompanyNavBarItemsContainer } from "../Company-NavBar/CompanyNavBar.styles";
import Dropdown from "../../globals/Dropdown/Dropdown";
import CompanyInterviewTab4Comp1 from "./CompanyInterviewTab4Comps/CompanyInterviewTab4Comp1";
import CompanyInterviewTab4Comp2 from "./CompanyInterviewTab4Comps/CompanyInterviewTab4Comp2";

type Props = {
  jobId: any;
};

function CompanyInterviewTab4({ jobId }: Props) {
  const [options, setOptions] = useState<"rating" | "candidate">("rating");
  const [selectedCandidate, setSelectedCandidate] = useState("");

  return (
    <>
      <FlexBox justifyContent="space-between">
        <CompanyNavBarItemsContainer>
          <CompanyNavBarTab
            onClick={() => setOptions("rating")}
            isSelected={options === "rating"}
          >
            <p>Set Rating Scale</p>
          </CompanyNavBarTab>

          <CompanyNavBarTab
            onClick={() => setOptions("candidate")}
            isSelected={options === "candidate"}
          >
            <p>Rate Candidates</p>
          </CompanyNavBarTab>
        </CompanyNavBarItemsContainer>

        {options === "candidate" ? (
          <Dropdown
            disabledOption="Select Candidate"
            options={[{ label: "Select Candidate", value: "" }]}
            onChange={setSelectedCandidate}
            defaultValue={selectedCandidate}
          />
        ) : null}
      </FlexBox>

      {options === "rating" ? <CompanyInterviewTab4Comp1 /> : null}
      {options === "candidate" ? <CompanyInterviewTab4Comp2 /> : null}
    </>
  );
}

export default CompanyInterviewTab4;
