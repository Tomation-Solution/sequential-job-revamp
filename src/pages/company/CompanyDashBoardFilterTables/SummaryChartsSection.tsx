import { useState } from "react";
import ChartComponent, {
  ChartComponentProp,
} from "../../../components/ChartComponent";
import { CompanyChartAndInterviewContainer } from "../../../components/Company-Charts/CompanyCharts.styles";
import MedicalsContent from "../../../components/Medicals/MedicalsContent/MedicalsContent";
import { useQuery } from "react-query";
import { getCompanyDashboardSummaryApi } from "../../../redux/api/company/companyjobs.api";
import Preloader from "../../../components/Preloader/Preloader";

function SummaryChartsSection() {
  const [chartData, setChartData] = useState<ChartComponentProp>({
    info: {
      data: [0, 0, 0, 0, 0, 0],
      labels: [
        "Total Candidates",
        "Candidates hired",
        "Total Vacancies",
        "Vacancies Closed",
        "Total Number of CV",
        "Active Jobs",
      ],
      backgroundColor: ["red", "green", "gray", "purple", "pink", "brown"],
    },
  });

  const { isLoading } = useQuery(
    "getCompanyDashboardSummaryApi",
    getCompanyDashboardSummaryApi,
    {
      onSuccess: (data) => {
        setChartData((oldState) => ({
          info: {
            ...oldState.info,
            data: [
              data?.total_applicant || 0,
              data?.applicant_hired || 0,
              data?.total_number_of_job_post || 0,
              data?.closed_jobs || 0,
              data?.total_number_of_cv || 0,
              data?.active_jobs || 0,
            ],
          },
        }));
      },
    }
  );

  return (
    <>
      <Preloader loading={isLoading} />
      <CompanyChartAndInterviewContainer>
        <div className="left">
          <ChartComponent info={chartData} />
        </div>

        <div className="right">
          <br />
          <h2>Upcoming Events</h2>
          <br />
          {/* {data?.map((item, index) => (
                <MedicalsContent
                  style={{ width: "100%" }}
                  key={index}
                  time={`${item.date_picked} ${item.time_picked}`}
                  data={item}
                  testDetails={` You Have Beenx Invite For this job "${item.interview.job_title}"`}
                  testDate={item.date_picked}
                />
              ))} */}
          <MedicalsContent
            style={{ width: "100%" }}
            testDetails={"You Have Beenx Invite For this job intervier"}
            testDate={"2023-10-24"}
            time={`${new Date()}`}
            data={{
              job_seeker: 0,
              interview: {
                job_title: "",
                interview_id: 0,
                company: "",
              },
              id: 0,
              date_picked: "",
              time_picked: "",
            }}
          />
        </div>
      </CompanyChartAndInterviewContainer>
    </>
  );
}

export default SummaryChartsSection;
