import React from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import FilterTab from "./FilterTab";
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

const PaginationButton = styled(BasePaginationButtons)`
  align-self: flex-end;
  margin-top: 1.5em;
  width: 14em;
  font-size: 1.1em;

  & > button {
    background: #e2e6f2;
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

const BroadcastCardWrapper = styled.div`
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

  & > .readstatus {
    position: absolute;
    bottom: 0.5em;
    right: 0.5em;
    color: black !important;
  }

  & .content {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    & .heading {
      display: flex;
      align-items: center;
      font-size: 1.2em;
      color: rgb(31, 31, 31);
    }

    & .received {
      display: flex;
      align-items: center;
    }

    & .sentby {
      display: flex;
      align-items: center;
      padding: 0em 0.2em;

      & > *:not(:last-child) {
        margin-right: 0.3em;
      }
      & > img {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        filter: drop-shadow(0 0.125em 0.25em rgba(9, 30, 80, 0.2));
      }

      & span.name {
        text-transform: uppercase;
        font-weight: 600;
        color: var(--primary);
      }

      & span.position {
        font-weight: 200;
      }
    }

    & .text {
      color: rgba(31, 31, 31, 0.8);
      color: grey;
    }
  }
`;

const broadcastData = [
  {
    index: 1,
    type: "RECEIVED",
    read: false,
    senderName: "Shivam Singh",
    senderImg: "https://unsplash.it/1920/1080",
    senderPosition: "Admin",
    receivedCount: 7,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita placeat consequatur vitae nemo atque cupiditate rem assumenda vel?",
    created: "21 June 1999",
  },
  {
    index: 2,
    type: "SENT",
    sentCount: 8,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita placeat consequatur vitae nemo atque cupiditate rem assumenda vel?",
    created: "21 June 1999",
  },
  {
    index: 1,
    type: "RECEIVED",
    read: false,
    senderName: "Shivam Singh",
    senderImg: "https://unsplash.it/1920/1080",
    senderPosition: "Admin",
    receivedCount: 7,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita placeat consequatur vitae nemo atque cupiditate rem assumenda vel?",
    created: "21 June 1999",
  },
  {
    index: 2,
    type: "SENT",
    sentCount: 8,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita placeat consequatur vitae nemo atque cupiditate rem assumenda vel?",
    created: "21 June 1999",
  },
];

function BroadcastCard({
  index,
  type,
  read,
  senderName,
  senderImg,
  senderPosition,
  receivedCount,
  sentCount,
  text,
  created,
}) {
  return (
    <BroadcastCardWrapper>
      <span className="index">{index}.</span>

      <div className="content">
        <div className="heading">
          {type.toLowerCase() === "received" && (
            <div className="received">
              <span>Sent By</span>
              <div className="sentby">
                <img src={senderImg} height="80px" alt="" />
                <span className="name">{senderName}</span>
                <span className="position">
                  <Dim>({senderPosition})</Dim>
                </span>
              </div>
              <span>to you and {receivedCount - 1} others.</span>
            </div>
          )}

          {type.toLowerCase() === "sent" && (
            <div className="sent">
              Sent by YOU to {sentCount} people &nbsp; <Dim>(view)</Dim>
            </div>
          )}
        </div>

        <div className="text">{text}</div>
      </div>

      <span className="created">
        <Dim>{created}</Dim>
      </span>

      {/*TODO:*/}
      {type === "SENT" && (
        <span className="readstatus">
          <Dim>Read by 5/16</Dim>
        </span>
      )}

      {read === false && <FiberNewIcon />}
    </BroadcastCardWrapper>
  );
}

function Broadcast() {
  return (
    <MainContainer>
      <StatusBar>
        <h3>All Broadcasts (40)</h3>
        {/*TODO:*/}
        <FilterTab />
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
        {broadcastData.map((item) => {
          return <BroadcastCard {...item} />;
        })}
      </CardContainer>
      <PaginationButton disablePrev={true} />
    </MainContainer>
  );
}

export default Broadcast;
