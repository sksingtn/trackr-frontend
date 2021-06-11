import React from "react";
import styled from "styled-components";

const ToggleContainer = styled.label`
  & > input {
    display: none;
  }

  & > .realCheckbox {
    height: 1.8em;
    box-shadow: 1px 1px 0.3em rgba(0, 0, 0, 0.4) inset;
    border-radius: 1.2em;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;

    &::after {
      content: "";
      height: 1.6em;
      width: 1.6em;
      border-radius: 50%;
      background: white;
      box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3);
    }

    &::before {
      content: "${(props) => props.offText}";
      font-size: 0.8em;
      min-width: 0.8em;
      color: rgba(0, 0, 0, 0.7);
      margin: 0em 0.4em 0em 0.8em;
    }
  }

  & > input:checked + .realCheckbox {
    background: rgb(1, 211, 86);
    flex-direction: row-reverse;
    box-shadow: 0px 1px 0.1em rgba(0, 0, 0, 0.3);

    &::after {
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
    }
    &::before {
      content: "${(props) => props.onText}";
      color: white;
      margin: 0em 0.8em 0em 0.4em;
      font-weight: 600;
    }
  }
`;

function Toggle({ className, style, checked, text }) {
  //TODO: Decide how to keep input id unique

  const onText = text?.on || "";
  const offText = text?.off || "";

  return (
    <ToggleContainer
      className={className}
      style={style}
      onText={onText}
      offText={offText}
      htmlFor="toggle">
      <input type="checkbox" id="toggle" checked={checked} />
      <div className="realCheckbox"></div>
    </ToggleContainer>
  );
}

export default Toggle;
