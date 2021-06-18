import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TimeCard from "./TimeCard";
import ProgressBar from "./Progress";
import RemoveIcon from "@material-ui/icons/Remove";

const OngoingClassContainer = styled.div`
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
    font-family: "PT Mono", monospace;

    & > * {
      color: var(--primary);
    }
  }
`;

function OngoingClass(props) {
  //TODO: A popup should appear on 100% completion.
  const {
    elapsedSeconds: elapsedSecondsProp,
    totalSeconds: totalSecondsProp,
    reset,
  } = props;
  const [elapsedSeconds, setElapsedSeconds] = useState(null);

  let percentage = null;
  if (elapsedSeconds) {
    percentage = ((elapsedSeconds / totalSecondsProp) * 100).toFixed(2);
  }

  console.log(percentage);

  useEffect(() => {
    if (elapsedSeconds === totalSecondsProp) {
      reset("Ongoing");
    }
  }, [elapsedSeconds]);

  useEffect(() => {
    setElapsedSeconds(elapsedSecondsProp);

    const interval = setInterval(
      () =>
        setElapsedSeconds((elapsed) => {
          if (elapsed < totalSecondsProp) {
            return elapsed + 1;
          } else {
            clearInterval(interval);
            return elapsed;
          }
        }),
      1000
    );

    return () => clearInterval(interval);
  }, [elapsedSecondsProp]);

  return (
    <TimeCard
      primary="Distributed System"
      secondary="CSE 3rd Year (45 Students)"
      footer="Ongoing class"
      loading={elapsedSecondsProp === null ? true : false}>
      <OngoingClassContainer>
        <div>
          <span>20:05</span>
          <RemoveIcon />
          <span>21:30</span>
        </div>

        <ProgressBar percentage={percentage} />
      </OngoingClassContainer>
    </TimeCard>
  );
}

export default OngoingClass;
