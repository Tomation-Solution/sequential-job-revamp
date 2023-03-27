import styled from "styled-components";
import { seqGreen, seqLightBlue, seqRed, seqWhite } from "../../globals/colors";
import { tablet } from "../../responsive";

export const ContentContainer = styled.div`
  padding: 10px;
  border: 1px solid ${seqLightBlue};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 10px;

  ${tablet({
    width: "100%",
  })}

  button {
    padding: 10px 20px;
    background-color: ${seqGreen};
    border: none;
    outline: none;
    color: ${seqWhite};
    margin: 20px 0px;
    border-radius: 20px;
    cursor: pointer;
  }

  p {
    font-weight: 500;
    margin: 10px 0px;
  }

  h5 {
    font-size: 14px;
    font-weight: 300;
    margin: 10px 0px;
  }
`;

export const RedBtn = styled.button`
  padding: 10px 20px;
  background-color: ${seqRed} !important;
  border: none;
  outline: none;
  color: ${seqWhite};
  margin: 20px 0px;
  border-radius: 20px;
  cursor: pointer;
`;

export const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
