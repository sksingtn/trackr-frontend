import styled from "styled-components";

export const DashboardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
`;

export const BatchDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const TopBar = styled.div`
  display: flex;
  width: calc(100% - 8em);
  margin: 1.5em 4em 2em 4em;
  align-items: center;
  justify-content: space-between;
  margin-right: 4em;
`;
