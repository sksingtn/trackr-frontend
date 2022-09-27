import styled, { css } from "styled-components";

export const MainContainer = styled.div`
  width: 100%;
`;

export const SearchResult = styled.div`
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  margin-top: 0.2em;
  margin-left: 5em;
  margin-bottom: 0.2em;
  color: rgb(97, 96, 96);

  & > .empty {
    color: red;
  }

  & > .found > span {
    color: green;
  }
`;

export const Carousel = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  font-size: 14px;

  /*Calculated from height of .heading + max-height of Slotcontainer*/
  /*To stop navbtns from wobbling*/
  min-height: 34.9em;

  & > .navbtn {
    align-self: center;

    & > i {
      font-size: 2em;
    }
  }

  & .right-enter {
    opacity: 0;
    transform: translateX(30px);
  }
  & .right-enter-active {
    opacity: 1;
    transition: all 300ms ease-in;
    transform: translateX(0px);
  }

  & .left-enter {
    opacity: 0;
    transform: translateX(-30px);
  }
  & .left-enter-active {
    opacity: 1;
    transition: all 300ms ease-in;
    transform: translateX(0px);
  }
`;

export const WeekdayContainer = styled.div`
  width: 20em;
  user-select: none;

  & > .heading {
    border-radius: 15px 15px 0px 0px;
    background: ${(props) => (props.highlight ? "#b6244f" : "#34386b")};
    color: whitesmoke;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0.2em;
    letter-spacing: 0.15em;
    height: 3.3em;

    & > .weekday-name {
      font-family: "Fredoka One", cursive;
      font-size: 1.8em;
      padding: 0.2em 0em;
      margin-left: 0.4em;
    }
  }
`;

export const SlotContainer = styled.div`
  padding: 0.8em 0.2em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: rgba(0, 0, 0, 0);
  border: 2px solid rgba(52, 56, 107, 0.3);
  border-top: none;
  border-radius: 0px 0px 15px 15px;
  max-height: 31.6em;
  overflow-y: scroll;
  overflow-x: hidden;

  & > *:not(.empty) {
    margin-bottom: 0.8em;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: transparent;
  }

  &::-webkit-scrollbar {
    width: 8px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgb(155, 152, 152);
    visibility: hidden;
  }

  &:hover::-webkit-scrollbar-thumb {
    visibility: visible;
  }

  & > .empty {
    width: 100%;
    height: 6em;
    display: flex;
    align-items: center;
    justify-content: center;

    & > span {
      letter-spacing: 1px;
      font-size: 1.5em;
      color: rgba(52, 56, 107, 0.4);
    }

    & > i {
      font-size: 2em;
      margin-right: 0.5em;
      color: rgba(52, 56, 107, 0.7);
    }
  }
`;

export const Slot = styled.div`
  display: flex;

  & > .index {
    min-width: 2em;
    text-align: center;
    margin-top: 1em;
    font-family: "Fredoka One", cursive;
    align-self: start;
    color: #34386b;
  }

  & > .content {
    width: 16.4em;
    height: 8.5em;
    border-radius: 10px;
    padding: 2.2em 0.8em 0.6em 0.8em;
    box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.2);
    background: rgba(255, 255, 255, 1);
    user-select: none;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    ${(props) => props.selected && css`
    box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.2), 0px 0px 0px 1px #b6244f;`}

    &:hover {
      box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.2), 0px 0px 0px 1px #b6244f;

      & > .managebar {
        opacity: 1;
        transform: translateX(0%);
      }

      & > .detailsbar {
        opacity: 0;
        transform: translateX(-100%);
      }
    }

    & > .topbar {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      padding: 0.6em 0.8em 0em 0.8em;
      min-height: 1.9em;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      transition: transform 0.15s ease;
    }

    & > .managebar {
      opacity: 0;
      transform: translateX(100%);
    }

    & > .detailsbar {
      opacity: 1;
      transform: translateX(0%);
    }

    & .duration {
      color: white;
      padding: 0em 0.3em;
      background: #b6244f;
      border-radius: 0.25em;
    }

    & .editslotbtn {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0.2em;
      border-radius: 3px;
      border: 1px solid #4d5256;
      outline: none;
      cursor: pointer;
      background: #34386b;
      color: white;
      overflow: hidden;

      span {
        margin-right: 0.2em;
      }

      &:active {
        opacity: 0.9;
      }
    }

    & > .title {
      display: inline-block;
      font-size: 1.6em;
      color: rgb(20, 20, 20);
    }

    & .secondary {
      width: 100%;
      flex: 1;
      color: #737b82;
      margin-top: 0.1em;
    }

    & .faculty {
      display: inline-block;
      display: flex;
      align-items: center;

      & > * {
        margin-right: 0.3em;
      }

      & > img {
        width: 1.25em;
        height: 1.25em;
        border-radius: 50%;
        filter: drop-shadow(0 0.125em 0.25em rgba(9, 30, 80, 0.3));
      }
    }

    & .timing {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;

      & > i {
        font-size: 1.2em;
        color: var(--primary);
      }

      & > .time {
        font-size: 1.4em;

        font-family: monospace;
        font-family: "PT Mono", monospace;
        color: rgba(0, 0, 0, 0.8);
      }
    }
  }
`;
