import styled from "styled-components";
import { seqGray, seqWhite } from "../../globals/colors";

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
