import styled from "styled-components";
import { seqLightBlue } from "../../../globals/colors";

export const CompanyJobCandidateSumContainer = styled.div`
  .tabs {
    display: flex;
    gap: 30px;
    align-items: center;
    margin: 20px 0px;
  }
`;

export const CompanyJobCandidateTabs = styled.div<{ isActive?: boolean }>`
  color: ${(props) => (props.isActive ? `${seqLightBlue}` : "black")};
  text-decoration: ${(props) => (props.isActive ? `underline` : ``)};
  cursor: pointer;
`;

export const JobStatusDropdown = styled.select<{ backgroundColor: string }>`
  padding: 10px 20px;
  background-color: ${(props) =>
    props.backgroundColor ? `${props.backgroundColor}` : ""};
  color: ${(props) => (props.backgroundColor ? "white" : "black")};
  outline: none;
  border: none;
  border-radius: 10px;
  width: 100px;
  /* appearance: none; */
`;
