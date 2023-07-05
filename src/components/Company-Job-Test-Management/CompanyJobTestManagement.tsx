import { useState } from "react";
import Dropdown from "../../globals/Dropdown/Dropdown";
import CompanyNavBar, {
  CompanyNavBarTab,
} from "../Company-NavBar/CompanyNavBar";
import { CompanyJobTestManagementContainer } from "./CompanyJobTestManagement.styles";
import { CompanyNavBarItemsContainer } from "../Company-NavBar/CompanyNavBar.styles";
import { FlexBox } from "../../globals/styles/FlexBox";
import Button from "../Button/Button";
import { QuestionSetterCard } from "../../globals/QuestionSetterCard/QuestionSetterCard";
import { AiOutlinePlusCircle } from "react-icons/ai";

import { FormInput } from "../../globals/styles/forms.styles";
import {
  QuestionType,
  TestManagementFormTestQuestionsType,
} from "../../globals/QuestionSetterCard/types";
import CompanyJobTestCutoff from "./CompanyJobTestCutoff";
import { TestCutOffMark } from "./types";
import CompanyJobTestInvitationLetter from "./CompanyJobTestInvitationLetter";

function CompanyJobTestManagement() {
  const [dropdownOption, setDropdownOption] = useState<string>("foodjob");
  const [testInstruction, setTestInstruction] = useState<string>("");
  const [currentRender, setCurrentRender] = useState(1);
  const [testCutOffMark, setTestCutOffMark] = useState<TestCutOffMark>({
    not_suitable: 0,
    end_not_suitable: 0,

    partially_suitable: 0,
    end_partially_suitable: 0,

    suitable: 0,
    end_suitable: 0,
  });

  console.log(testCutOffMark);

  const [allQuestion, setAllQuestion] =
    useState<TestManagementFormTestQuestionsType>({
      fill_in_gap_quetion: [],
      option_quetion: [],
      multi_choice_quetion: [],
    });

  const [testQuestion, setTestQuestion] = useState<QuestionType>({
    question_type: "options_question",
    quetion: "Are you an employer",
    option_to_choose_from: ["Yes"],
    image: "",
    answer: "Yes",
    quetion_mark: 10,
  });

  const onAddQuestion = () => {
    if (testQuestion.question_type === "options_question") {
      const { question_type, ...payload } = testQuestion;
      setAllQuestion((oldState) => {
        const new_options = [...oldState.option_quetion];
        new_options.push(payload);
        return { ...oldState, option_quetion: new_options };
      });
    } else if (testQuestion.question_type === "fill_in_gap_question") {
      const { question_type, ...payload } = testQuestion;
      setAllQuestion((oldState) => {
        const new_options = [...oldState.fill_in_gap_quetion];
        new_options.push(payload);
        return { ...oldState, fill_in_gap_quetion: new_options };
      });
    }
  };

  // console.log("testQuestion", testQuestion);
  // console.log("allQuestion", allQuestion);

  return (
    <>
      <CompanyNavBar>
        <CompanyNavBarItemsContainer>
          <Dropdown
            disabledOption="Select a Job"
            options={[
              { label: "cookingjob", value: "cookingjob" },
              { label: "sleepingjob", value: "sleepingjob" },
              { label: "foodjob", value: "foodjob" },
            ]}
            onChange={setDropdownOption}
            defaultValue={dropdownOption}
          />
          <CompanyNavBarTab isSelected={currentRender === 1}>
            Set Test
          </CompanyNavBarTab>
          <CompanyNavBarTab isSelected={currentRender === 3}>
            Upload Invitation for Job Test
          </CompanyNavBarTab>
        </CompanyNavBarItemsContainer>
      </CompanyNavBar>

      <FlexBox justifyContent="space-between">
        <p>Select job you want to set test for above</p>

        <div
          style={{
            display: "flex",
            gap: "20px",
          }}
        >
          {currentRender > 1 ? (
            <Button
              styleType="sec"
              onClick={() =>
                setCurrentRender((oldCurrentRender) => oldCurrentRender - 1)
              }
            >
              Back to the questions
            </Button>
          ) : null}

          {currentRender < 3 ? (
            <Button
              onClick={() =>
                setCurrentRender((oldCurrentRender) => oldCurrentRender + 1)
              }
            >
              Continue to set test cut off
            </Button>
          ) : (
            <Button>Proceed to Select Candidates</Button>
          )}
        </div>
      </FlexBox>

      {currentRender === 1 ? (
        <CompanyJobTestManagementContainer>
          <main>
            <div className="left">
              <h2>Business Development</h2>
              <h3 style={{ fontWeight: "400" }}>
                Set Test Questions and Answers
              </h3>
              <p style={{ textAlign: "center" }}>
                In other to ease the recruiutment selection process, It is
                important that you set a pre-test that would help sort out
                qualified candidates during application submission.
              </p>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                }}
              >
                <FormInput>
                  <label style={{ textAlign: "center" }}>Instructions</label>
                  <textarea
                    value={testInstruction}
                    onChange={(e) => setTestInstruction(e.target.value)}
                  />
                </FormInput>
              </div>

              <QuestionSetterCard
                disableAll={false}
                state={testQuestion}
                onStateChange={setTestQuestion}
              />

              <div className="upload-question" onClick={onAddQuestion}>
                <AiOutlinePlusCircle size={30} />
                <p>Or Upload Questions</p>
              </div>
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
      ) : null}

      {currentRender === 2 ? (
        <CompanyJobTestCutoff
          allQuestion={allQuestion}
          setAllQuestion={setAllQuestion}
          state={testCutOffMark}
          onStateChange={setTestCutOffMark}
        />
      ) : null}

      {currentRender === 3 ? <CompanyJobTestInvitationLetter /> : null}
    </>
  );
}

export default CompanyJobTestManagement;
