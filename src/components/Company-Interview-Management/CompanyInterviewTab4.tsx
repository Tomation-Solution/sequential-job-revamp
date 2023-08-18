import { FlexBox } from "../../globals/styles/FlexBox";
import CompanyInterviewTab4Comp1 from "./CompanyInterviewTab4Comps/CompanyInterviewTab4Comp1";
import { CompanyCreateInterview } from "./Types";
import Button from "../Button/Button";
import {
  FormError,
  FormInput,
  FormSuccess,
} from "../../globals/styles/forms.styles";
import * as yup from "yup";

type Props = {
  setInterviewToJobfn: () => void;
  jobId: any;
  state: CompanyCreateInterview;
  onStateChange: React.Dispatch<React.SetStateAction<CompanyCreateInterview>>;
};

function CompanyInterviewTab4({
  jobId,
  setInterviewToJobfn,
  state,
  onStateChange,
}: Props) {
  const schema = yup.string().url().required();

  return (
    <>
      <FlexBox justifyContent="flex-end">
        <Button onClick={setInterviewToJobfn}>Set Interview to Job</Button>
      </FlexBox>

      <FormInput>
        <input
          type="url"
          placeholder="interview link"
          value={state.interview_link}
          onChange={(e) =>
            onStateChange((oldState) => {
              const newState = { ...oldState };
              newState.interview_link = e.target.value;
              return newState;
            })
          }
        />
        {schema.isValidSync(state.interview_link) ? (
          <FormSuccess>good url</FormSuccess>
        ) : (
          <FormError>invalid url</FormError>
        )}
      </FormInput>

      <p>Set Rating Scale</p>

      {/* 
        {options === "candidate" ? (
          <Dropdown
            disabledOption="Select Candidate"
            options={[{ label: "Select Candidate", value: "" }]}
            onChange={setSelectedCandidate}
            defaultValue={selectedCandidate}
          />
        ) : null} */}

      <CompanyInterviewTab4Comp1 state={state} onStateChange={onStateChange} />

      {/* {options === "candidate" ? <CompanyInterviewTab4Comp2 /> : null} */}
    </>
  );
}

export default CompanyInterviewTab4;
