import React from "react";
import styled, { css } from "styled-components";

const TabWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5em 1em 0.5em 1em;
  background: rgb(226, 230, 238);
  color: var(--primary);
  position: relative;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease;

  ${(props) =>
    props.checked &&
    css`
      color: white;
      background: var(--primary);
    `}

  :hover {
    opacity: 0.9;
  }

  &::after {
    content: "";

    position: absolute;
    bottom: 0;
    left: 50%;
    width: 5px;
    height: 5px;
    background: #f50057;
    transform: scale(0);
    transition: all 0.4s ease;

    ${(props) =>
      props.checked &&
      css`
        display: block;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0.2em;
        transform: none;
      `}
  }

  & > .text {
    margin-right: 0.2em;
  }
`;

export function Tab({ text, icon, checked, className, onClick }) {
  return (
    <TabWrapper checked={checked} className={className} onClick={onClick}>
      <span className="text">{text}</span>
      {icon}
    </TabWrapper>
  );
}

export const Tabs = styled.div`
  width: 100%;
  display: flex;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 10%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  border-radius: 5px;
  overflow: hidden;
`;
