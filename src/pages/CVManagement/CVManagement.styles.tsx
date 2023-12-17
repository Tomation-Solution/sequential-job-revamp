import styled from "styled-components";
import { seqBlue100, seqWhite } from "../../globals/colors";
import { tablet } from "../../responsive";

export const CVManagementHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  font-weight: 500;

  button {
    background-color: ${seqBlue100};
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 500;
    color: ${seqWhite};
    transition: all 0.5s;

    &:hover {
        background-color: ${seqWhite};
        color: ${seqBlue100};
        box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.4);
    }

    span {
        margin-left: 10px;
    }


`;

export const CVManagemntContainer = styled.div`
  width: 90%;
  padding: 0px 20px;

  ${tablet({
    width: "100%",
    padding: "0px ",
  })}
`;

export const CVManagemntPersonalStatement = styled.div`
  margin-top: 3em;

  textarea {
    margin-top: 1em;
    background-color: ${seqWhite};
    width: 100%;
    height: 200px;
    border: none;
    border-radius: 5px;
    padding: 10px;
    font-size: 14px;
    font-weight: 500;
    resize: none;
    outline: none;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.4);
  }
`;

export const CVManagemntFormContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 3em;
`;

export const CVManagemntSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 20px;
  margin-top: 3em;

  h2 {
    align-self: flex-start;
  }

  button {
    border: none;
    outline: none;
  }

  div {
    display: flex;
    align-self: flex-start;
    width: 100%;
    flex-wrap: wrap;
    gap: 20px;
  }
`;
