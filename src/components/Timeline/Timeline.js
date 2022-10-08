import React from "react";
import styled from "styled-components";

import UpcomingClass from "./UpcomingClass";
import OngoingClass from "./OngoingClass";
import PreviousClass from "./PreviousClass";


const TimelineContainerElement = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  & > * {
    margin-right: 2em;
  }
`;

function TimelineContainer(props) {
  const { style, loading, children } = props

  return <TimelineContainerElement style={style}>
    {children.map(elem => React.cloneElement(elem, { ...elem.props, loading }))}
  </TimelineContainerElement>
}


function Timeline({ style, timelineData, loading, reset }) {

  let [previousSlot, ongoingSlot, nextSlot] = [null, null, null];

  //Adding a common field to accomodate faculty & student perspective.
  if (timelineData !== null) {
    for (let key in timelineData) {
      if (timelineData.hasOwnProperty(key)) {
        let slot = timelineData[key];
        if (slot !== null) {
          slot.secondary = slot.batch || `By ${slot.facultyName}`
        }
      }
    }

    previousSlot = timelineData.previousSlot
    ongoingSlot = timelineData.ongoingSlot
    nextSlot = timelineData.nextSlot
  }


  //Making sure that api is not called twice if ongoing-upcoming class has no gap.
  let isEdgeCase = false;

  if (ongoingSlot !== null && nextSlot !== null) {
    const { totalSeconds, elapsedSeconds } = ongoingSlot;
    const { startsInSeconds } = nextSlot;

    if ((totalSeconds - elapsedSeconds - 1) === startsInSeconds) {
      isEdgeCase = true;
    }
  }


  return (
    <TimelineContainer style={style} loading={loading}>
      <PreviousClass slot={previousSlot} />
      <OngoingClass slot={ongoingSlot} reset={reset} />
      <UpcomingClass slot={nextSlot} reset={isEdgeCase ? null : reset} />
    </TimelineContainer>
  );
}

export default Timeline;
