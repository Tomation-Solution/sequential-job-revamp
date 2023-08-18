import { useNavigate, useParams } from "react-router-dom";
import CompanyNavBar from "../Company-NavBar/CompanyNavBar";
import {
  ColoredBar,
  CompanyInterviewScoreContainer,
} from "./CompanyInterviewManagement.styles";
import { FlexBox } from "../../globals/styles/FlexBox";
import { seqLightBlue } from "../../globals/colors";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useMutation } from "react-query";
import {
  companyInterviewManagementFilterCandidatesByStatus,
  companyInterviewManagementFilterCandidatesByTest,
} from "../../redux/api/company/interview-management.api";
import useToast from "../../hooks/useToastify";
import { useEffect, useState } from "react";
import EmptyState from "../EmptyState/EmptyState";

function CompanyInterviewScore() {
  const { jobID, candidateID, filterType, filterStatus } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>({});

  const { notify } = useToast();

  const { isLoading, mutate, isError } = useMutation(
    companyInterviewManagementFilterCandidatesByStatus,
    {
      onSuccess: (data) => {
        if (data?.data) {
          setData(
            data.data.find(
              (item: any) =>
                item.jobseekers.jobseekers_id === Number(candidateID)
            )
          );
        } else {
          setData({});
        }
      },
      onError: () => {
        notify("Oops something went wrong fetching candidates", "error");
      },
    }
  );

  const {
    isLoading: testFilteredCandidateLoading,
    mutate: testFilteredCandidateMutate,
    isError: testFilteredCandidateError,
  } = useMutation(companyInterviewManagementFilterCandidatesByTest, {
    onSuccess: (data) => {
      if (data?.data) {
        setData(
          data.data.find(
            (item: any) => item.jobseekers.jobseekers_id === Number(candidateID)
          )
        );
      } else {
        setData({});
      }
    },
    onError: (error: any) => {
      if (
        error?.message?.response?.data?.message ===
        "no test assesment for this job"
      ) {
        notify("no test assesments assigned to this job", "error");
      } else {
        notify("Oops something went wrong fetching candidates", "error");
      }
    },
  });

  useEffect(() => {
    const formData = new FormData();

    formData.append("job_id", String(jobID));
    formData.append("status", String(filterStatus));

    if (jobID) {
      if (filterType === "test_score_sorting") {
        testFilteredCandidateMutate(formData);
      } else {
        mutate(formData);
      }
    }
  }, [jobID, filterStatus, filterType, mutate, testFilteredCandidateMutate]);

  const colorByFilterValue = () => {
    if (filterStatus === "not_suitable") {
      return "red";
    } else if (filterStatus === "partially_suitable") {
      return "yellow";
    }
    return "green";
  };

  if (isLoading || testFilteredCandidateLoading) {
    return <EmptyState header="Fetching Job Candidates" />;
  }

  if (isError || testFilteredCandidateError || !data) {
    return (
      <EmptyState
        header="Failed to fetch candidate details"
        subHeader="Oops...something went wrong"
      />
    );
  }

  console.log("data", data);

  return (
    <CompanyInterviewScoreContainer>
      <CompanyNavBar>
        <div
          onClick={() => navigate(-1)}
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            color: `${seqLightBlue}`,
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          <AiOutlineArrowLeft />
          Back
        </div>
      </CompanyNavBar>

      <h1>Test Result</h1>
      <div className="testImage">
        <p>Total Score Obtainable:</p>

        <ColoredBar color="green" />

        <p>
          {filterType === "test_score_sorting"
            ? data?.maximun_test_score
            : data?.maximun_filter_score}
        </p>
      </div>

      <div className="testImage">
        <p>Total Score Obtained:</p>

        <ColoredBar color={colorByFilterValue()} />

        <p>
          {filterType === "test_score_sorting"
            ? data?.test_quetions_score
            : data?.filter_quetions_score}
        </p>
      </div>

      <div className="testImage">
        <h3>Verdict:</h3>
        <p style={{ color: colorByFilterValue() }}>
          {filterStatus?.replace("_", " ")}
        </p>
      </div>

      <hr />

      <FlexBox>
        <div className="testExamples">
          <p>Suitable</p>
          <ColoredBar width="100px" color="green" />
        </div>

        <div className="testExamples">
          <p>Partially Suitable</p>
          <ColoredBar width="100px" color="gold" />
        </div>

        <div className="testExamples">
          <p>Not Suitable</p>
          <ColoredBar width="100px" color="red" />
        </div>
      </FlexBox>
    </CompanyInterviewScoreContainer>
  );
}

export default CompanyInterviewScore;
