import React from "react";
import styled from "styled-components";

const SerachBarContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: stretch;
  border-radius: 1.2em;
  overflow: hidden;

  & > input {
    flex: 1;
    border: none;
    outline: none;
    padding: 0 1em;
    padding-left: 1.5em;
    color: var(--primary);
    //TODO:
    font-family: "Antic Slab", serif;
    font-size: 1.2em;
    font-weight: 600;
    border-style: solid;
    border-width: 1px;
    border-color: rgba(0, 0, 0, 0.4);
    border-right: none;
    border-radius: 1.2em 0em 0em 1.2em;

    &::placeholder {
      font-size: 1.1em;
      color: rgb(93, 92, 92);
      font-weight: 400;
    }

    &:focus,
    &:focus + .clearbtn {
      border-color: rgba(52, 56, 107, 0.8);
    }
  }

  & > button {
    border: none;
    outline: none;
    cursor: pointer;
  }

  & > .searchbtn {
    padding: 0.5em 1em;
    font-size: 1.2em;
    background: var(--primary);
    color: whitesmoke;

    &:active {
      opacity: 0.9;
    }
  }

  & > .clearbtn {
    padding-right: 0.5em;
    background: whitesmoke;
    color: var(--primary);
    border-style: solid;
    border-width: 1px;
    border-color: rgba(0, 0, 0, 0.4);
    border-left: none;
    border-right: none;
  }
`;

function SearchBar({
  className,
  style,
  value,
  placeholder,
  onChange,
  onSearch,
  onClear,
  showClear = false,
}) {
  const handleEnter = (e) => {
    const keyPressed = e.keyCode || e.which;

    if (keyPressed === 13 && onSearch) {
      onSearch();
    } else if (keyPressed === 27 && onClear) {
      onClear();
    }
  };

  return (
    <SerachBarContainer className={className} style={style}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyUp={handleEnter}
      />

      <button className="clearbtn" onClick={onClear} hidden={!showClear}>
        <i class="fas fa-times"></i>
      </button>

      <button className="searchbtn" onClick={onSearch}>
        <i className="fas fa-search"></i>
      </button>
    </SerachBarContainer>
  );
}

export default SearchBar;
