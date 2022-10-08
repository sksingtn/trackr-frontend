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

export const MessageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  & > *{
    font-size: 2em;
    margin-left: 0.5em;
    color: var(--primary);
  }
`
