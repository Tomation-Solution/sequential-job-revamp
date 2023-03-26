import styled from "styled-components";
import { seqGray, seqLightBlue, seqWhite } from "../../../globals/colors";
import { tablet } from "../../../responsive";

export const MedicalInviteContainer = styled.div`
  padding: 40px;

  h5 {
    font-size: 23px;
    margin: 20px 0px 20px 0px;
  }

  li {
    font-size: 18px;
    margin: 10px 0px;
  }
  p {
    line-height: 25px;
    font-size: 18px;
    margin: 20px 0px;
  }

  h1 {
    font-weight: 400;
    font-size: 25px;
    margin: 20px 0px;
  }
  ${tablet({
    padding: "20px",
  })}
`;

export const MedicalsHeader = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0px 40px 0px;
  svg {
    color: ${seqLightBlue};
    margin-right: 10px;
    font-size: 40px;
  }
  h1 {
    font-size: 25px;
    font-weight: 400;
    margin: 20px 0px;
  }
`;

export const MedicalsSlider = styled.div`
  overflow-x: auto;
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 20px 0px;
`;

export const MedicalsSliderItem = styled.div`
  width: 150px;
  flex-shrink: 0;
  height: 100%;
  padding: 20px;
  border-radius: 10px;
  background-color: ${seqGray};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: 16px;
    margin: 10px 0px;
    font-weight: 500;
  }
`;

export const MedicalsBtn = styled.button`
  padding: 10px 20px;
  border-radius: 10px;
  outline: none;
  border: none;
  color: ${seqWhite};
  background-color: ${seqLightBlue};
  margin: 20px 0px;
  cursor: pointer;
`;
