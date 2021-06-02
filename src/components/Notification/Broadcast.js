import { Button } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import FilterTab from "./FilterTab";
import FiberNewIcon from "@material-ui/icons/FiberNew";
import PaginationButtons from "../Manage/PaginationButtons";

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Dim = styled.span`
  font-weight: 200;
  color: grey;
  font-size: 0.8em;
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

const BroadcastCard = styled.div`
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

  & .broadcast {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    & .broadcast__heading {
      display: flex;
      align-items: center;
      font-size: 1.2em;
      color: rgb(31, 31, 31);
    }

    & .broadcast__content {
      color: rgba(31, 31, 31, 0.8);
      color: grey;
    }
  }
`;

const SenderContainer = styled.div`
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
  }

  & span.name {
    text-transform: uppercase;
    font-weight: 600;
    color: var(--primary);
  }

  & span.position {
    font-weight: 200;
  }
`;

function Sender({ className, name, img, position }) {
  return (
    <SenderContainer className={className}>
      <img src={img} height="80px" alt="" />
      <span className="name">{name}</span>
      <span className="position">
        <Dim>({position})</Dim>
      </span>
    </SenderContainer>
  );
}

const ModifiedPaginationButtons = styled(PaginationButtons)`
  align-self: flex-end;
  font-size: 12px;
  margin-top: 2em;
`;

function Broadcast() {
  return (
    <MainContainer>
      <StatusBarContainer>
        <h3>All Broadcasts (40)</h3>
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
      </StatusBarContainer>

      <CardContainer>
        <BroadcastCard>
          <span className="index">1.</span>

          <div className="broadcast">
            <div className="broadcast__heading">
              <span>Sent By</span>
              <Sender
                img="http://unsplash.it/1000/1505"
                name="Shivam Singh"
                position="Admin"
              />
              <span>to you and 6 others.</span>
            </div>

            <div className="broadcast__content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
              placeat consequatur vitae nemo atque cupiditate rem assumenda vel?
            </div>
          </div>

          <span className="created">
            <Dim>28 Nov 1998</Dim>
          </span>
          <FiberNewIcon />
        </BroadcastCard>

        <BroadcastCard>
          <span className="index">2.</span>

          <div className="broadcast">
            <div className="broadcast__heading">
              Sent by YOU to 16 people &nbsp; <Dim>(view)</Dim>
            </div>

            <div className="broadcast__content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
              dolores amet, vel eligendi ducimus, facilis repudiandae sequi
              laboriosam aliquid odio libero enim incidunt, ex veniam.
            </div>
          </div>

          <span className="created">
            <Dim>28 Nov 1998</Dim>
          </span>

          <span className="readstatus">
            <Dim>Read by 5/16</Dim>
          </span>
        </BroadcastCard>

        <BroadcastCard>
          <span className="index">1.</span>

          <div className="broadcast">
            <div className="broadcast__heading">
              <span>Sent By</span>
              <Sender
                img="http://unsplash.it/1000/1505"
                name="Shivam Singh"
                position="Admin"
              />
              <span>to you and 6 others.</span>
            </div>

            <div className="broadcast__content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
              placeat consequatur vitae nemo atque cupiditate rem assumenda vel?
            </div>
          </div>

          <span className="created">
            <Dim>28 Nov 1998</Dim>
          </span>
          <FiberNewIcon />
        </BroadcastCard>

        <BroadcastCard>
          <span className="index">2.</span>

          <div className="broadcast">
            <div className="broadcast__heading">
              Sent by YOU to 16 people &nbsp; <Dim>(view)</Dim>
            </div>

            <div className="broadcast__content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
              dolores amet, vel eligendi ducimus, facilis repudiandae sequi
              laboriosam aliquid odio libero enim incidunt, ex veniam.
            </div>
          </div>

          <span className="created">
            <Dim>28 Nov 1998</Dim>
          </span>

          <span className="readstatus">
            <Dim>Read by 5/16</Dim>
          </span>
        </BroadcastCard>
      </CardContainer>
      <ModifiedPaginationButtons />
    </MainContainer>
  );
}

export default Broadcast;