import { useState } from "react";
import { CompanyJobTestManagementContainer } from "../../Company-Job-Test-Management/CompanyJobTestManagement.styles";
import { SetRatingCandidateMoreBtn } from "../CompanyInterviewManagement.styles";
import { PiPlusCircleBold } from "react-icons/pi";
import { MdCancel } from "react-icons/md";
import { CompanyCreateInterview } from "../Types";
import useToast from "../../../hooks/useToastify";

type Props = {
  state: CompanyCreateInterview;
  onStateChange: React.Dispatch<React.SetStateAction<CompanyCreateInterview>>;
};

function CompanyInterviewTab2Comp2({ state, onStateChange }: Props) {
  const [email, setEmail] = useState("");
  const { notify } = useToast();

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
                  onStateChange((oldState) => {
                    if (!email) {
                      notify("please provide an email", "error");
                      return oldState;
                    }

                    const newState = { ...oldState };

                    newState.list_of_email.push({
                      email: email,
                    });

                    setEmail("");

                    return newState;
                  })
                }
              />
            </SetRatingCandidateMoreBtn>
          </div>

          <div className="right">
            <h3>Preview</h3>

            {state?.list_of_email?.map((item, index) => (
              <SetRatingCandidateMoreBtn key={index}>
                <div className="flexed">
                  <input
                    type="email"
                    placeholder="Please enter an emails"
                    value={item.email}
                    disabled
                  />
                </div>

                <MdCancel
                  color="red"
                  size={20}
                  onClick={() =>
                    onStateChange((oldState) => {
                      const newState = { ...oldState };
                      newState.list_of_email.splice(index, 1);

                      return newState;
                    })
                  }
                />
              </SetRatingCandidateMoreBtn>
            ))}
          </div>
        </main>
        {/* <FlexBox justifyContent="flex-end">
          <Button onClick={onSubmitHandler}>Invite All</Button>
        </FlexBox> */}
      </CompanyJobTestManagementContainer>
    </>
  );
}

export default CompanyInterviewTab2Comp2;
