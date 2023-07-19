import { useState } from "react";
import Dropdown from "../../globals/Dropdown/Dropdown";
import CompanyNavBar, {
  CompanyNavBarTab,
} from "../Company-NavBar/CompanyNavBar";
import { CompanyNavBarItemsContainer } from "../Company-NavBar/CompanyNavBar.styles";
import { CompanyInterviewManagementContainer } from "./CompanyInterviewManagement.styles";
import CompanyInterviewTab1 from "./CompanyInterviewTab1";
import CompanyInterviewTab2 from "./CompanyInterviewTab2";
import CompanyInterviewTab3 from "./CompanyInterviewTab3";
import CompanyInterviewTab4 from "./CompanyInterviewTab4";
import CompanyInterviewTab5 from "./CompanyInterviewTab5";

function CompanyInterviewManagement() {
  const [dropdownOption, setDropdownOption] = useState<string>("");
  const [currentRender, setCurrentRender] = useState(1);

  return (
    <>
      <CompanyNavBar>
        <CompanyNavBarItemsContainer>
          <Dropdown
            disabledValue="create_mode"
            disabledOption="Select a Job"
            options={[{ label: "Filter by Job Posted", value: "none" }]}
            onChange={setDropdownOption}
            defaultValue={dropdownOption}
          />

          <CompanyNavBarTab
            onClick={() => setCurrentRender(1)}
            isSelected={currentRender === 1}
          >
            <p>Set Intreview</p>
          </CompanyNavBarTab>

          <CompanyNavBarTab
            onClick={() => setCurrentRender(2)}
            isSelected={currentRender === 2}
          >
            <p>Panelist Invitation</p>
          </CompanyNavBarTab>

          <CompanyNavBarTab
            onClick={() => setCurrentRender(3)}
            isSelected={currentRender === 3}
          >
            <p>Invite Applicants</p>
          </CompanyNavBarTab>

          <CompanyNavBarTab
            onClick={() => setCurrentRender(4)}
            isSelected={currentRender === 4}
          >
            <p>Set Rating Scale</p>
          </CompanyNavBarTab>

          <CompanyNavBarTab
            onClick={() => setCurrentRender(5)}
            isSelected={currentRender === 5}
          >
            <p>Meeting Link- set up</p>
          </CompanyNavBarTab>
        </CompanyNavBarItemsContainer>
      </CompanyNavBar>

      <CompanyInterviewManagementContainer>
        <main>
          {currentRender === 1 ? (
            <CompanyInterviewTab1 jobId={dropdownOption} />
          ) : null}
          {currentRender === 2 ? (
            <CompanyInterviewTab2 jobId={dropdownOption} />
          ) : null}
          {currentRender === 3 ? (
            <CompanyInterviewTab3 jobId={dropdownOption} />
          ) : null}
          {currentRender === 4 ? (
            <CompanyInterviewTab4 jobId={dropdownOption} />
          ) : null}
          {currentRender === 5 ? (
            <CompanyInterviewTab5 jobId={dropdownOption} />
          ) : null}
        </main>
      </CompanyInterviewManagementContainer>
    </>
  );
}

export default CompanyInterviewManagement;
