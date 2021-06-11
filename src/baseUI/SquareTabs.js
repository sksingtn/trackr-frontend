import React from "react";
import styled, { css } from "styled-components";

export const SquareTabs = styled.div`
  display: flex;
  padding: 0.8em 1.6em;
  border-radius: 20px;
  background: #e2e6f2;
`;

const TabWrapper = styled.div`
  width: 4em;
  padding: 0.5em 0.8em 0.1em 0.8em;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 6px;
  margin-right: 6px;
  box-shadow: 0px 2px 3px 2px rgba(0, 0, 0, 0.1),
    0px -1px 2px 1px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  cursor: pointer;
  user-select: none;
  background: whitesmoke;
  position: relative;
  z-index: 1;

  ${(props) =>
    props.checked &&
    css`
      transform: scale(1.08);
      box-shadow: 0px 2px 5px 2px rgb(64, 68, 131, 0.2),
        0px -2px 5px 2px rgb(64, 68, 131, 0.2);
    `}

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    background: var(--primary);
    width: 1px;
    height: 1px;
    transform: scale(0);
    transition: all 0.2s ease;
    border-radius: inherit;
    z-index: 2;

    ${(props) =>
      props.checked &&
      css`
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform: none;
      `}
  }

  & > i {
    font-size: 2em;
    margin-bottom: 0.1em;
    z-index: 3;
    color: ${(props) => (props.checked ? "whitesmoke" : "var(--primary)")};
  }

  & > span {
    font-size: 0.9em;
    z-index: 3;
    color: ${(props) => (props.checked ? "whitesmoke" : "rgba(0, 0, 0, 0.7)")};
  }
`;

export function Tab({ className, text, iconName, checked, onClick }) {
  return (
    <TabWrapper checked={checked} className={className} onClick={onClick}>
      <i class={iconName}></i>
      <span>{text}</span>
    </TabWrapper>
  );
}
