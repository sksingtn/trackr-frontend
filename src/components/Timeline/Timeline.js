import React from "react";
import styled from "styled-components";

import UpcomingClass from "./UpcomingClass";
import OngoingClass from "./OngoingClass";
import PreviousClass from "./PreviousClass";

const TimelineContainer = styled.div`
  width: 100vw;
  min-height: 50vh;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

function Timeline() {
  //TODO: Make sure api is not called twice if ongoing-upcoming class has no gap
  const [start, setStart] = React.useState(50);

  const getData = async (caller = null) => {
    if (start !== null) {
      setStart(null);
      await new Promise((r) => setTimeout(r, 2000));
      let newValue = Math.floor(Math.random() * 100);
      setStart(newValue);
    }
  };

  return (
    <TimelineContainer>
      <PreviousClass />
      <OngoingClass elapsedSeconds={start} totalSeconds={100} reset={getData} />
      <UpcomingClass startsIn={start} reset={getData} />
    </TimelineContainer>
  );
}

export default Timeline;
