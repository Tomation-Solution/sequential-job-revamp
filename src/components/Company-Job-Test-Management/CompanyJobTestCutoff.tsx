import { useEffect, useState } from "react";
import CutOffMarkSetter from "../../globals/CutOffMarkSetter/CutOffMarkSetter";
import { QuestionSetterCard } from "../../globals/QuestionSetterCard/QuestionSetterCard";
import { TestManagementFormTestQuestionsType } from "../../globals/QuestionSetterCard/types";
import { FlexBox } from "../../globals/styles/FlexBox";
import {
  getJobTestQuestions,
  postCompanyCutOffMark,
} from "../../redux/api/company/jobs-test-management.api";
import { useCustomFetcher } from "../../utils/fetcher";
import Button from "../Button/Button";
import EmptyState from "../EmptyState/EmptyState";
import { CompanyJobTestManagementContainer } from "./CompanyJobTestManagement.styles";
import { TestCutOffMark } from "./types";
import { useMutation, useQueryClient } from "react-query";
import useToast from "../../hooks/useToastify";
import Preloader from "../Preloader/Preloader";

type Props = {
  jobId: string;
};

function CompanyJobTestCutoff({ jobId }: Props) {
  const [allQuestion, setAllQuestion] =
    useState<TestManagementFormTestQuestionsType>({
      fill_in_gap_quetion: [],
      option_quetion: [],
      multi_choice_quetion: [],
    });

  const [testCutOffMark, setTestCutOffMark] = useState<TestCutOffMark>({
    not_suitable: 0,
    end_not_suitable: 0,

    partially_suitable: 0,
    end_partially_suitable: 0,

    suitable: 0,
    end_suitable: 0,
  });

  const { loadingState, isError, data } = useCustomFetcher<
    TestManagementFormTestQuestionsType & {
      title: string;
      id: number;
    } & TestCutOffMark
  >(`job-questions-${jobId}`, () => getJobTestQuestions(jobId));

  useEffect(() => {
    if (data) {
      setTestCutOffMark({
        not_suitable: data?.not_suitable,
        end_not_suitable: data?.end_not_suitable,

        partially_suitable: data?.partially_suitable,
        end_partially_suitable: data?.end_partially_suitable,

        suitable: data?.suitable,
        end_suitable: data?.end_suitable,
      });

      setAllQuestion({
        fill_in_gap_quetion: data?.fill_in_gap_quetion,
        option_quetion: data?.option_quetion,
        multi_choice_quetion: data?.multi_choice_quetion,
      });
    }
  }, [data]);

  const queryClient = useQueryClient();
  const { notify } = useToast();

  const { isLoading, mutate } = useMutation(postCompanyCutOffMark, {
    onSuccess: () => {
      queryClient.invalidateQueries(`job-questions-${jobId}`);
      notify("successfully updated job cutoff mark", "success");
    },
    onError: () => {
      notify("failed to updated job cutoff mark", "error");
    },
  });

  const setCutOffHandler = () => {
    mutate({
      id: data?.id,
      ...testCutOffMark,
    });
  };

  if (loadingState) {
    return <EmptyState header="Fetching Job Cutoff and Test Questions" />;
  }

  if (isError || !data) {
    return (
      <EmptyState
        header="Oops something went wrong"
        subHeader="Confirm if you selected a job which has test questions"
      />
    );
  }

  return (
    <>
      <Preloader loading={isLoading} />
      <CompanyJobTestManagementContainer>
        <main>
          <div className="left">
            <h2>Business Development</h2>
            <h3 style={{ fontWeight: "400" }}>Set Test Cut Off Mark</h3>
            <p style={{ textAlign: "center" }}>
              In other to ease the recruiutment selection process, It is
              important that you set a pre-test that would help sort out
              qualified candidates during application submission.
            </p>

            <h3 style={{ fontWeight: 400 }}>Set Cut Off</h3>

            <CutOffMarkSetter
              title="Not Suitable min."
              value={testCutOffMark.not_suitable}
              itemKey="not_suitable"
              onStateChange={setTestCutOffMark}
            />

            <CutOffMarkSetter
              title="Not Suitable max."
              value={testCutOffMark.end_not_suitable}
              itemKey="end_not_suitable"
              onStateChange={setTestCutOffMark}
            />

            <CutOffMarkSetter
              title="Partially Suitable min."
              value={testCutOffMark.partially_suitable}
              itemKey="partially_suitable"
              onStateChange={setTestCutOffMark}
            />

            <CutOffMarkSetter
              title="Partially Suitable max."
              value={testCutOffMark.end_partially_suitable}
              itemKey="end_partially_suitable"
              onStateChange={setTestCutOffMark}
            />

            <CutOffMarkSetter
              title="Suitable min."
              value={testCutOffMark.suitable}
              itemKey="suitable"
              onStateChange={setTestCutOffMark}
            />

            <CutOffMarkSetter
              title="Suitable max."
              value={testCutOffMark.end_suitable}
              itemKey="end_suitable"
              onStateChange={setTestCutOffMark}
            />

            <br />
            <Button onClick={setCutOffHandler}>Save & Continue Later</Button>
          </div>

          <div className="right">
            <h3>Preview Job Test Questions</h3>

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
                  // isPreview={true}
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
                  // isPreview={true}
                  state={state}
                  previewStateChange={setAllQuestion}
                />
              );
            })}
          </div>
        </main>
      </CompanyJobTestManagementContainer>
    </>
  );
}

export default CompanyJobTestCutoff;
