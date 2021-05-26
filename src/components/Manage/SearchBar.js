import React from "react";
import styled from "styled-components";

const SearchContainer = styled.div`
  position: relative;
  background: rgb(255, 254, 254);
  width: 25em;
  display: flex;
  align-items: stretch;
  border-radius: 1.2em;
  box-shadow: var(--shadow);

  & > input {
    border-radius: 1.2em 0em 0em 1.2em;
    background: transparent;
    flex-grow: 1;
    border: none;
    outline: none;
    padding: 0 1em;
    padding-left: 1.5em;
    color: var(--primary);
    font-family: "Antic Slab", serif;
    font-size: 1.2em;
    font-weight: 600;
    border: 1px solid gray;

    &::placeholder {
      font-family: "Antic Slab", serif;
      font-size: 1.2em;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.4);
    }

    &:focus {
      border: 1px solid var(--primary);
    }
  }

  & > button {
    padding: 0.5em 1em;
    font-size: 1.2em;
    background: var(--primary);

    color: whitesmoke;
    border: none;
    outline: none;
    cursor: pointer;
    border-left: 0.125em solid whitesmoke;
    border-radius: 0em 1.2em 1.2em 0em;
  }
`;
//Dont need this wrapper
function SearchBar({ className, placeholder }) {
  return (
    <SearchContainer className={className}>
      <input type="text" name="" placeholder={placeholder} />

      <button>
        <i className="fas fa-search"></i>
      </button>
    </SearchContainer>
  );
}

export default SearchBar;
