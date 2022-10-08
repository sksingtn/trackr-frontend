import React from "react";
import RemoveIcon from "@material-ui/icons/Remove";
import styled from "styled-components";

import TimeCard from "./TimeCard";

const PreviousClassContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  & > div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 2em;

    & > * {
      font-family: "PT Mono", monospace;
      color: #F24333;
    }
  }

  & > span {
    color: rgba(31, 31, 31, 0.6);
  }
`;


function PreviousClass({ slot, loading }) {

  if (loading) {
    return <TimeCard footer="Previous class" color="#F24333" loading={true} />
  }

  if (!loading && slot === null) {
    return <TimeCard footer="Previous class" color="#F24333" empty={true} />
  }

  const { title, startTime, endTime, weekday, secondary, passedSinceSeconds } = slot
  const elapsedHours = Math.floor(passedSinceSeconds / 3600)

  return (
    <TimeCard
      primary={title}
      secondary={secondary}
      footer="Previous class"
      color="#F24333"
      weekday={weekday}
      loading={loading}>
      <PreviousClassContainer>
        <div>
          <span>{startTime}</span>
          <RemoveIcon />
          <span>{endTime}</span>
        </div>

        <span>Ended {elapsedHours}hrs ago</span>
      </PreviousClassContainer>
    </TimeCard>
  );
}

export default PreviousClass;
