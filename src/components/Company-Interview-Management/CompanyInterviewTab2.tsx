import { useState } from "react";
import { FlexBox } from "../../globals/styles/FlexBox";
import Button from "../Button/Button";
import CompanyInterviewTab2Comp1 from "./CompanyInterviewTab2Comp/CompanyInterviewTab2Comp1";
import CompanyInterviewTab2Comp2 from "./CompanyInterviewTab2Comp/CompanyInterviewTab2Comp2";
import { CompanyCreateInterview } from "./Types";
import useToast from "../../hooks/useToastify";

type Props = {
  jobId: any;
  state: CompanyCreateInterview;
  nextPage: React.Dispatch<React.SetStateAction<any>>;
  onStateChange: React.Dispatch<React.SetStateAction<CompanyCreateInterview>>;
};

const CompanyInterviewTab2 = ({
  jobId,
  state,
  nextPage,
  onStateChange,
}: Props) => {
  const [options, setOptions] = useState<"letter" | "invite">("letter");
  const [letterSaved, setLetterSaved] = useState<boolean>(false);
  const { notify } = useToast();

  return (
    <>
      <FlexBox justifyContent="flex-end">
        {options === "invite" ? (
          <>
            <Button styleType="sec" onClick={() => setOptions("letter")}>
              Back to uploading ivitation letter
            </Button>

            <Button
              onClick={() => {
                if (state.list_of_email?.length <= 0) {
                  notify("add atleast one panelist", "error");
                  return;
                }
                nextPage(4);
              }}
            >
              Proceed to Set Rating Scale
            </Button>
          </>
        ) : (
          <Button
            onClick={() => {
              if (!letterSaved) {
                notify("save letter to proceed", "error");
                return;
              }
              setOptions("invite");
            }}
          >
            Proceed to add Panelists
          </Button>
        )}
      </FlexBox>

      {options === "letter" ? (
        <CompanyInterviewTab2Comp1
          state={state}
          onStateChange={onStateChange}
          letterSaved={setLetterSaved}
        />
      ) : null}
      {options === "invite" ? (
        <CompanyInterviewTab2Comp2
          state={state}
          onStateChange={onStateChange}
        />
      ) : null}
    </>
  );
};

export default CompanyInterviewTab2;
