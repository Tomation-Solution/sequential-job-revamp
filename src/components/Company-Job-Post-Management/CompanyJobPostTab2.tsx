import React, { useState } from "react";
import { SavedTabs } from "./types";
import {
  QuestionType,
  TestManagementFormTestQuestionsType,
} from "../../globals/QuestionSetterCard/types";
import { CompanyJobPostManagementContainer } from "./CompanyJobPostManagement.styles";
import { FormInput } from "../../globals/styles/forms.styles";
import { QuestionSetterCard } from "../../globals/QuestionSetterCard/QuestionSetterCard";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FlexBox } from "../../globals/styles/FlexBox";
import Button from "../Button/Button";
import useToast from "../../hooks/useToastify";

type Props = {
  setSavedTabs: React.Dispatch<React.SetStateAction<SavedTabs>>;
};

function CompanyJobPostTab2({ setSavedTabs }: Props) {
  const [testInstruction, setTestInstruction] = useState<string>("");
  const { notify } = useToast();

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
      const { question_type, option_to_choose_from, ...payload } = testQuestion;
      setAllQuestion((oldState) => {
        const new_options = [...oldState.fill_in_gap_quetion];
        new_options.push(payload);
        return { ...oldState, fill_in_gap_quetion: new_options };
      });
    }
  };

  const onSubmitHandler = () => {
    if (!testInstruction || testInstruction === "") {
      notify("instruction must be provided", "error");
    }
    if (
      allQuestion.fill_in_gap_quetion.length <= 0 &&
      allQuestion.option_quetion.length <= 0
    ) {
      notify("atleast one question must be provided", "error");
    } else {
      setSavedTabs((oldState) => ({ ...oldState, tab1: true, tab2: true }));
      console.log({ instruction: testInstruction, ...allQuestion });
    }
  };

  return (
    <>
      <CompanyJobPostManagementContainer>
        <main>
          <div className="left">
            <h2>Applicant Sorting </h2>

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
          <Button onClick={onSubmitHandler}>Save & Continue Later</Button>
        </FlexBox>
      </CompanyJobPostManagementContainer>
    </>
  );
}

export default CompanyJobPostTab2;
