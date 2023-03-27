import React from "react";
import DashboardTopSummary from "./DashboardTopSummary";
import {
  ChartAndCardContainer,
  ChartContainer,
  Container,
  DashboardContainer,
  SubCon,
} from "./DashbordStyles.styles";
import { AxisOptions, Chart } from "react-charts";
import Card from "./Card";
import DashboardTables from "../Tables/DashboardTables/DashboardTables";
import InterviewManagement from "../InterviewManagement/InterviewManagement";

const DashboardComponent = () => {
  type DailyStars = {
    date: Date;
    stars: number;
  };

  type Series = {
    label: string;
    data: DailyStars[];
  };

  const data: Series[] = [
    {
      label: "React Charts",
      data: [
        {
          date: new Date(),
          stars: 202123,
        },
        // ...
      ],
    },
    {
      label: "React Query",
      data: [
        {
          date: new Date(),
          stars: 10234230,
        },
        // ...
      ],
    },
  ];

  const primaryAxis = React.useMemo(
    (): AxisOptions<DailyStars> => ({
      getValue: (datum: any) => datum.date,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    (): AxisOptions<DailyStars>[] => [
      {
        getValue: (datum: any) => datum.stars,
      },
    ],
    []
  );

  const [componentRenderer, setComponentRenderer] = React.useState<any>("home");

  return (
    <DashboardContainer>
      <DashboardTopSummary
        setComponentRenderer={setComponentRenderer}
        componentRenderer={componentRenderer}
      />

      {componentRenderer === "Jobs Applied " && <DashboardTables />}
      {componentRenderer === "Scheduled Interview" && <InterviewManagement />}

      {componentRenderer === "home" && (
        <ChartAndCardContainer>
          <ChartContainer>
            <Chart
              options={{
                data,
                primaryAxis,
                secondaryAxes,
              }}
            />
          </ChartContainer>
          <Container>
            <h1>Upcoming Events</h1>

            <SubCon>
              {[1, 2].map((item) => (
                <Card
                  key={item}
                  time="IN 20 MINUTES"
                  testDetails="Interview with Elijah Papi for the position of Software Engineer"
                  testDate="20 March 2023, 14:15 - 15:30 "
                />
              ))}
            </SubCon>
          </Container>
        </ChartAndCardContainer>
      )}
    </DashboardContainer>
  );
};

export default DashboardComponent;
