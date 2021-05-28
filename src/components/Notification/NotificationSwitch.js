import React from "react";
import styled, { css } from "styled-components";
import BookIcon from "@material-ui/icons/Book";

const SwitchContainer = styled.div`
  display: flex;

  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 10%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  border-radius: 5px;
  overflow: hidden;
`;

const Tab = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2em;
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

  & > span {
    margin-right: 0.2em;
  }
`;

function NotificationSwitch({ section, setSection }) {
  const [checked, setChecked] = React.useState(0);
  return (
    <SwitchContainer>
      <Tab checked={section === 0} onClick={() => setSection(0)}>
        <span>Activity</span>
        <BookIcon />
      </Tab>
      <Tab checked={section === 1} onClick={() => setSection(1)}>
        <span>Broadcast</span>
        <i class="fas fa-bullhorn"></i>
      </Tab>
    </SwitchContainer>
  );
}

export default NotificationSwitch;
