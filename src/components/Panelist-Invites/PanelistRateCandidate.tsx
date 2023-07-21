import { useState } from "react";
import Dropdown from "../../globals/Dropdown/Dropdown";
import { FlexBox } from "../../globals/styles/FlexBox";
import { FormInput } from "../../globals/styles/forms.styles";
import { SetRatingCandidateMoreBtn } from "../Company-Interview-Management/CompanyInterviewManagement.styles";
import { CompanyJobTestManagementContainer } from "../Company-Job-Test-Management/CompanyJobTestManagement.styles";

type Props = {
  jobId: any;
};

function PanelistRateCandidate({ jobId }: Props) {
  const [selectedCandidate, setSelectedCandidate] = useState("");

  return (
    <>
      <CompanyJobTestManagementContainer>
        <FlexBox justifyContent="space-between">
          <h2>Rate Candidates</h2>

          <Dropdown
            disabledOption="Select Candidate"
            options={[{ label: "Select Candidate", value: "" }]}
            onChange={setSelectedCandidate}
            defaultValue={selectedCandidate}
          />
        </FlexBox>

        <main>
          <div className="left">
            <FlexBox justifyContent="space-between">
              <h3>Tomiwa Something</h3>

              <h3>
                <a href="/">See CV</a>
              </h3>
            </FlexBox>

            <SetRatingCandidateMoreBtn>
              <div className="flexed">
                <input type="text" disabled placeholder="words here" />

                <input type="text" disabled placeholder="words here" />
              </div>
            </SetRatingCandidateMoreBtn>
          </div>

          <div className="right">
            <h3>Remark</h3>

            <FormInput
              style={{
                width: "100%",
              }}
            >
              <textarea placeholder="type your remarks here" />
            </FormInput>
          </div>
        </main>
      </CompanyJobTestManagementContainer>
    </>
  );
}

export default PanelistRateCandidate;
