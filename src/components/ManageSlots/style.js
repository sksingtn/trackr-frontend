import styled, { css } from "styled-components";

export const ManageSlotContainer = styled.div`
  width: 25em;
  border-radius: 0.62em;
  padding: 1em 1.5em 1.2em 1.5em;
  box-shadow: 0 -1em 2em rgba(12, 31, 100, 0.2), 0 0.3em 1em rgba(0, 0, 0, 0.3);
  background: linear-gradient(
    90deg,
    rgba(37, 37, 122, 1) 24%,
    rgba(47, 124, 140, 1) 100%
  );
  display: flex;
  flex-direction: column;
  align-items: center;

  //TODO:Move
  font-size: 15px;
  place-self: center;

  & > .heading {
    width: 100%;
    text-align: center;

    & > span {
      color: whitesmoke;
      font-size: 1.2em;
      letter-spacing: 0.2em;
      word-spacing: 0.3em;
      font-weight: 800;
    }
  }

  & > .weekdayDropdown {
    width: 100%;
    position: relative;
    margin-bottom: 0.5em;

    & > select {
      width: 100%;
      font-size: 1.2em;
      padding: 0.4em 0.5em 0.4em 1em;
      outline: none;
      border-radius: 0.3em;
      background: whitesmoke;
      color: var(--primary);
      border: 1px solid grey;
      cursor: pointer;
      font-weight: 600;

      option {
        background: var(--primary);
        color: whitesmoke;
        outline: none;
      }
    }

    & > .icon {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: 2.8em;
      border-radius: 0px 0.3em 0.3em 0px;
      background: var(--primary);

      display: flex;
      justify-content: center;
      align-items: center;
      pointer-events: none;
      color: whitesmoke;
    }
  }

  & > #createclassbtn {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--primary);

    & span.label {
      margin-left: 0.5em;
      font-size: 1.2em;
    }

    & i {
      font-size: 1.6em;
    }
  }
`;

export const Divider = styled.hr`
  width: 100%;
  margin: 0.8em 0em;
  height: 1px;
  opacity: 0.5;
  box-shadow: 0px 1px 0.3em 1px rgba(255, 255, 255, 0.4);
`;

export const TitleInput = styled.input.attrs({
  type: "text",
  placeholder: "Title for the class...",
})`
  width: 100%;
  font-size: 1.2em;
  margin-bottom: 0.5em;
  padding: 0.5em 1em;
  outline: none;
  border: 1px solid grey;
  border-radius: 0.3em;
  font-weight: 600;
  color: var(--primary);

  &:focus {
    box-shadow: 0px 0px 0px 2px var(--primary);
  }

  &::placeholder {
    color: rgb(93, 92, 92);
    font-weight: 400;
  }
`;

export const TimeInputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const SelectFacultySection = styled.section`
  width: 100%;

  & > .highlight {
    display: block;
    color: whitesmoke;
    text-align: center;
    padding: 0.5em 0em;
    font-size: 1.2em;
  }
`;

export const FacultyCardContainer = styled.ul`
  width: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  list-style: none;

  & > *:not(:nth-last-child(1)) {
    margin-bottom: 0.3em;
  }
`;

export const FacultyCardWrapper = styled.div`
  height: 3.2em;
  background: ${(props) => (props.checked ? "whitesmoke" : "whitesmoke")};
  cursor: pointer;
  padding: 0.3em 0.5em;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  user-select: none;

  &:hover {
    ${(props) =>
      !props.checked &&
      css`
        background: #e2e6f2;
      `}

    & > .profileimg {
      filter: none;
    }
  }

  & > .index {
    margin-left: 0.8em;
    margin-right: 0.2em;
    color: var(--primary);
    font-weight: 600;
    font-size: 1.16em;
  }

  & > .profileimg {
    width: 2.5em;
    height: 2.5em;
    object-fit: cover;
    border-radius: 50%;
    border: 2px solid rgb(221, 219, 219);
    filter: drop-shadow(0 0.125em 0.25em rgba(9, 30, 80, 0.3));
    margin: 0px 0.625em;
  }

  & > .name {
    font-size: 1.12em;
    flex: 1;
  }
`;

export const InviteFacultySection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: whitesmoke;
  padding: 2em 0em 1em 0em;

  & > * {
    margin-bottom: 0.8em !important;
  }

  & > #addFacultyButton {
    margin-bottom: 0;
    margin-top: 0.6em;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 12em;
    background: #b6244f;
  }
`;
