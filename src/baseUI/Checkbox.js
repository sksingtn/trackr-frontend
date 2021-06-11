import React from "react";
import styled from "styled-components";

//TODO: Use the native checked property
const CheckBoxContainer = styled.label`
  --checkboxcolor: ${(props) => props.color || "#f50057"};
  width: 1.125em;
  height: 1.125em;
  box-sizing: content-box;
  border-color: var(--checkboxcolor);
  border-style: solid;
  border-width: ${(props) => props.thickness || "3px"};
  border-radius: ${(props) => (props.rounded ? "4px" : "0px")};
  background: white;
  pointer-events: none;

  & > input {
    display: none;
  }

  & > span {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background: var(--checkboxcolor);
    transition: all 0.1s ease;

    transform: ${(props) => (props.checked ? "scale(1)" : "scale(0)")};
  }
`;

function Checkbox({ checked, className, rounded = true, thickness, color }) {
  return (
    <CheckBoxContainer
      className={className}
      checked={checked}
      rounded={rounded}
      thickness={thickness}
      color={color}>
      <input type="checkbox" />
      <span>
        <i class="fas fa-check" style={{ color: "white" }}></i>
      </span>
    </CheckBoxContainer>
  );
}

export default Checkbox;
