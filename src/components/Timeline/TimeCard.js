import React from "react";
import styled from "styled-components";
import { Skeleton } from "@material-ui/lab";

import Tooltip from "../Utils/Tooltip/Tooltip";


const TimeCardContainer = styled.div`
  width: 18em;
  height: 14em;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.4);
  border-radius: 2em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
  --theme: ${(props) => props.color || "var(--primary)"};

  & .content {
    flex: 1;
    width: 100%;
    padding: 1.5em;
    display: flex;
    flex-direction: column;
    position: relative;

    & .weekday{
      position: absolute;
      top: 0.8em;
      right: 1em;
      color: gray;
    }

    & .primary {
      font-size: 1.6em;
      padding: 0.25em 0em;
      color: var(--theme);
    }

    & .secondary {
      color: rgba(31, 31, 31, 0.6);
    }

    & .middle {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  & .empty{
    flex: 1;
    width: 100%;
    padding: 1.5em;
    display: flex;
    align-items: center;
    justify-content: center;

    & > span {
      letter-spacing: 1px;
      font-size: 1.5em;
      color: rgba(52, 56, 107, 0.4);
    }

    & > i {
      font-size: 2em;
      margin-right: 0.5em;
      color: rgba(52, 56, 107, 0.7);
    }
  }

  & .footer {
    width: 100%;
    text-align: center;
    font-size: 1.2em;
    padding: 0.2em 0em;
    background: var(--theme);
    color: white;
    font-weight: 600;
    letter-spacing: 0.05em;

    /*Same height if text is absent*/
    box-sizing: content-box;
    min-height: 1.2em;
  }
`;


function TimeCard({
  className,
  primary,
  secondary,
  footer,
  weekday,
  children,
  color,
  loading,
  empty
}) {


  const emptyMessage = <div className="empty">
    <i class="fas fa-sad-tear"></i>
    <span>Such empty!</span>
  </div>

  const content = <div className="content">
    <span className="weekday">{weekday}</span>
    <span className="primary">
      {loading ? <Skeleton animation="wave" /> :
        <Tooltip maxLength={15}>
          <span>
            {primary}
          </span>
        </Tooltip>}
    </span>

    <span className="secondary">
      {loading ? <Skeleton animation="wave" /> :
        <Tooltip maxLength={25}>
          <span>
            {secondary}
          </span>
        </Tooltip>
      }
    </span>

    <div className="middle">
      {loading ? (
        <Skeleton
          animation="wave"
          style={{ width: "90%", height: "90%" }}
        />
      ) : (
        children
      )}
    </div>
  </div>


  return (
    <TimeCardContainer className={className} color={color}>
      {empty ? emptyMessage : content}
      <span className="footer">{footer}</span>
    </TimeCardContainer>
  );
}

export default TimeCard;
