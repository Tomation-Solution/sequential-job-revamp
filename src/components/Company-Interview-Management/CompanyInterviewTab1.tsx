import { CompanyMedicalsScheduleContainer } from "../Company-Medicals/CompanyMedicals.styles";
import CompanyMedicalsSelectedItems from "../Company-Medicals/CompanyMedicalsSelectedItems/CompanyMedicalsSelectedItems";
import { CompanyCreateInterview } from "./Types";
import { SetRatingCandidateMoreBtn } from "./CompanyInterviewManagement.styles";
import { PiPlusCircleBold } from "react-icons/pi";
import { useState } from "react";
import { FlexBox } from "../../globals/styles/FlexBox";
import Button from "../Button/Button";

type Props = {
  jobId: any;
  state: CompanyCreateInterview;
  nextPage: React.Dispatch<React.SetStateAction<any>>;
  onStateChange: React.Dispatch<React.SetStateAction<CompanyCreateInterview>>;
};

function CompanyInterviewTab1({
  jobId,
  state,
  nextPage,
  onStateChange,
}: Props) {
  const [dateValue, setDateValue] = useState<string>("");
  const [timeValue, setTimeValue] = useState<string>("");

  return (
    <>
      <FlexBox justifyContent="flex-end">
        <Button onClick={() => nextPage(2)}>Proceed to Panelist</Button>
      </FlexBox>
      <CompanyMedicalsScheduleContainer>
        <div className="examination">
          <h1>Set Medical Examination Schedule</h1>

          <div>
            <p>Set Available date for candidates to pick from: </p>

            <SetRatingCandidateMoreBtn>
              <div className="flexed">
                <input
                  type="date"
                  value={dateValue}
                  onChange={(e) => setDateValue(e.target.value)}
                />
              </div>

              <PiPlusCircleBold
                size={25}
                onClick={() =>
                  onStateChange((oldState) => {
                    const newState = { ...oldState };
                    newState?.list_of_available_dates?.push({
                      available_dates: dateValue,
                    });

                    setDateValue("");

                    return newState;
                  })
                }
              />
            </SetRatingCandidateMoreBtn>
          </div>
          <br />

          <div>
            <p>Set Available Time for candidates to pick from:</p>

            <SetRatingCandidateMoreBtn>
              <div className="flexed">
                <input
                  type="time"
                  value={timeValue}
                  onChange={(e) => setTimeValue(e.target.value)}
                />
              </div>

              <PiPlusCircleBold
                size={25}
                onClick={() =>
                  onStateChange((oldState) => {
                    const newState = { ...oldState };
                    newState?.list_of_available_time?.push({
                      available_time: timeValue,
                    });

                    setTimeValue("");

                    return newState;
                  })
                }
              />
            </SetRatingCandidateMoreBtn>
          </div>
        </div>

        <div className="preview">
          <CompanyMedicalsSelectedItems
            title="Available date for candidates to pick from:"
            keyValue="available_dates"
            data={[...state?.list_of_available_dates]}
          />

          <CompanyMedicalsSelectedItems
            title="Available Time for candidates to pick from:"
            keyValue="available_time"
            data={[...state?.list_of_available_time]}
          />
        </div>
      </CompanyMedicalsScheduleContainer>
    </>
  );
}

export default CompanyInterviewTab1;
