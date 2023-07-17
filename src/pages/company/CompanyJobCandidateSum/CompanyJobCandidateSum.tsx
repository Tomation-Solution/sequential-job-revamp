import { useNavigate, useParams } from "react-router-dom";
import {
  CompanyJobCandidateSumContainer,
  CompanyJobCandidateTabs,
  JobStatusDropdown,
} from "./CompanyJobCandidateSum.styles";
import { useCustomFetcher } from "../../../utils/fetcher";
import EmptyState from "../../../components/EmptyState/EmptyState";
import CompanyNavBar from "../../../components/Company-NavBar/CompanyNavBar";
import { seqLightBlue } from "../../../globals/colors";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useState } from "react";
import moment from "moment";
import { companyGetJob } from "../../../redux/api/company/jobs-post-management.api";
import { JobType } from "../../../components/Company-Job-Test-Management/types";
import JobDetailsSummary from "./JobDetailsSummary/JobDetailsSummary";
import { useMutation, useQueryClient } from "react-query";
import {
  getCompanyTotalApplicantApi,
  switchJobOn,
} from "../../../redux/api/company/companyjobs.api";
import useToast from "../../../hooks/useToastify";
import Preloader from "../../../components/Preloader/Preloader";
import JobCandidateSummary from "./JobDetailsSummary/JobCandidateSummary";

function CompanyJobCandidateSum() {
  const [options, setOptions] = useState<"job" | "candidate">("job");

  const { jobId } = useParams();

  const { loadingState, isError, data } = useCustomFetcher<JobType>(
    `job-details-${jobId}`,
    () => companyGetJob(jobId)
  );

  const jubCandidateSummaryQuery = useCustomFetcher<any>(
    `job-details-applicant-${jobId}`,
    () => getCompanyTotalApplicantApi(jobId),
    (data) => data
  );

  const navigate = useNavigate();

  const { notify } = useToast();

  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(switchJobOn, {
    onSuccess: () => {
      queryClient.invalidateQueries(`job-details-${jobId}`);
      notify("status updated", "success");
    },
    onError: () => {
      notify("status not updated", "error");
    },
  });

  const updateActiveStatus = (data: "true" | "false" | string) => {
    const formData = new FormData();
    formData.append("job_id", jobId as string);

    if (data === "true") {
      formData.append("switch", "True");
    } else {
      formData.append("switch", "False");
    }

    mutate(formData);
  };

  if (loadingState) {
    return <EmptyState header="Loading Job Details" />;
  }

  if (isError || !data) {
    return <EmptyState header="Oops could not fetch necessary data" />;
  }

  return (
    <>
      <Preloader loading={isLoading} />
      <CompanyJobCandidateSumContainer>
        <CompanyNavBar>
          <div
            onClick={() => navigate(`/company/dashboard/`)}
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

        <section>
          <div className="tabs">
            <h1>{data?.job_title}</h1>
            <JobStatusDropdown
              backgroundColor={data?.is_active ? "green" : "red"}
              defaultValue={data?.is_active ? "true" : "false"}
              onChange={(e) => updateActiveStatus(e.target.value)}
            >
              <option value={"true"}>Live</option>
              <option value={"false"}>Closed</option>
            </JobStatusDropdown>
          </div>

          <div className="tabs">
            {jubCandidateSummaryQuery?.data?.length || 0} candidates |{" "}
            {moment(new Date(data?.created_at)).format(
              "MMMM Do YYYY, h:mm:ss a"
            )}{" "}
            | {data?.employement_type.replace("_", " ")}
          </div>

          <div className="tabs">
            <CompanyJobCandidateTabs
              onClick={() => setOptions("job")}
              isActive={options === "job"}
            >
              Details
            </CompanyJobCandidateTabs>
            <CompanyJobCandidateTabs
              onClick={() => setOptions("candidate")}
              isActive={options === "candidate"}
            >
              Candidates
            </CompanyJobCandidateTabs>
          </div>

          <br />

          {options === "job" ? <JobDetailsSummary data={data} /> : null}
          {options === "candidate" ? (
            <JobCandidateSummary
              loadingState={jubCandidateSummaryQuery.loadingState}
              isError={jubCandidateSummaryQuery.isError}
              data={jubCandidateSummaryQuery.data}
            />
          ) : null}
        </section>
      </CompanyJobCandidateSumContainer>
    </>
  );
}

export default CompanyJobCandidateSum;
