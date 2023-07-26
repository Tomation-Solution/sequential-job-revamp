import { JobCardContainer } from "./JobCard.style";
import { FaMoneyBillWave } from "react-icons/fa";
import { IoBagSharp } from "react-icons/io5";
import { BsHeartFill } from "react-icons/bs";
import { JobType } from "../../redux/api/jobs.api";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import numbro from "numbro";

type Prop = {
  job: JobType;
};

const JobCard = ({ job }: Prop): React.ReactElement => {
  const navigate = useNavigate();
  return (
    <JobCardContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>{job.job_title}</h2>
        <BsHeartFill />
      </div>
      <h3>
        <strong>{job.org_name}</strong>
      </h3>
      <p>
        {`
  ${job.country ? `${job.country},` : ""}
  ${job.location}
`}
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: ".7rem 0",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <span>
          <IoBagSharp /> {job?.job_type?.replace("_", " ")?.toUpperCase()}
        </span>

        <span>
          <IoBagSharp />{" "}
          {job?.employement_type?.replace("_", " ")?.toUpperCase() || ""}
        </span>

        {job.salary === "0.00" ? (
          <span>
            <FaMoneyBillWave /> Suitable for Role
          </span>
        ) : (
          <span>
            <FaMoneyBillWave /> {job.money_sign}{" "}
            {numbro(job.salary).format({ thousandSeparated: true })} a year
          </span>
        )}
      </div>
      <Button
        style={{ padding: ".3rem .9rem" }}
        onClick={(e) => {
          e.preventDefault();
          navigate(`/job_detail/${job.id}/`);
        }}
      >
        View
      </Button>
      {/* <p><IoSend/>{' '} Apply from your phone</p> */}
      {/* <p><IoSend/>{' '} Hiring Multiple candidates</p> */}
    </JobCardContainer>
  );
};

export default JobCard;
