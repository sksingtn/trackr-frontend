import React from "react";
import styled from "styled-components";

const PaginationButtonWrapper = styled.div`
  display: flex;
  border-radius: 1.25em;
  overflow: hidden;

  & > button {
    min-width: 6.1em;
    flex: 1;
    font-size: inherit;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0.3em 0.6em;
    outline: none;
    border: none;
    background: whitesmoke;
    color: var(--primary);
    cursor: pointer;
    transition: opacity 0.1s ease;

    &:nth-child(1) {
      border-right: 1px solid grey;
    }

    &:hover {
      background: var(--primary);
      color: whitesmoke;
    }

    &:active {
      opacity: 0.8;
    }
  }

  & > .disabledbtn {
    color: rgb(121, 120, 120) !important;
    cursor: default !important;
    pointer-events: none;
  }
`;

function PaginationButton({
  className,
  style,
  onPrev,
  onNext,
  disablePrev = false,
  disableNext = false,
}) {
  return (
    <PaginationButtonWrapper className={className} style={style}>
      <button onClick={onPrev} className={disablePrev && "disabledbtn"}>
        <i className="fas fa-backward"></i>
        <span>Previous</span>
      </button>

      <button onClick={onNext} className={disableNext && "disabledbtn"}>
        <span>Next</span>
        <i className="fas fa-forward"></i>
      </button>
    </PaginationButtonWrapper>
  );
}

export default PaginationButton;
