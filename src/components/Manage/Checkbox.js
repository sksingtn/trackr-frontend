import React from "react";
import styled from "styled-components";

const CheckBoxContainer = styled.label`
  width: 18px;
  height: 18px;
  box-sizing: content-box;
  border: 3px solid #f50057;
  border-radius: 4px;
  background: white;
  pointer-events: none;

  & > input {
    display: none;
  }

  & > span {
    display: ${(props) => (props.checked ? "flex" : "none")};
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background: #f50057;
  }
`;

function Checkbox({ checked, className }) {
  return (
    <CheckBoxContainer className={className} checked={checked}>
      <input type="checkbox" />
      <span>
        <i class="fas fa-check" style={{ color: "white" }}></i>
      </span>
    </CheckBoxContainer>
  );
}

export default Checkbox;
