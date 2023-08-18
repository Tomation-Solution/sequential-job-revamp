import styled from "styled-components";
import { seqGray, seqWhite } from "../../globals/colors";
import { mobileSm } from "../../responsive";

export const CompanyInterviewManagementContainer = styled.div`
  main {
    background-color: ${seqWhite};
    padding: 20px;
  }
`;

export const SetRatingCandidateMoreBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 20px;

  .flexed {
    display: flex;
    gap: 20px;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
  }

  input[type="time"]::-webkit-calendar-picker-indicator {
    background-color: #fff;
  }

  input[type="date"]::-webkit-calendar-picker-indicator {
    background-color: #fff;
  }

  input {
    outline: none;
    border: none;
    padding: 10px 20px;
    background-color: ${seqGray};
    border-radius: 10px;
    color: white;

    &::placeholder {
      color: white;
    }
  }

  svg {
    cursor: pointer;
  }
`;

export const CompanyInterviewScoreContainer = styled.div`
  .testImage {
    display: flex;
    align-items: center;
    gap: 20px;
    margin: 20px 0px;

    ${mobileSm({
      flexDirection: "column",
    })}
  }

  .testExamples {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;
  }
`;

export const ColoredBar = styled.div<{ width?: string; color?: string }>`
  padding: 20px;
  background-color: ${(props) => (props.color ? props.color : "gray")};
  width: ${(props) => (props.width ? props.width : "300px")};
`;
