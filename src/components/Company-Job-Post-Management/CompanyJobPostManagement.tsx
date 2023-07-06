import { FlexBox } from "../../globals/styles/FlexBox";
import Button from "../Button/Button";
import CompanyNavBar, {
  CompanyNavBarTab,
} from "../Company-NavBar/CompanyNavBar";
import { CompanyNavBarItemsContainer } from "../Company-NavBar/CompanyNavBar.styles";

import CompanyJobPostTab1 from "./CompanyJobPostTab1";
import { useState } from "react";
import { SavedTabs } from "./types";
import useToast from "../../hooks/useToastify";
import CompanyJobPostTab2 from "./CompanyJobPostTab2";

function CompanyJobPostManagement() {
  const [currentRender, setCurrentRender] = useState(1);
  const [savedTabs, setSavedTabs] = useState<SavedTabs>({
    tab1: false,
    tab2: false,
    tab3: false,
  });

  const { notify } = useToast();

  const btnDisabler = () => {
    if (currentRender === 1 && !savedTabs.tab1) {
      return true;
    } else if (currentRender === 2 && !savedTabs.tab2) {
      return true;
    } else if (currentRender === 3 && !savedTabs.tab3) {
      return true;
    }
  };

  const changeRenderedTab = (type: "incr" | "decr") => {
    if (type === "incr" && currentRender < 3) {
      setCurrentRender(currentRender + 1);
    } else {
      setSavedTabs({ tab1: false, tab2: false, tab3: false });
      setCurrentRender(currentRender - 1);
    }
  };

  return (
    <>
      <CompanyNavBar>
        <CompanyNavBarItemsContainer>
          <CompanyNavBarTab isSelected={currentRender === 1}>
            Job Post Creation
          </CompanyNavBarTab>

          <CompanyNavBarTab isSelected={currentRender === 2}>
            Set CV sorting Questions
          </CompanyNavBarTab>

          <CompanyNavBarTab isSelected={currentRender === 3}>
            Set Cut off Points
          </CompanyNavBarTab>
        </CompanyNavBarItemsContainer>
      </CompanyNavBar>

      <FlexBox justifyContent="space-between">
        {currentRender === 2 ? (
          <Button styleType="sec" onClick={() => changeRenderedTab("decr")}>
            Back to Job Creation
          </Button>
        ) : (
          <p></p>
        )}

        <Button
          // disabled={btnDisabler()}
          onClick={() => {
            if (btnDisabler()) {
              notify("save this job to proceed", "error");
            } else {
              changeRenderedTab("incr");
            }
          }}
        >
          {currentRender === 1 && "Save & Proceed to set CV sorting Question"}
          {currentRender === 2 && "Save & Proceed to CV Cut off point"}
        </Button>
      </FlexBox>

      {currentRender === 1 ? (
        <CompanyJobPostTab1 setSavedTabs={setSavedTabs} />
      ) : null}
      {currentRender === 2 ? (
        <CompanyJobPostTab2 setSavedTabs={setSavedTabs} />
      ) : null}
      {/* {currentRender === 3 ? <CompanyJobPostTab1 /> : null} */}
    </>
  );
}

export default CompanyJobPostManagement;
