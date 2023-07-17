import styled from "styled-components";
import { seqBlue100, seqWhite } from "../../globals/colors";
import { tablet } from "../../responsive";

type Props = {
  show?: boolean;
};

export const SideBarContainer = styled.div<Props>`
  padding: 20px;
  display: flex;
  height: 100%;
  /* width: 260px; */
  background-color: ${seqBlue100};
  flex-direction: column;
  word-wrap: break-word;
  color: ${seqWhite};
  position: fixed;
  top: 0;
  left: 0;
  overflow: auto;
  transition: all 0.5s;
  z-index: 20;

  @media (max-width: 768px) {
    transform: ${(props) =>
      props.show ? "translateX(0%)" : "translateX(-100%)"};
  }

  /* ${tablet({
    // transform: "translateX(-100%)",
    display: "none",
  })} */
`;
export const SideLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    width: 100%;
    height: 100px;
    object-fit: contain;
  }
`;
export const SideBtnCon = styled.div`
  display: flex;
  flex-direction: column;
`;
export const SideBtn = styled.span<{ isSelected?: boolean }>`
  padding: 10px 20px;
  margin: 5px 0px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  margin-right: -20px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.5s;

  background-color: ${(props) => (props.isSelected ? `${seqWhite}` : ``)};
  color: ${(props) => (props.isSelected ? `${seqBlue100}` : `${seqWhite}`)};

  &:hover {
    background-color: ${seqWhite};
    color: ${seqBlue100};
    transition: all 0.5s;
  }

  svg {
    margin-right: 20px;
  }
`;
