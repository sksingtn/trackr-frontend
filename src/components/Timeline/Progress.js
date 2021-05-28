import React from "react";
import styled from "styled-components";

const ProgressBar = styled.div`
  width: 100%;
  height: 1em;
  border-radius: 2em;
  background: rgba(211, 211, 211, 0.1);
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: flex-start;
  color: white;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 50%;
    border-radius: 2em;
    background: #3bca2b;
    box-shadow: 0px 0px 15px 1px rgba(59, 202, 43, 0.5);
    transition: all 0.1s ease;
  }
`;

export default ProgressBar;
