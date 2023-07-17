import { useNavigate, useParams } from "react-router-dom";
import EmptyState from "../../../components/EmptyState/EmptyState";
import { getCVDetailsApi } from "../../../redux/api/company/companyjobs.api";
import { useCustomFetcher } from "../../../utils/fetcher";
import { CVSummaryContainer } from "./CVSummary.styles";
import { CVSummaryType } from "./types";
import CompanyNavBar from "../../../components/Company-NavBar/CompanyNavBar";
import { seqLightBlue } from "../../../globals/colors";
import { AiOutlineArrowLeft } from "react-icons/ai";

function CVSummary() {
  const { id: cv_id, role: roleAppliedFor } = useParams();
  const navigate = useNavigate();

  const { loadingState, isError, data } = useCustomFetcher<CVSummaryType>(
    `cv-details-${cv_id}`,
    () => getCVDetailsApi(cv_id),
    (data) => data.data.data
  );

  if (loadingState) {
    return <EmptyState header="Loading CV details" subHeader="please wait" />;
  }

  if (isError || !data || !data) {
    return (
      <EmptyState
        header="Failed to load CV details"
        subHeader="please refresh the page to retry again"
      />
    );
  }

  return (
    <>
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

      <CVSummaryContainer>
        <h1 className="title">
          {data?.last_name} {data?.first_name}
        </h1>
        <h1 className="sub-title">{roleAppliedFor}</h1>
        <p className="text">{data?.personal_statement}</p>
        <br />
        <p className="sub-title">Experience</p>
        {data?.experience.map((item, index) => (
          <div key={index}>
            <p className="sub-title2">{item?.company}</p>
            <p className="text2">
              role: {item?.role} | from {item?.start_year} to {item?.end_year}
            </p>
            <p className="text">{item?.responsibilities}</p>
          </div>
        ))}
        <br />

        <p className="sub-title">Education</p>
        {data?.education.map((item, index) => (
          <div key={index}>
            <p className="sub-title2">
              Institution: {item?.school_name} || Program:{" "}
              {item?.course_of_study}
            </p>
            <p className="text2">
              degree: {item?.degree_type} | {item?.start_year} to{" "}
              {item?.end_year}
            </p>
          </div>
        ))}
        <br />

        <p className="sub-title">Skills</p>
        {data?.certificaton.map((item, index) => (
          <div key={index}>
            <p className="sub-title2">Institution: {item?.certification}</p>
            <p className="text2">
              {item?.issuer} | {item?.start_year}
            </p>
          </div>
        ))}
        <br />
      </CVSummaryContainer>
    </>
  );
}

export default CVSummary;
