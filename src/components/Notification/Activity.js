import { Button } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import FiberNewIcon from "@material-ui/icons/FiberNew";

import Dim from "../../baseUI/Dim";
import BasePaginationButtons from "../../baseUI/PaginationButton";

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StatusBar = styled.div`
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
  margin-top: 1em;
  width: 80%;
  align-self: center;
  display: flex;
  flex-direction: column;

  & > * {
    margin-bottom: 0.6em;
  }
`;

const ActivityCardWrapper = styled.div`
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

const PaginationButton = styled(BasePaginationButtons)`
  align-self: flex-end;
  margin-top: 1.5em;
  width: 14em;
  font-size: 1.1em;

  & > button {
    background: #e2e6f2;
  }
`;

const activityData = [
  {
    index: 1,
    text: "You added XYZ as faculty and invited them to create a FACULTY Account with xyz@email.com.You added XYZ as faculty and invited them to create a FACULTY Account with xyz@email.com.",
    created: "21 June 1999",
    read: false,
  },
  {
    index: 2,
    text: "You added XYZ as faculty and invited them to create a FACULTY Account with xyz@email.com.",
    created: "21 June 1999",
    read: false,
  },
  {
    index: 3,
    text: "You changed the invite email from @ to @ to claim the 'XYZ' Faculty Account.",
    created: "21 June 1999",
    read: true,
  },
  {
    index: 4,
    text: "You invited xyz@email.com to claim the 'XYZ' FACULTY Account.",
    created: "21 June 1999",
    read: true,
  },
];

function ActivityCard({ index, text, read, created }) {
  return (
    <ActivityCardWrapper>
      <span className="index">{index}.</span>
      <span className="activity">{text}</span>
      <span className="created">
        <Dim>{created}</Dim>
      </span>
      {!read && <FiberNewIcon />}
    </ActivityCardWrapper>
  );
}

function Activity() {
  return (
    <MainContainer>
      <StatusBar>
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
      </StatusBar>
      <CardContainer>
        {activityData.map((item) => {
          return <ActivityCard {...item} />;
        })}
      </CardContainer>
      <PaginationButton disablePrev={true} />
    </MainContainer>
  );
}

export default Activity;
