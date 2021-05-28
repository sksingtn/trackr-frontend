import React from "react";
import styled from "styled-components";

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

    & .primary {
      font-size: 1.6em;
      padding: 0.25em 0em;
      color: var(--theme);
    }

    & .secondary {
      color: rgba(31, 31, 31, 0.6);
    }

    & .time {
      flex: 1;
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
  }
`;

function TimeCard({ className, primary, secondary, footer, children, color }) {
  return (
    <TimeCardContainer className={className} color={color}>
      <div className="content">
        <span className="primary">{primary}</span>
        <span className="secondary">{secondary}</span>
        <div className="time">{children}</div>
      </div>
      <span className="footer">{footer}</span>
    </TimeCardContainer>
  );
}

export default TimeCard;
