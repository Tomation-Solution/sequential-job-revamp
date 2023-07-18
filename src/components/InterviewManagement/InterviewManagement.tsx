import { useState } from "react";
import { useQuery } from "react-query";
import { get_interviews } from "../../redux/api/jobSeekerInterview.api";
import { getUser } from "../../utils/extraFunction";
import MedicalsContent from "../Medicals/MedicalsContent/MedicalsContent";
import Preloader from "../Preloader/Preloader";
import {
  TestManagementContainer,
  TestManagementSubCon,
} from "../TestManagement/TestManagement.style";
import SelectWithLabel from "../SelectWithLabel/SelectWithLabel";

const InterviewManagement = () => {
  const [filter, setFilter] = useState<"unscheduled" | "scheduled">(
    "unscheduled"
  );
  const user = getUser();
  const { isLoading, data } = useQuery(
    ["get_interviews_for_jobseekers", filter],
    () => get_interviews({ filter_by_scheduled: filter }),
    {
      enabled: user?.user_type === "job_seakers" ? true : false,
    }
  );

  return (
    <TestManagementContainer>
      <h1>Interview Schedule</h1>
      <div style={{ width: "30%" }}>
        <SelectWithLabel
          label=" "
          name="interview filter"
          onChange={(value: any) => {
            console.log(value);
            setFilter(value);
          }}
          options={[
            { label: "unscheduled interviews", value: "unscheduled" },
            { label: "scheduled interviews", value: "scheduled" },
          ]}
        />
      </div>
      <Preloader loading={isLoading} />
      <TestManagementSubCon>
        {data?.map((item, index) => (
          <MedicalsContent
            key={index}
            time={`${item.date_picked} ${item.time_picked}`}
            data={item}
            testDetails={` You Have Beenx Invite For this job "${item.interview.job_title}"`}
            testDate={item.date_picked}
          />
        ))}
      </TestManagementSubCon>
    </TestManagementContainer>
  );
};

export default InterviewManagement;
