import { useQuery } from "react-query";
import { get_scheduled_interviews_invite } from "../../redux/api/company/companyjobs.api";
import CompanyNavBar from "../Company-NavBar/CompanyNavBar";
import { CompanyNavBarItemsContainer } from "../Company-NavBar/CompanyNavBar.styles";
import MedicalsContent from "../Medicals/MedicalsContent/MedicalsContent";
import { CompanyCalendarContainer } from "./CompanyCalendar.styles";
import Preloader from "../Preloader/Preloader";

function CompanyCalendar() {
  // get_scheduled_interviews_invite
  const { data,isLoading } = useQuery(["get_scheduled_interviews_invite"],get_scheduled_interviews_invite);
  return (
    <>
      {/**
       * don't touch the NavBar Component
       */}
      <CompanyNavBar>
        <div></div>
      </CompanyNavBar>
       <Preloader loading={isLoading} />
      <CompanyCalendarContainer>
        <h2 style={{ margin: "20px 0px" }}>Upcoming Events</h2>
        <CompanyNavBarItemsContainer>
          {
            data?.map((item,index)=>(
              <MedicalsContent
                        style={{ width: "100%" }}
                        key={index}
                        time={`${item.date_picked} ${item.time_picked}`}
                        data={item}
                        testDetails={`Scheduled Interview for "${item.interview.job_title}"`}
                        testDate={item.date_picked}
                      />
            ))
          }
        </CompanyNavBarItemsContainer>
      </CompanyCalendarContainer>
    </>
  );
}

export default CompanyCalendar;
