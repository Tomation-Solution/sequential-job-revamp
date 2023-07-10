import styled from "styled-components";
import { seqBlue100, seqLightBlue } from "../../globals/colors";

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 40vh;
  justify-content: center;
  align-items: center;
  gap: 20px;

  h1 {
    font-weight: 500;
    color: ${seqBlue100};
    font-size: 22px;
  }

  p {
    color: ${seqLightBlue};
  }
`;
