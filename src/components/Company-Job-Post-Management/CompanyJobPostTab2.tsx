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
import { useMutation } from "react-query";
import { companyFilterQuestions } from "../../redux/api/company/jobs-post-management.api";
import Preloader from "../Preloader/Preloader";
import { convertImageToBase64String } from "../../utils/base64EncodeImage";
import { useJobPostDetailsStore } from "../../zustand-store/jobPost";

type Props = {
  selectedJobId: any;
  setCurrentRender: React.Dispatch<React.SetStateAction<number>>;
  setSavedTabs: React.Dispatch<React.SetStateAction<SavedTabs>>;
};

function CompanyJobPostTab2({
  setSavedTabs,
  setCurrentRender,
  selectedJobId,
}: Props) {
  const [testInstruction, setTestInstruction] = useState<string>("");
  const { notify } = useToast();
  const jobPostDetailsCtrl = useJobPostDetailsStore((state) => state);

  const [allQuestion, setAllQuestion] =
    useState<TestManagementFormTestQuestionsType>({
      fill_in_gap_quetion: [],
      option_quetion: [],
      multi_choice_quetion: [],
    });

  const [testQuestion, setTestQuestion] = useState<QuestionType>({
    question_type: "options_question",
    quetion: "",
    option_to_choose_from: [""],
    image: "",
    answer: "",
    quetion_mark: 0,
  });

  const onAddQuestion = () => {
    const totalNumberOfQuestions =
      allQuestion.fill_in_gap_quetion.length +
      allQuestion.option_quetion.length +
      allQuestion.multi_choice_quetion.length;

    if (totalNumberOfQuestions >= 5) {
      notify("there a maximum of 5 questions allowed", "error");
      return;
    }

    if (testQuestion.question_type === "options_question") {
      const { question_type, ...payload } = testQuestion;
      setAllQuestion((oldState) => {
        const new_options = [...oldState.option_quetion];
        new_options.push(payload);
        return { ...oldState, option_quetion: new_options };
      });

      setTestQuestion({
        question_type: "options_question",
        quetion: "",
        option_to_choose_from: [""],
        image: "",
        answer: "",
        quetion_mark: 0,
      });
    } else if (testQuestion.question_type === "fill_in_gap_question") {
      const { question_type, option_to_choose_from, ...payload } = testQuestion;
      setAllQuestion((oldState) => {
        const new_options = [...oldState.fill_in_gap_quetion];
        new_options.push(payload);
        return { ...oldState, fill_in_gap_quetion: new_options };
      });

      setTestQuestion({
        question_type: "options_question",
        quetion: "",
        option_to_choose_from: [""],
        image: "",
        answer: "",
        quetion_mark: 0,
      });
    }
  };

  const { isLoading, mutate } = useMutation(companyFilterQuestions, {
    onSuccess: (res) => {
      setSavedTabs((oldState) => ({ ...oldState, tab1: true, tab2: true }));

      jobPostDetailsCtrl.setFilterQuestionId(
        res.data[0]?.job_filter_question_id
      );

      setAllQuestion({
        fill_in_gap_quetion: [],
        option_quetion: [],
        multi_choice_quetion: [],
      });

      setTestQuestion({
        question_type: "options_question",
        quetion: "Type Question Here",
        option_to_choose_from: ["Option 1"],
        image: "",
        answer: "Question Answer",
        quetion_mark: 10,
      });

      setTestInstruction("");

      notify(
        "Application sorting questions successfully assigned to Job",
        "success"
      );

      setCurrentRender(3);
    },
    onError: () => {
      notify("Failed to set question to test", "error");
    },
  });

  const onSubmitHandler = async () => {
    if (selectedJobId === "create_mode" || !selectedJobId) {
      notify("please select a job", "error");
      return;
    }

    if (!testInstruction || testInstruction === "") {
      notify("instruction must be provided", "error");
    } else if (
      allQuestion.fill_in_gap_quetion.length <= 0 &&
      allQuestion.option_quetion.length <= 0
    ) {
      notify("atleast one question must be provided", "error");
    } else {
      let { option_quetion, fill_in_gap_quetion, multi_choice_quetion } =
        allQuestion;

      const new_option_quetion = option_quetion.map(async (item) => ({
        ...item,
        image: await convertImageToBase64String(item?.image),
      }));

      const new_fill_in_gap_quetion = fill_in_gap_quetion.map(async (item) => ({
        ...item,
        image: await convertImageToBase64String(item?.image),
      }));

      const new_multi_choice_quetion = multi_choice_quetion.map(
        async (item: any) => ({
          ...item,
          image: await convertImageToBase64String(item?.image),
        })
      );

      const payloadData = {
        title: testInstruction,
        option_quetion: await Promise.all(new_option_quetion),
        fill_in_gap_quetion: await Promise.all(new_fill_in_gap_quetion),
        multi_choice_quetion: await Promise.all(new_multi_choice_quetion),
      };

      mutate({ jobId: selectedJobId, ...payloadData });
    }
  };

  return (
    <>
      <Preloader loading={isLoading} />
      <CompanyJobPostManagementContainer>
        <main>
          <div className="left">
            <h2>Applicant Sorting</h2>

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
          <Button onClick={onSubmitHandler}>Save</Button>
        </FlexBox>
      </CompanyJobPostManagementContainer>
    </>
  );
}

export default CompanyJobPostTab2;
