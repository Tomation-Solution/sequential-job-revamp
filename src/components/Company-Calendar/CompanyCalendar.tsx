import CompanyNavBar from "../Company-NavBar/CompanyNavBar";
import { CompanyNavBarItemsContainer } from "../Company-NavBar/CompanyNavBar.styles";
import MedicalsContent from "../Medicals/MedicalsContent/MedicalsContent";
import { CompanyCalendarContainer } from "./CompanyCalendar.styles";

function CompanyCalendar() {
  return (
    <>
      {/**
       * don't touch the NavBar Component
       */}
      <CompanyNavBar>
        <div></div>
      </CompanyNavBar>

      <CompanyCalendarContainer>
        <h2 style={{ margin: "20px 0px" }}>Upcoming Events</h2>
        <CompanyNavBarItemsContainer>
          {Array.from({ length: 7 }).map((item, index) => (
            <MedicalsContent
              key={index}
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
          ))}
        </CompanyNavBarItemsContainer>
      </CompanyCalendarContainer>
    </>
  );
}

export default CompanyCalendar;
