import React from "react";
import styled from "styled-components";

import Timeline from "../Timeline/Timeline";
import ShowSlots from "../ShowSlots/ShowSlots";

import { data1, data2 } from "../../testData";
const TestData = data1;

const FacultyDashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;
function FacultyDashboard() {
  return (
    <FacultyDashboardWrapper>
      <Timeline style={{ margin: "1.5em 0em 1em 4em", fontSize: "14px" }} />
      <ShowSlots
        style={{ marginBottom: "1em", width: "85%" }}
        weekdayData={Object.keys(TestData.weekdayData).map((key) => ({
          week: key,
          data: TestData.weekdayData[key],
        }))}
      />
    </FacultyDashboardWrapper>
  );
}

export default FacultyDashboard;
