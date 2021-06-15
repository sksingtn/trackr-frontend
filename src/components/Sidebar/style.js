import styled, { css } from "styled-components";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export const SidebarWrapper = styled.div`
  position: relative;
  border-radius: 20px 0 0 20px;
  background: #34386b;
  padding: 1.25em 0em;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  & > .heading {
    color: rgb(235, 235, 235);
    font-size: 2.3em;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0em 0.3em 0.2em 0.3em;
    margin-bottom: 1em;
    border-bottom: 1px solid whitesmoke;

    & > span {
      font-family: "Fredoka One", cursive;
      letter-spacing: 0.1em;
      margin-left: 0.3em;
    }
  }
`;

export const ProfileWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: whitesmoke;
  margin-bottom: 7em;

  & > * {
    margin-bottom: 0.2em;
  }

  & > img {
    height: 5em;
    width: 5em;
    border-radius: 50%;
    border: 2px solid white;
    margin-bottom: 0.6em;
  }

  & > .name {
    font-size: 1.2em;
    margin-bottom: 0.3em;
  }

  & > .position {
    display: block;
    color: #34386b;
    padding: 0.3em;
    background: whitesmoke;
    font-weight: 600;
    border-radius: 5px;
    text-transform: capitalize;
  }
`;

export const LinksContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SidebarLinkWrapper = styled(Link)`
  width: 100%;
  font-size: 1.5em;
  color: ${(props) => (props.active ? "var(--primary)" : "white")};
  padding: 0.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-decoration: none;
  position: relative;
  transition: opacity 0.1s;

  &::after {
    content: "";
    left: 0;
    width: ${(props) => (props.active ? "100%" : "0px")};
    height: 100%;
    background: white;
    position: absolute;
    transition: all 0.2s ease;

    ${(props) =>
      props.active &&
      css`
        box-shadow: 0px 2px 2px rgba(255, 255, 255, 0.1),
          0px -2px 2px rgba(255, 255, 255, 0.1);
      `}
  }

  &:hover {
    ${(props) =>
      !props.active &&
      css`
        opacity: 0.8;
      `}
  }

  & > * {
    z-index: 10;
  }

  & > .link-text {
    margin-left: 0.8em;
    font-weight: ${(props) => (props.active ? "800" : "400")};
  }
`;

export const LogoutButtonWrapper = styled(Button).attrs({
  variant: "contained",
})`
  && {
    width: 90%;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    bottom: 1.5em;
    color: var(--primary);
    font-size: 1.1em;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & .btn-text {
    margin-left: 0.4em;
  }
`;
