import { PiPlusCircleBold } from "react-icons/pi";
import { SetRatingCandidateMoreBtn } from "../CompanyInterviewManagement.styles";
import { CompanyJobTestManagementContainer } from "../../Company-Job-Test-Management/CompanyJobTestManagement.styles";
import { MdCancel } from "react-icons/md";
import { useState } from "react";
import { CompanyCreateInterview } from "../Types";

type Props = {
  state: CompanyCreateInterview;
  onStateChange: React.Dispatch<React.SetStateAction<CompanyCreateInterview>>;
};

function CompanyInterviewTab4Comp1({ state, onStateChange }: Props) {
  const [name, setName] = useState("");
  const [points, setPoints] = useState(0);

  return (
    <>
      <CompanyJobTestManagementContainer>
        <main>
          <div className="left">
            <SetRatingCandidateMoreBtn>
              <div className="flexed">
                <input
                  type="text"
                  placeholder="Set Metric"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  type="number"
                  placeholder="Set Points"
                  value={points}
                  onChange={(e) => setPoints(Number(e.target.value))}
                />
              </div>
              <PiPlusCircleBold
                size={25}
                onClick={() =>
                  onStateChange((oldState) => {
                    const newState = { ...oldState };
                    newState.rating_sheet.push({ name: name, cut_off: points });

                    setName("");
                    setPoints(0);

                    return newState;
                  })
                }
              />
            </SetRatingCandidateMoreBtn>
          </div>

          <div className="right">
            <h2>Preview</h2>

            {state?.rating_sheet?.map((field, index) => (
              <SetRatingCandidateMoreBtn key={index}>
                <div className="flexed">
                  <input type="text" disabled value={field.name} />

                  <input type="text" disabled value={field.cut_off} />
                </div>
                <MdCancel
                  color="red"
                  size={20}
                  onClick={() =>
                    onStateChange((oldState) => {
                      const newState = { ...oldState };
                      newState?.rating_sheet?.splice(index, 1);

                      return newState;
                    })
                  }
                />
              </SetRatingCandidateMoreBtn>
            ))}
          </div>
        </main>
      </CompanyJobTestManagementContainer>
    </>
  );
}

export default CompanyInterviewTab4Comp1;
