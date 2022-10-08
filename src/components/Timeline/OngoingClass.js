import React, { useState, useEffect } from "react";
import styled from "styled-components";
import RemoveIcon from "@material-ui/icons/Remove";

import ProgressBar from "./Progress";
import TimeCard from "./TimeCard";

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

function OngoingClass({ slot, loading, reset }) {

  const { title, startTime, endTime, totalSeconds,
    secondary, elapsedSeconds: elapsedSecondsInitial } = slot || {}
  const [elapsedSeconds, setElapsedSeconds] = useState(null);

  const timer = () =>
    setElapsedSeconds((elapsed) => {
      if (elapsed < totalSeconds) {
        return elapsed + 1;
      } else {
        return elapsed;
      }
    })

  useEffect(() => {
    if (elapsedSeconds !== null && elapsedSeconds === totalSeconds) {
      setTimeout(reset, 1200)
    }
  }, [elapsedSeconds]);

  useEffect(() => {
    let interval = null;
    if (slot !== null) {
      setElapsedSeconds(elapsedSecondsInitial)
      interval = setInterval(timer, 1000);
    }
    return () => clearInterval(interval);
  }, [elapsedSecondsInitial]);

  if (loading) {
    return <TimeCard footer="Ongoing class" loading={true} />
  }

  if (!loading && slot === null) {
    return <TimeCard footer="Ongoing class" empty={true} />
  }

  let percentage = null;
  if (elapsedSeconds) {
    percentage = ((elapsedSeconds / totalSeconds) * 100).toFixed(2);
  }

  return (
    <TimeCard
      primary={title}
      secondary={secondary}
      footer="Ongoing class"
      loading={loading}>
      <OngoingClassContainer>
        <div>
          <span>{startTime}</span>
          <RemoveIcon />
          <span>{endTime}</span>
        </div>

        <ProgressBar percentage={percentage} />
      </OngoingClassContainer>
    </TimeCard>
  );
}

export default OngoingClass;
