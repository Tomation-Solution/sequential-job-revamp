import styled from "styled-components";
import { tablet } from "../../responsive";
import { seqLightBlue, seqWhite } from "../../globals/colors";

export const CompanyNavBarTabContainer = styled.div<{ isSelected?: boolean }>`
  cursor: pointer;
  border-bottom: ${(props) =>
    props.isSelected ? `1px solid ${seqLightBlue}` : ``};
  transition: all 0.3s;

  &:hover {
    color: ${seqLightBlue};
  }

  p {
    font-size: 14px;
    font-weight: 600;
  }
`;

export const CompanyNavBarContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: ${seqWhite};
  margin: 10px 0px;

  ${tablet({
    flexDirection: "column-reverse",
  })}

  .left {
  }

  .right {
    display: flex;
    align-items: center;
    gap: 20px;
    svg {
      cursor: pointer;
    }
    p {
      font-size: 14px;
      font-weight: 600;
    }
    img {
      width: 50px;
      height: 50px;
      object-fit: contain;
      border-radius: 50%;
      border: 1px solid #000;
      cursor: pointer;
    }
  }
`;

export const CompanyNavBarItemsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
