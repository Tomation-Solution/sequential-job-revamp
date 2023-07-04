import styled from "styled-components";
import { seqGray, seqLightBlue, seqWhite } from "../colors";

export const QuestionSetterCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  background-color: ${seqGray};
  padding: 20px 10px 10px 10px;
  color: ${seqWhite};
  border-radius: 10px;
  gap: 10px;
  position: relative;

  .trash-bin {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
  }

  .top-banner {
    text-align: center;
    font-weight: 500;
    text-decoration: underline;
  }

  .question-input {
    padding: 10px;
    outline: none;
    border: none;
    background-color: transparent;
    font-size: 18px;
    color: ${seqWhite};
    border-bottom: 1px solid ${seqLightBlue};

    &::placeholder {
      color: ${seqWhite};
    }
  }

  .image-select {
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: space-between;

    .add-image-input {
      input {
        display: none;
      }

      label {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }

    .select-container {
      position: relative;

      .svg1 {
        position: absolute;
        top: 10px;
        left: 5px;
      }

      .svg2 {
        position: absolute;
        top: 10px;
        right: 5px;
      }

      select {
        width: 150px;
        border-radius: 10px;
        background-color: #333333;
        appearance: none;
        outline: none;
        padding: 10px 30px;
        color: ${seqWhite};
      }
    }
  }

  .marks-allocation {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .marks-allocated-input-container {
    position: relative;
    .svg1 {
      position: absolute;
      top: 8px;
      left: 5px;
    }

    .marks-allocated-input {
      width: 100px;
      padding: 5px 30px;
      border-radius: 10px;
      outline: none;
      background-color: #333333;
      border: none;
      color: ${seqWhite};
    }
  }
`;

export const OptionQuestionSetterCardContainer = styled.div`
  margin: 10px 0px;

  .option {
    position: relative;
    display: flex;
    align-items: center;
    margin: 10px 0px;

    .svg1 {
      position: absolute;
      top: 8px;
      left: 5px;
    }

    input {
      border: none;
      padding: 5px;
      border: none;
      outline: none;
      background-color: transparent;
      margin-left: 5px;
      color: ${seqWhite};

      &::placeholder {
        color: ${seqWhite};
      }
    }

    p {
      font-size: 14px;
      margin-left: 5px;
      color: ${seqLightBlue};
      cursor: pointer;
    }
  }
`;

export const FillInGapQuestionSetterCardContainer = styled.div`
  input {
    background-color: transparent;
    color: ${seqWhite};
    border: 2px solid #333;

    &::placeholder {
      color: ${seqWhite};
    }
  }
`;
