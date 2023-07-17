import styled from "styled-components";
import { tablet } from "../../../responsive";

export const SignUpContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const SignUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
`;

export const DecisionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 5em;
  p {
    font-size: 16px;
    font-weight: 500;
    margin: 5px 0px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }

  /* button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    background: #e9fafc;
    border: 1px solid rgba(37, 87, 167, 0.4);
    border-radius: 8px;
    cursor: pointer;
    margin-top: 20px;
    &:hover {
      text-decoration: underline;
      animation: 0.5s ease-in-out;
    }

    svg {
      margin-left: 10px;
      width: 20px;
    }
  } */
  ${tablet({
    p: {
      fontSize: "14px",
    },
  })}
`;

// Registration page stylings

export const Container = styled.div`
  padding: 20px;
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    align-self: flex-start;
    img {
      margin-left: 2em;
      width: 8em;
    }
  }
`;

// verfication page
