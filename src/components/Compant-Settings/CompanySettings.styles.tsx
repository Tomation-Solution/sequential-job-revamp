import styled from "styled-components";
import { tablet } from "../../responsive";
import { seqGray, seqGray100, seqWhite } from "../../globals/colors";

export const CompanySettingsContainer = styled.div`
  padding: 20px;
  display: flex;
  gap: 30px;

  ${tablet({
    flexDirection: "column",
  })}

  .navigation {
    width: 30%;
    background-color: ${seqWhite};
    padding: 20px 10px;

    ${tablet({
      width: "100%",
    })}
  }

  .account-info {
    width: 70%;
    background-color: ${seqWhite};
    padding: 20px 10px;

    ${tablet({
      width: "100%",
    })}
  }
`;

export const NavigationItems = styled.div<{
  isActive?: boolean;
  isDanger?: boolean;
}>`
  margin: 10px 0px;

  p {
    padding: 10px 5px;
    cursor: pointer;
    font-weight: ${(props) => (props.isActive ? "800" : "300")};
    color: ${(props) => (props.isDanger ? `red` : `${seqGray}`)};
    transition: all 0.3s;
    &:hover {
      background-color: #d3d3d3;
    }
  }
`;

export const AccountDetailsSummary = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 20px;
  position: relative;

  svg {
    position: absolute;
    cursor: pointer;
    bottom: 30px;
    right: 30px;
  }

  .summary {
    display: flex;
    align-items: center;
    gap: 10px;

    h1 {
      color: ${seqGray100};
    }

    img {
      background-color: #ddd;
      border-radius: 50%;
      width: 100px;
      height: 100px;
      object-fit: contain;
    }
  }
`;

export const AccountDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;

  input {
    border: transparent;
  }

  h1 {
    font-size: 20px;
    font-weight: 400;
    color: ${seqGray};
    margin: 5px 0px;
  }

  .halved-inputs {
    border: 1px solid #ddd;
    padding: 10px;
    display: flex;
    gap: 20px;
    align-items: center;
    flex-wrap: wrap;
  }
`;

export const CompanyDeleteAccountModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  background-color: ${seqWhite};
  padding: 20px;

  h1 {
    font-size: 20px;
    color: red;
  }

  .halved {
    display: flex;
    gap: 20px;
    align-items: center;
    flex-wrap: wrap;
  }
`;
