import React from "react";
import styled from "styled-components";

const StatsCardContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const StatsCard = styled.div`
  width: 11em;
  margin-right: 1em;
  padding: 0.5em 1em;
  border-radius: 5px;
  color: whitesmoke;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  box-shadow: 0 -1em 2em rgba(12, 31, 100, 0.2), 0 0.3em 1em rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, 0.3);

  background: linear-gradient(
    90deg,
    rgba(37, 37, 122, 1) 24%,
    rgba(47, 124, 140, 1) 100%
  );

  background: rgb(182, 36, 79);

  & > span:nth-child(1) {
    font-size: 1.25em;
  }

  & > span:nth-child(2) {
    font-size: 2.5em;
  }
`;

function Stats({ info, className }) {
  const { totalStudents, totalClasses, totalFaculties } = info;

  return (
    <StatsCardContainer className={className}>
      <StatsCard>
        <span>Total Students</span>
        <span>{totalStudents || 0}</span>
      </StatsCard>

      <StatsCard>
        <span>Total Faculties</span>
        <span>{totalFaculties || 0}</span>
      </StatsCard>
      <StatsCard>
        <span>Total classes</span>
        <span>{totalClasses || 0}</span>
      </StatsCard>
    </StatsCardContainer>
  );
}

export default Stats;
