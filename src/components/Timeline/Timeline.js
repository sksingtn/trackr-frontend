import React from "react";
import styled from "styled-components";
import RemoveIcon from "@material-ui/icons/Remove";

import TimeCard from "./TimeCard";
import ProgressBar from "./Progress";

const TimelineContainer = styled.div`
  width: 100vw;
  min-height: 50vh;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const PreviousClass = styled.div`
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
      font-family: "Fredoka One", cursive;
      color: orange;
    }
  }

  & > span {
    color: rgba(31, 31, 31, 0.6);
  }
`;

const OngoingClass = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  & > div:nth-child(1) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 2em;
    margin-bottom: 0.2em;

    & > * {
      font-family: "Fredoka One", cursive;
      color: var(--primary);
    }
  }
`;

const UpcomingClass = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  & span:nth-child(1) {
    font-size: 2em;
    color: green;
    font-family: "Fredoka One", cursive;
    letter-spacing: 0.2em;
  }

  & span:nth-child(2) {
    color: rgba(31, 31, 31, 0.6);
  }
`;

function Timeline() {
  return (
    <TimelineContainer>
      <TimeCard
        primary="Data Structures"
        secondary="CSE 4th Year(60 Students)"
        footer="Previous class"
        color="orange">
        <PreviousClass>
          <div className="times">
            <span>20:05</span>
            <RemoveIcon />
            <span>21:30</span>
          </div>

          <span>Ended 2hrs ago</span>
        </PreviousClass>
      </TimeCard>

      <TimeCard
        primary="Distributed System"
        secondary="CSE 3rd Year (45 Students)"
        footer="Ongoing class">
        <OngoingClass>
          <div>
            <span>20:05</span>
            <RemoveIcon />
            <span>21:30</span>
          </div>

          <ProgressBar />
        </OngoingClass>
      </TimeCard>

      <TimeCard
        primary="Machine Learning"
        secondary="CSE 4th Year (60 Students)"
        footer="Upcoming class"
        color="green">
        <UpcomingClass>
          <span>06:01:54</span>
          <span>Starts In</span>
        </UpcomingClass>
      </TimeCard>
    </TimelineContainer>
  );
}

export default Timeline;
