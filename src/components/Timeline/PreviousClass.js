import React from "react";
import TimeCard from "./TimeCard";
import RemoveIcon from "@material-ui/icons/Remove";
import styled from "styled-components";

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
      font-family: "Fredoka One", cursive;
      color: orange;
    }
  }

  & > span {
    color: rgba(31, 31, 31, 0.6);
  }
`;

const getElapsed = (seconds) => {
  return Math.floor(seconds / 60);
};

function PreviousClass() {
  return (
    <TimeCard
      primary="Data Structures"
      secondary="CSE 4th Year(60 Students)"
      footer="Previous class"
      color="orange">
      <PreviousClassContainer>
        <div>
          <span>20:05</span>
          <RemoveIcon />
          <span>21:30</span>
        </div>

        <span>Ended 2hrs ago</span>
      </PreviousClassContainer>
    </TimeCard>
  );
}

export default PreviousClass;
