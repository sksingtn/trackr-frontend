import React from "react";
import styled, { css } from "styled-components";

const getHeader = (identifier) => {
  switch (identifier) {
    case 1:
      return "Students";
    case 2:
      return "Faculty";
    case 3:
      return "Batch";
    default:
      return false;
  }
};

function ManageHeader({ section, setSection }) {
  return (
    <ManageContainer>
      <Header>{`Manage ${getHeader(section)}`}</Header>
      <SwitchContainer>
        <SwitchOption checked={section === 1} onClick={() => setSection(1)}>
          <i class="fas fa-user-graduate"></i>
          <span>Student</span>
        </SwitchOption>
        <SwitchOption checked={section === 2} onClick={() => setSection(2)}>
          <i class="fas fa-chalkboard-teacher"></i>
          <span>Faculty</span>
        </SwitchOption>
        <SwitchOption checked={section === 3} onClick={() => setSection(3)}>
          <i class="fab fa-algolia"></i>
          <span>Batch</span>
        </SwitchOption>
      </SwitchContainer>
    </ManageContainer>
  );
}

export default ManageHeader;

const ManageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header = styled.h1`
  font-weight: 400;
  color: #253858;
`;

const SwitchContainer = styled.div`
  display: flex;
  padding: 0.8em 1.6em;
  border-radius: 20px;
  background: #e2e6f2;
`;

const SwitchOption = styled.div`
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
