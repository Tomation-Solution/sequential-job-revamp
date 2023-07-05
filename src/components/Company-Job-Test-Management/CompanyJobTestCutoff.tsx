import CutOffMarkSetter from "../../globals/CutOffMarkSetter/CutOffMarkSetter";
import { QuestionSetterCard } from "../../globals/QuestionSetterCard/QuestionSetterCard";
import { TestManagementFormTestQuestionsType } from "../../globals/QuestionSetterCard/types";
import { FlexBox } from "../../globals/styles/FlexBox";
import Button from "../Button/Button";
import { CompanyJobTestManagementContainer } from "./CompanyJobTestManagement.styles";
import { TestCutOffMark } from "./types";

type Props = {
  state: TestCutOffMark;
  onStateChange: React.Dispatch<React.SetStateAction<TestCutOffMark>>;
  allQuestion: TestManagementFormTestQuestionsType;
  setAllQuestion: React.Dispatch<
    React.SetStateAction<TestManagementFormTestQuestionsType>
  >;
};

function CompanyJobTestCutoff({
  state,
  onStateChange,
  allQuestion,
  setAllQuestion,
}: Props) {
  return (
    <CompanyJobTestManagementContainer>
      <main>
        <div className="left">
          <h2>Business Development</h2>
          <h3 style={{ fontWeight: "400" }}>Set Test Cut Off Mark</h3>
          <p style={{ textAlign: "center" }}>
            In other to ease the recruiutment selection process, It is important
            that you set a pre-test that would help sort out qualified
            candidates during application submission.
          </p>

          <h3 style={{ fontWeight: 400 }}>Set Cut Off</h3>

          <CutOffMarkSetter
            title="Suitable min."
            value={state.suitable}
            itemKey="suitable"
            onStateChange={onStateChange}
          />

          <CutOffMarkSetter
            title="Suitable max."
            value={state.end_suitable}
            itemKey="end_suitable"
            onStateChange={onStateChange}
          />

          <CutOffMarkSetter
            title="Partially Suitable min."
            value={state.partially_suitable}
            itemKey="partially_suitable"
            onStateChange={onStateChange}
          />

          <CutOffMarkSetter
            title="Partially Suitable max."
            value={state.end_partially_suitable}
            itemKey="end_partially_suitable"
            onStateChange={onStateChange}
          />

          <CutOffMarkSetter
            title="Not Suitable min."
            value={state.not_suitable}
            itemKey="not_suitable"
            onStateChange={onStateChange}
          />

          <CutOffMarkSetter
            title="Not Suitable max."
            value={state.end_not_suitable}
            itemKey="end_not_suitable"
            onStateChange={onStateChange}
          />
        </div>

        <div className="right">
          <h3>Preview</h3>

          {allQuestion.option_quetion.map((item, index) => {
            const state = {
              ...item,
              question_type: "options_question",
              identifier: index,
            };
            return (
              <QuestionSetterCard
                key={index}
                disableAll={true}
                isPreview={true}
                state={state}
                previewStateChange={setAllQuestion}
              />
            );
          })}

          {allQuestion.fill_in_gap_quetion.map((item, index) => {
            const state = {
              ...item,
              question_type: "fill_in_gap_question",
              option_to_choose_from: [""],
              identifier: index,
            };
            return (
              <QuestionSetterCard
                key={index}
                disableAll={true}
                isPreview={true}
                state={state}
                previewStateChange={setAllQuestion}
              />
            );
          })}
        </div>
      </main>

      <FlexBox justifyContent="flex-end">
        <Button>Save & Continue Later</Button>
      </FlexBox>
    </CompanyJobTestManagementContainer>
  );
}

export default CompanyJobTestCutoff;
