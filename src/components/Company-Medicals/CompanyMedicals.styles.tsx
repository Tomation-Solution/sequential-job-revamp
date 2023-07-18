import styled from "styled-components";
import { seqGray, seqWhite } from "../../globals/colors";
import { mobile, tablet } from "../../responsive";

export const CompanyMedicalsScheduleContainer = styled.div`
  padding: 20px;
  background-color: ${seqWhite};
  border-radius: 10px;
  margin-top: 20px;

  display: flex;
  gap: 30px;

  ${tablet({
    flexDirection: "column",
  })}

  h1 {
    font-size: 24px;
    font-weight: 700;
    color: ${seqGray};
    margin: 20px 0px;
    text-align: center;
  }

  .examination {
    width: 40%;
    ${tablet({
      width: "100%",
    })}
  }

  .preview {
    width: 60%;

    ${tablet({
      width: "100%",
    })}
  }
`;

export const CompanyMedicalsBtnContainer = styled.div`
  margin: 30px 0px;

  p {
    color: ${seqGray};
    margin: 10px 0px;
  }

  .halved {
    display: flex;
    gap: 10px;
    align-items: center;

    ${mobile({
      flexDirection: "column",
    })}

    svg {
      font-size: 50px;

      ${mobile({
        fontSize: "20px",
      })}
    }
  }
`;

export const CompanyMedicalsActualBtn = styled.button<{ centered?: boolean }>`
  padding: 15px 20px 15px 40px;
  background-color: ${seqGray};
  outline: none;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
  border: none;
  transition: all 0.3s;
  font-weight: 600;
  border: 1px solid ${seqGray};

  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.centered ? "center" : "")};
  gap: 5px;

  &:hover {
    background-color: ${seqWhite};
    color: ${seqGray};
  }
`;

export const CompanyMedicalsSelectedItemsContainer = styled.div`
  h4 {
    font-size: 18px;
    font-weight: 400;
    color: ${seqGray};
    margin: 20px 0px;
  }
`;

export const CompanyMedicalsSelectedActualItems = styled.div`
  background-color: #d3d3d3;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  word-break: break-all;
  align-items: center;
  justify-content: center;
  color: ${seqGray};
  padding: 10px;
`;
