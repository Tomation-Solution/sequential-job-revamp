import { FlexBox } from "../../../globals/styles/FlexBox";
import { FormInput } from "../../../globals/styles/forms.styles";
import { CompanyJobTestManagementContainer } from "../../Company-Job-Test-Management/CompanyJobTestManagement.styles";
import { SetRatingCandidateMoreBtn } from "../CompanyInterviewManagement.styles";

function CompanyInterviewTab4Comp2() {
  return (
    <CompanyJobTestManagementContainer>
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
  );
}

export default CompanyInterviewTab4Comp2;
