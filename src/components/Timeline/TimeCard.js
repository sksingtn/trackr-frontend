import { Skeleton } from "@material-ui/lab";
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

    & .middle {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
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
  children,
  color,
  loading,
}) {
  return (
    <TimeCardContainer className={className} color={color}>
      <div className="content">
        <span className="primary">
          {loading ? <Skeleton animation="wave" /> : primary}
        </span>

        <span className="secondary">
          {loading ? <Skeleton animation="wave" /> : secondary}
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
      <span className="footer">{!loading && footer}</span>
    </TimeCardContainer>
  );
}

export default TimeCard;
