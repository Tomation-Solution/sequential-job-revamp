import styled from "styled-components";
import { seqLightBlue, seqWhite } from "../../globals/colors";
import { mobile, mobileSm, tablet } from "../../responsive";

export const DashboardContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
  width: 100%;
  overflow-x: hidden;

  ${mobile({
    padding: "10px",
  })}
`;

export const ChartContainer = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  height: 400px;
  flex: 1;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  padding: 20px;
`;

export const ChartAndCardContainer = styled.div`
  display: flex;
  gap: 2em;
  items-align: flex-start;
  margin-top: 20px;

  ${tablet({
    flexDirection: "column",
  })}
`;

export const Container = styled.div`
  flex: 1;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;

  h1 {
    font-weight: 400;
    font-size: 25px;
    margin: 20px 0px;
  }
`;

export const SubCon = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const TopSummaryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;
export const TopSummaryItems = styled.div<{
  newColor: string;
  componentRenderer: any;
  name: string;
}>`
  padding: 10px;
  display: flex;
  flex-direction: column;
  width: calc((100% - 60px) / 4);
  background-color: ${(props) =>
    props.componentRenderer === props.name ? `${seqLightBlue}` : `${seqWhite}`};
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  cursor: pointer;

  ${tablet({
    width: "150px",
  })}
  ${mobile({
    width: "calc((100% - 20px) / 2)",
  })}
    ${mobileSm({
    width: "100%",
  })}

  h1 {
    color: ${(props) =>
      props.newColor ? `${props.newColor}` : `${seqLightBlue}`};
    font-size: 20px;
  }

  p {
    margin: 10px 0px;
  }

  div {
    display: flex;
    align-items: center;
    font-size: 10px;
    color: green;

    section {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: green;
      margin-right: 5px;
    }
  }
`;

export const ItemCountCon = styled.div`
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;
`;
