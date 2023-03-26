import styled from "styled-components";
import { seqRed, seqWhite } from "../../../globals/colors";

export const MedicalsRedBtn = styled.button`
  padding: 10px 20px;
  background-color: ${seqRed} !important;
  border: none;
  outline: none;
  color: ${seqWhite};
  margin: 20px 0px;
  border-radius: 20px;
  cursor: pointer;
`;

export const MedicalsBtnContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
