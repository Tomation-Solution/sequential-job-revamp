import { useState } from "react";
import { FlexBox } from "../../globals/styles/FlexBox";
import Button from "../Button/Button";
import CompanyInterviewTab2Comp1 from "./CompanyInterviewTab2Comp/CompanyInterviewTab2Comp1";
import CompanyInterviewTab2Comp2 from "./CompanyInterviewTab2Comp/CompanyInterviewTab2Comp2";

type Props = { jobId: any };

const CompanyInterviewTab2 = ({ jobId }: Props) => {
  const [options, setOptions] = useState<"letter" | "invite">("letter");

  return (
    <>
      <FlexBox justifyContent="flex-end">
        {options === "invite" ? (
          <Button styleType="sec" onClick={() => setOptions("letter")}>
            Back to uploading ivitation letter
          </Button>
        ) : null}
        <Button onClick={() => setOptions("invite")}>
          Proceed to add Panelists
        </Button>
      </FlexBox>

      {options === "letter" ? <CompanyInterviewTab2Comp1 /> : null}
      {options === "invite" ? <CompanyInterviewTab2Comp2 /> : null}
    </>
  );
};

export default CompanyInterviewTab2;
