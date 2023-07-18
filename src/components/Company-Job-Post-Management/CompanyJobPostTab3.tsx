import { useEffect, useState } from "react";
import CutOffMarkSetter from "../../globals/CutOffMarkSetter/CutOffMarkSetter";
import { CompanyJobPostManagementContainer } from "./CompanyJobPostManagement.styles";
import { TestCutOffMark } from "../Company-Job-Test-Management/types";
import {
  companySetCutOffDetails,
  getJobCVSortingQuestions,
} from "../../redux/api/company/jobs-post-management.api";
import Button from "../Button/Button";
import { useMutation, useQueryClient } from "react-query";
import useToast from "../../hooks/useToastify";
import Preloader from "../Preloader/Preloader";
import { QuestionSetterCard } from "../../globals/QuestionSetterCard/QuestionSetterCard";
import { useCustomFetcher } from "../../utils/fetcher";
import { TestManagementFormTestQuestionsType } from "../../globals/QuestionSetterCard/types";
import EmptyState from "../EmptyState/EmptyState";

type Props = {
  selectedJobId: any;
};

function CompanyJobPostTab3({ selectedJobId }: Props) {
  const [testCutOffMark, setTestCutOffMark] = useState<TestCutOffMark>({
    not_suitable: 0,
    end_not_suitable: 0,

    partially_suitable: 0,
    end_partially_suitable: 0,

    suitable: 0,
    end_suitable: 0,
  });

  const [allQuestion, setAllQuestion] =
    useState<TestManagementFormTestQuestionsType>({
      fill_in_gap_quetion: [],
      option_quetion: [],
      multi_choice_quetion: [],
    });

  const { notify } = useToast();

  const { loadingState, isError, data } = useCustomFetcher<
    TestManagementFormTestQuestionsType & {
      title: string;
      id: number;
    } & TestCutOffMark
  >(`job-filter-questions-${selectedJobId}`, () =>
    getJobCVSortingQuestions(selectedJobId)
  );

  useEffect(() => {
    if (data) {
      setTestCutOffMark({
        not_suitable: data?.not_suitable || 0,
        end_not_suitable: data?.end_not_suitable || 0,

        partially_suitable: data?.partially_suitable || 0,
        end_partially_suitable: data?.end_partially_suitable || 0,

        suitable: data?.suitable || 0,
        end_suitable: data?.end_suitable || 0,
      });

      setAllQuestion({
        fill_in_gap_quetion: data?.fill_in_gap_quetion || [],
        option_quetion: data?.option_quetion || [],
        multi_choice_quetion: data?.multi_choice_quetion || [],
      });
    }
  }, [data]);

  const queryClient = useQueryClient();

  const setCutOffMutation = useMutation(companySetCutOffDetails, {
    onSuccess: () => {
      queryClient.invalidateQueries(`job-filter-questions-${selectedJobId}`);
      notify("job application cutoff marks set successfully", "success");
    },
    onError: () => {
      notify("failed to set job cutoff marks", "error");
    },
  });

  const setCutOffHandler = () => {
    if (selectedJobId === "create_mode" || !selectedJobId) {
      notify("please select a job", "error");
      return;
    }

    setCutOffMutation.mutate({
      id: data?.id,
      ...testCutOffMark,
    });
  };

  if (loadingState) {
    return (
      <EmptyState header="Fetching Job Cutoff and CV Filtering Questions" />
    );
  }

  if (isError || !data) {
    return (
      <EmptyState
        header="Oops something went wrong"
        subHeader="Confirm if you selected a job which has cv filtering questions"
      />
    );
  }

  return (
    <>
      <Preloader loading={setCutOffMutation.isLoading} />
      <CompanyJobPostManagementContainer>
        <main>
          <div className="left">
            <h1>Applicant Sorting </h1>

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

            <Button onClick={setCutOffHandler}>Set Test CutOff</Button>
          </div>

          <div className="right">
            <h1>Preview CV Sorting Questions</h1>

            <div className="right">
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
          </div>
        </main>
      </CompanyJobPostManagementContainer>
    </>
  );
}

export default CompanyJobPostTab3;
