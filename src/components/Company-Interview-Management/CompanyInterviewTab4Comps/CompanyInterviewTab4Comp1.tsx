import { PiPlusCircleBold } from "react-icons/pi";
import { SetRatingCandidateMoreBtn } from "../CompanyInterviewManagement.styles";
import { CompanyJobTestManagementContainer } from "../../Company-Job-Test-Management/CompanyJobTestManagement.styles";
import { MdCancel } from "react-icons/md";
import Button from "../../Button/Button";
import { useState } from "react";

type CompanyInterviewTab4Comp1Type = {
  name: string;
  value: number;
};

function CompanyInterviewTab4Comp1() {
  const [metrics, setMetrics] = useState<CompanyInterviewTab4Comp1Type[]>([]);

  const [name, setName] = useState("");
  const [points, setPoints] = useState(0);

  const onSubmitHandler = () => {
    console.log(metrics);
  };

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
                  setMetrics((oldState) => {
                    const newState = [...oldState];
                    newState.push({ name: name, value: points });

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

            {metrics?.map((field, index) => (
              <SetRatingCandidateMoreBtn key={index}>
                <div className="flexed">
                  <input type="text" disabled value={field.name} />

                  <input type="text" disabled value={field.value} />
                </div>
                <MdCancel
                  color="red"
                  size={20}
                  onClick={() =>
                    setMetrics((oldState) => {
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
      </CompanyJobTestManagementContainer>
      <Button onClick={onSubmitHandler}>Save</Button>
    </>
  );
}

export default CompanyInterviewTab4Comp1;
