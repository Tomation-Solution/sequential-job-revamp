import { useState } from "react";
import { CompanyJobTestManagementContainer } from "../../Company-Job-Test-Management/CompanyJobTestManagement.styles";
import { SetRatingCandidateMoreBtn } from "../CompanyInterviewManagement.styles";
import { PiPlusCircleBold } from "react-icons/pi";
import { MdCancel } from "react-icons/md";
import { FlexBox } from "../../../globals/styles/FlexBox";
import { Button } from "@mui/material";

function CompanyInterviewTab2Comp2() {
  const [panelisteEmail, setPanelisteEmail] = useState<string[]>([]);
  const [email, setEmail] = useState("");

  const onSubmitHandler = () => {
    console.log(panelisteEmail);
  };

  return (
    <>
      <CompanyJobTestManagementContainer>
        <main>
          <div className="left">
            <h3>Panelist Invitation</h3>
            <p style={{ alignSelf: "flex-start" }}>Invite member of Panel</p>

            <SetRatingCandidateMoreBtn>
              <div className="flexed">
                <input
                  type="email"
                  placeholder="Please enter an emails"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <PiPlusCircleBold
                size={25}
                onClick={() =>
                  setPanelisteEmail((oldState) => {
                    const newState = [...oldState];
                    newState.push(email || "");

                    setEmail("");

                    return newState;
                  })
                }
              />
            </SetRatingCandidateMoreBtn>
          </div>

          <div className="right">
            <h3>Preview</h3>

            {panelisteEmail?.map((item, index) => (
              <SetRatingCandidateMoreBtn key={index}>
                <div className="flexed">
                  <input
                    type="email"
                    placeholder="Please enter an emails"
                    value={item}
                    disabled
                  />
                </div>

                <MdCancel
                  color="red"
                  size={20}
                  onClick={() =>
                    setPanelisteEmail((oldState) => {
                      const newState = [...oldState];
                      newState.splice(index, 1);

                      return newState;
                    })
                  }
                />
              </SetRatingCandidateMoreBtn>
            ))}
          </div>
        </main>
        <FlexBox justifyContent="flex-end">
          <Button onClick={onSubmitHandler}>Invite All</Button>
        </FlexBox>
      </CompanyJobTestManagementContainer>
    </>
  );
}

export default CompanyInterviewTab2Comp2;
