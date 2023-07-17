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
import { JobType, TestCutOffMark } from "./types";
import CompanyJobTestInvitationLetter from "./CompanyJobTestInvitationLetter";
import { useMutation, useQueryClient } from "react-query";
import {
  getAllCompanyJobs,
  postCompanyJobTest,
} from "../../redux/api/company/jobs-test-management.api";
import useToast from "../../hooks/useToastify";
import { useCustomFetcher } from "../../utils/fetcher";
import EmptyState from "../EmptyState/EmptyState";
import moment from "moment";
import { convertImageToBase64String } from "../../utils/base64EncodeImage";
import Preloader from "../Preloader/Preloader";
import { useJobTestDetailsStore } from "../../zustand-store/jobTest";

function CompanyJobTestManagement() {
  const [dropdownOption, setDropdownOption] = useState<string>("");
  const [testInstruction, setTestInstruction] = useState<string>();
  const [currentRender, setCurrentRender] = useState(1);

  const { notify } = useToast();

  const jobTestDetailsCtrl = useJobTestDetailsStore((state) => state);

  const [allQuestion, setAllQuestion] =
    useState<TestManagementFormTestQuestionsType>({
      fill_in_gap_quetion: [],
      option_quetion: [],
      multi_choice_quetion: [],
    });

  const [testQuestion, setTestQuestion] = useState<QuestionType>({
    question_type: "options_question",
    quetion: "Type Question Here",
    option_to_choose_from: ["Option 1"],
    image: "",
    answer: "Question Answer",
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

  const queryClient = useQueryClient();

  const { loadingState, isError, data } = useCustomFetcher<JobType[]>(
    "all-jobs",
    getAllCompanyJobs,
    (data) =>
      data.data
        .filter((item: any) => item.job_variant === "filter_and_test")
        .map((item: any) => ({
          id: item.id,
          job_title: item.job_title,
          created_at: item.created_at,
        }))
  );

  const { isLoading, mutate } = useMutation(postCompanyJobTest, {
    onSuccess: (res) => {
      setTestQuestion({
        question_type: "options_question",
        quetion: "Type Question Here",
        option_to_choose_from: ["Option 1"],
        image: "",
        answer: "Question Answer",
        quetion_mark: 10,
      });

      setAllQuestion({
        fill_in_gap_quetion: [],
        option_quetion: [],
        multi_choice_quetion: [],
      });

      setTestInstruction("");

      jobTestDetailsCtrl.setTestQuestionId(res.data?.job_test_id);

      queryClient.invalidateQueries("all-jobs");

      notify(
        "test questions have been assigned to the selected job",
        "success"
      );
    },
    onError: () => {
      notify("failed to assign tests to job", "error");
    },
  });

  const uploadQuestionHandler = async () => {
    if (!dropdownOption) {
      window.scrollTo(0, 0);
      notify("please select a job from the dropdown highlighted blue", "error");
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

      mutate({ jobId: dropdownOption, payloadData });
    }
  };

  if (loadingState) {
    return <EmptyState header="Fetching all Jobs" />;
  }

  if (isError || data?.length! <= 0 || !data) {
    return (
      <EmptyState
        header="Oops something went wrong"
        subHeader="Failed to fetch all company job, you can try refreshing the page."
      />
    );
  }

  return (
    <>
      <Preloader loading={isLoading} />
      <CompanyNavBar>
        <CompanyNavBarItemsContainer>
          <Dropdown
            disabledOption="Select a Job"
            options={data.map((item) => ({
              label: `${item.job_title} // ${moment(
                new Date(item.created_at)
              ).format("MMM Do YY")}`,
              value: `${item.id}`,
            }))}
            onChange={setDropdownOption}
            defaultValue={dropdownOption}
          />
          <CompanyNavBarTab isSelected={currentRender === 1}>
            <p>Set Test</p>
          </CompanyNavBarTab>
          <CompanyNavBarTab isSelected={currentRender === 2}>
            <p>Set cutoffmark for test</p>
            <p>Preview current test questions</p>
          </CompanyNavBarTab>
          <CompanyNavBarTab isSelected={currentRender === 3}>
            <p>Upload Invitation for Job Test</p>
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
            <Button onClick={uploadQuestionHandler}>Save</Button>
          </FlexBox>
        </CompanyJobTestManagementContainer>
      ) : null}

      {currentRender === 2 ? (
        <CompanyJobTestCutoff jobId={dropdownOption} />
      ) : null}

      {currentRender === 3 ? (
        <CompanyJobTestInvitationLetter jobId={dropdownOption} />
      ) : null}
    </>
  );
}

export default CompanyJobTestManagement;
