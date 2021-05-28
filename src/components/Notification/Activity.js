import { Button } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import FiberNewIcon from "@material-ui/icons/FiberNew";
import PaginationButtons from "../Manage/PaginationButtons";

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StatusBarContainer = styled.div`
  display: flex;
  width: 100%;

  align-items: center;
  margin-top: 3.3em;
  margin-bottom: 1em;
  color: var(--primary);

  & > h3 {
    font-weight: 400;
    font-size: 1em;
    color: rgba(0, 0, 0, 0.5);
  }

  & > h3:nth-of-type(1) {
    flex: 1;
  }

  & > .MuiButtonBase-root {
    font-size: 0.8em;
    margin-right: 1em;
  }
`;

const BoldButton = styled(Button)`
  & > .MuiButton-label {
    font-weight: 600;
  }
`;

const CardContainer = styled.div`
  margin: auto;
  margin-top: 1em;
  width: 80%;
  align-self: center;
  display: flex;
  flex-direction: column;

  & > * {
    margin-bottom: 0.6em;
  }
`;

const ActivityCard = styled.div`
  width: 100%;
  min-height: 6em;
  border-radius: 10px;
  position: relative;
  background: #e2e6f2;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  &:hover {
    background: rgba(226, 230, 242, 0.8);
  }

  & .index {
    font-weight: 800;
    padding: 1em;
    margin-right: 0.5em;
  }

  & .activity {
    width: 70%;
    font-weight: 400;
    color: rgba(31, 31, 31, 0.8);

    font-size: 1em;
  }

  & .created {
    position: absolute;
    top: 0.5em;
    right: 0.5em;
  }

  & > .MuiSvgIcon-root {
    color: #f50057;
    position: absolute;
    bottom: 0.25em;
    right: 0.25em;
    font-size: 2em;
  }
`;

const Dim = styled.span`
  font-weight: 200;
  color: grey;
  font-size: 0.8em;
`;

const ModifiedPaginationButtons = styled(PaginationButtons)`
  align-self: flex-end;
  font-size: 12px;
  margin-top: 2em;
`;

function Activity() {
  return (
    <MainContainer>
      <StatusBarContainer>
        <h3>All Activities (40)</h3>
        <BoldButton
          variant="contained"
          startIcon={<DoneAllIcon />}
          color="secondary">
          Mark as read (4)
        </BoldButton>

        <h3>
          <span>Page</span> 2/6
        </h3>
      </StatusBarContainer>
      <CardContainer>
        <ActivityCard>
          <span className="index">1.</span>
          <span className="activity">
            You added XYZ as faculty and invited them to create a FACULTY
            Account with xyz@email.com.You added XYZ as faculty and invited them
            to create a FACULTY Account with xyz@email.com.
          </span>
          <span className="created">
            <Dim>28 Nov 1998</Dim>
          </span>
          <FiberNewIcon />
        </ActivityCard>
        <ActivityCard>
          <span className="index">2.</span>
          <span className="activity">
            You added XYZ as faculty and invited them to create a FACULTY
            Account with xyz@email.com.
          </span>
          <span className="created">
            <Dim>21 June 2015</Dim>
          </span>
          <FiberNewIcon />
        </ActivityCard>
        <ActivityCard>
          <span className="index">3.</span>
          <span className="activity">
            You changed the invite email from @ to @ to claim the 'XYZ' Faculty
            Account.
          </span>
          <span className="created">
            <Dim>16 Nov 2015</Dim>
          </span>
        </ActivityCard>
        <ActivityCard>
          <span className="index">4.</span>
          <span className="activity">
            You invited xyz@email.com to claim the 'XYZ' FACULTY Account.
          </span>
          <span className="created">
            <Dim>16 Nov 2012</Dim>
          </span>
        </ActivityCard>
      </CardContainer>
      <ModifiedPaginationButtons />
    </MainContainer>
  );
}

export default Activity;
