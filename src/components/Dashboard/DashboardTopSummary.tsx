import React from "react";
import {
  ItemCountCon,
  TopSummaryContainer,
  TopSummaryItems,
} from "./DashbordStyles.styles";

const data = [
  { color: "red", name: "Jobs Applied " },
  { color: "green", name: "Interviews Attended" },
  { color: "gray", name: "Jobs Test Taken" },
  { color: "purple", name: "Jobs Test Scheduled" },
  { color: "pink", name: "Scheduled Interview" },
  { color: "brown", name: "Job Offers" },
];

const DashboardTopSummary = ({
  setComponentRenderer,
  componentRenderer,
}: any) => {
  return (
    <TopSummaryContainer>
      {data.map((item, index) => (
        <TopSummaryItems
          onClick={() => setComponentRenderer(item.name)}
          newColor={item.color}
          componentRenderer={componentRenderer}
          name={item.name}
          key={index}
        >
          <ItemCountCon>
            <h1>109</h1>

            <div>
              <section></section>
              +3
            </div>
          </ItemCountCon>
          <p>{item.name}</p>
        </TopSummaryItems>
      ))}
    </TopSummaryContainer>
  );
};

export default DashboardTopSummary;
