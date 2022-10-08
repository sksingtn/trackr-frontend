import React, { useState, useEffect } from "react";
import styled from "styled-components";

import TimeCard from "./TimeCard";

const UpcomingClassContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  & span:nth-child(1) {
    font-size: 2em;
    color: #f24333;
    font-family: "PT Mono", monospace;
    letter-spacing: 0.2em;
  }

  & span:nth-child(2) {
    color: rgba(31, 31, 31, 0.6);
    font-family: "PT Mono", monospace;
  }
`;

const convertTime = (totalSeconds) => {
  if (totalSeconds === null) {
    return [null, null, null];
  }

  const padwithZero = (number) => String(number).padStart(2, "0");

  const hours = padwithZero(Math.floor(totalSeconds / 3600));
  totalSeconds = totalSeconds % 3600;

  const minutes = padwithZero(Math.floor(totalSeconds / 60));
  totalSeconds = totalSeconds % 60;

  const seconds = padwithZero(totalSeconds);

  return [hours, minutes, seconds];
};

function UpcomingClass({ slot, reset, loading }) {

  const { title, weekday, secondary,
    startsInSeconds: startsInSecondsInitial } = slot || {}
  const [startsInSeconds, setStartsInSeconds] = useState(null);

  const [hours, minutes, seconds] = convertTime(startsInSeconds);

  const timer = () =>
    setStartsInSeconds((prev) => {
      if (prev > 0) {
        return prev - 1;
      } else {
        return 0;
      }
    })

  useEffect(() => {

    if (startsInSeconds === 0 && reset !== null) {
      setTimeout(reset, 1200)
    }
  }, [startsInSeconds]);

  useEffect(() => {
    let interval = null;
    if (slot !== null) {
      setStartsInSeconds(startsInSecondsInitial)
      interval = setInterval(timer, 1000);
    }
    return () => clearInterval(interval);
  }, [startsInSecondsInitial]);


  if (loading) {
    return <TimeCard footer="Upcoming class" color="#F24333" loading={true} />
  }

  if (!loading && slot === null) {
    return <TimeCard footer="Upcoming class" color="#F24333" empty={true} />
  }

  return (
    <TimeCard
      primary={title}
      secondary={secondary}
      footer="Upcoming class"
      color="#F24333"
      weekday={weekday}
      loading={loading}>
      <UpcomingClassContainer>
        <span>
          {hours}:{minutes}:{seconds}
        </span>
        <span>Starts In</span>
      </UpcomingClassContainer>
    </TimeCard>
  );
}

export default UpcomingClass;
