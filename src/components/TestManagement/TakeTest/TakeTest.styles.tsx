import styled from "styled-components";
import { seqBlue100, seqLightBlue, seqWhite } from "../../../globals/colors";
import { tablet } from "../../../responsive";

export const TakeTestContainer = styled.div`
  padding: 40px;
  display: flex;
  justify-content: center;
  flex-direction: column;

  ${tablet({
    padding: "20px",
    alignItems: "center",
  })}

  h1 {
    font-weight: 400;
    text-align: center;
    font-size: 25px;
    margin: 30px 0px;
  }

  h5 {
    font-weight: 500;
    font-size: 25px;
    color: ${seqBlue100};
    margin: 20px 0px;
  }

  small {
    font-size: 14px;
    margin: 10px 0px;
    color: ${seqBlue100};
  }

  p {
    line-height: 25px;
    color: ${seqBlue100};
    margin: 10px 0px;
    font-weight: 500;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    label {
      input {
        margin-right: 10px;
      }
      display: flex;
      align-items: center;
    }

    section {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 20px 0px;

      button {
        background-color: ${seqLightBlue};
        color: ${seqWhite};
        outline: none;
        border: none;
        padding: 10px 20px;
        border-radius: 10px;
        cursor: pointer;
      }
    }
  }
`;
