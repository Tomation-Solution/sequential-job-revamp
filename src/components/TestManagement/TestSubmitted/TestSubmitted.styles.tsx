import styled from "styled-components";
import { seqBlue100, seqLightBlue } from "../../../globals/colors";
import { tablet } from "../../../responsive";

export const TestSubmittedContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 40px;
  color: ${seqBlue100};

  ${tablet({
    padding: "20px",
  })}

  svg {
    color: ${seqBlue100};
    display: block;
    margin: 20px 0px;
  }

  h1 {
    font-weight: 400;
    margin: 10px 0px;
  }

  p {
    margin: 20px 0px;
    font-weight: 500;
    text-align: center;
  }

  button {
    padding: 10px 20px;
    background-color: ${seqLightBlue};
    outline: none;
    border: none;
    border-radius: 10px;
    margin: 10px 0px;
    font-weight: 500;
    cursor: pointer;
  }
`;
