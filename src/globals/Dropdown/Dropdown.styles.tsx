import styled from "styled-components";
import { seqGray, seqLightBlue } from "../colors";

export const DropdownContainer = styled.div`
  position: relative;

  .svg1 {
    position: absolute;
    top: 10px;
    left: 10px;
  }

  .svg2 {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  select {
    cursor: pointer;
    padding: 10px 40px;
    border: 1px solid ${seqLightBlue};
    color: ${seqGray};
    border-radius: 10px;
    width: 200px;
    outline: none;
    appearance: none;
  }
`;
