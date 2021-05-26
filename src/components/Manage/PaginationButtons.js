import styled from "styled-components";
import React from "react";

const ButtonContainer = styled.div`
  width: 20em;
  display: flex;

  & > button {
    width: 50%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.5em;
    padding: 0.3em 0.6em;
    outline: none;
    border: none;
    color: whitesmoke;
    background: var(--primary);
    cursor: pointer;

    &:hover {
      color: var(--primary);
      background: #e2e6f2;
    }
  }

  & > :nth-child(1) {
    border-right: 0.125em solid whitesmoke;
    border-radius: 1.25em 0px 0px 1.25em;
  }

  & > :nth-child(2) {
    border-right: none;
    border-radius: 0px 1.25em 1.25em 0px;
  }
`;

function PaginationButtons({ className }) {
  return (
    <ButtonContainer className={className}>
      <button>
        <i className="fas fa-backward"></i>
        <span>Previous</span>
      </button>

      <button>
        <span>Next</span>
        <i className="fas fa-forward"></i>
      </button>
    </ButtonContainer>
  );
}

export default PaginationButtons;
