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

function UpcomingClass({ startsIn, reset }) {
  //TODO: A popup should appear on completion of timer.
  const [totalSeconds, setTotalSeconds] = useState(null);

  const [hours, minutes, seconds] = convertTime(totalSeconds);

  useEffect(() => {
    if (totalSeconds === 0) {
      reset("Upcomng");
    }
  }, [totalSeconds]);

  useEffect(() => {
    setTotalSeconds(startsIn);

    const interval = setInterval(
      () =>
        setTotalSeconds((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            clearInterval(interval);
            return prev;
          }
        }),
      1000
    );

    return () => clearInterval(interval);
  }, [startsIn]);

  return (
    <TimeCard
      primary="Machine Learning"
      secondary="CSE 4th Year (60 Students)"
      footer="Upcoming class"
      color="#F24333"
      loading={totalSeconds === null ? true : false}>
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
