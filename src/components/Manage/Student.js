import { Button, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import SearchBar from "./SearchBar";

import Checkbox from "./Checkbox";
import PaginationButtons from "./PaginationButtons";

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ModifiedSearchBar = styled(SearchBar)`
  font-size: 14px;
  margin-right: 0.5rem;
`;

const SearchBarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5em;
`;

const batchOptions = [
  { title: "C.S.E 4th Year" },
  { title: "C.S.E 3rd Year" },
  { title: "M.B.A 4th Year" },
];

const StatusBarContainer = styled.div`
  display: flex;
  width: 100%;

  align-items: center;
  margin-top: 1.1em;
  color: var(--primary);

  & > h3 {
    font-weight: 400;
    font-size: 1em;
    color: rgba(0, 0, 0, 0.5);
  }

  & > h3:nth-of-type(1) {
    flex: 1;
  }

  & > .MuiButtonBase-root {
    font-size: 0.8em;
    margin-right: 1em;
  }
`;

const BoldButton = styled(Button)`
  & > .MuiButton-label {
    font-weight: 600;
  }
`;

const CardContainer = styled.div`
  margin: auto;
  margin-top: 1em;
  width: 80%;
  align-self: center;
  display: flex;
  flex-direction: column;

  & > * {
    margin-bottom: 0.6em;
  }
`;

const ModifiedCheckBox = styled(Checkbox)`
  visibility: visible;
  margin: 0em 2em;
`;

const StudentCard = styled.div`
  width: 100%;
  min-height: 6em;
  border-radius: 10px;
  position: relative;

  background: #e2e6f2;
  border: 2px solid #e2e6f2;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  ${(props) =>
    props.checked &&
    css`
      background: white;
      box-shadow: 0px 0px 1px 1px #f50057;
    `};

  &:hover {
    background: white;

    & > ${ModifiedCheckBox} {
      visibility: visible;
    }
  }

  & .index {
    font-weight: 800;
    padding: 1em;
    margin-right: 1em;
  }

  & > img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 1em;
  }

  & .studentinfo {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    & > div {
      display: flex;
      align-items: center;
    }

    & .studentname {
      margin-right: 0.2em;
      font-size: 1.5em;
      color: rgb(31, 31, 31);
    }

    & .studentemail {
      font-weight: 200;
      color: grey;
    }
  }

  & .joined {
    color: rgba(31, 31, 31, 0.9);
    position: absolute;
    top: 0.5em;
    right: 0.5em;
  }
`;

const Dim = styled.span`
  font-weight: 200;
  color: grey;
  font-size: 0.8em;
`;
const ModifiedPaginationButtons = styled(PaginationButtons)`
  align-self: flex-end;
  font-size: 12px;
  margin-top: 1.5em;
`;

function Student() {
  const [selected, setSelected] = useState([]);

  const handleClick = (id) => {
    let newSelected = [...selected];

    if (newSelected.includes(id)) {
      newSelected = newSelected.filter((item) => item !== id);
    } else {
      newSelected.push(id);
    }

    setSelected(newSelected);
  };

  return (
    <MainContainer>
      <SearchBarContainer>
        <ModifiedSearchBar placeholder="Search for Students..." />
        <Autocomplete
          id="combo-box-demo"
          options={batchOptions}
          getOptionLabel={(option) => option.title}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Select a Batch" variant="outlined" />
          )}
        />
      </SearchBarContainer>

      <StatusBarContainer>
        <h3>
          All Students <span className="highlight">(40)</span>
        </h3>
        <BoldButton variant="contained" color="secondary">
          Move {selected.length === 0 ? "All" : `(${selected.length})`}
        </BoldButton>
        <BoldButton variant="contained" color="secondary">
          Delete {selected.length === 0 ? "All" : `(${selected.length})`}
        </BoldButton>
        <h3>
          <span className="highlight">Page</span> 2/6
        </h3>
      </StatusBarContainer>

      <CardContainer>
        <StudentCard
          htmlFor="student"
          checked={selected.includes(1)}
          onClick={() => handleClick(1)}>
          <ModifiedCheckBox checked={selected.includes(1)} />
          <span className="index">1.</span>
          <img
            width="80px"
            height="80px"
            src="http://unsplash.it/1000/1504"
            alt=""
          />
          <div className="studentinfo">
            <div>
              <span className="studentname">Kit Harrington</span>
            </div>
            <span className="studentemail">kit_harrington1975@gmail.com</span>
          </div>
          <span className="joined">
            Joined <Dim>17 Oct 2018</Dim>
          </span>
        </StudentCard>
        <StudentCard
          htmlFor="student"
          checked={selected.includes(2)}
          onClick={() => handleClick(2)}>
          <ModifiedCheckBox checked={selected.includes(2)} />
          <span className="index">2.</span>
          <img
            width="80px"
            height="80px"
            src="http://unsplash.it/1000/1503"
            alt=""
          />
          <div className="studentinfo">
            <div>
              <span className="studentname">Robert Baratheon</span>
            </div>
            <span className="studentemail">kit_harrington1975@gmail.com</span>
          </div>
          <span className="joined">
            Joined <Dim>17 Oct 2018</Dim>
          </span>
        </StudentCard>
        <StudentCard
          htmlFor="student"
          checked={selected.includes(3)}
          onClick={() => handleClick(3)}>
          <ModifiedCheckBox checked={selected.includes(3)} />
          <span className="index">3.</span>
          <img
            width="80px"
            height="80px"
            src="http://unsplash.it/1000/1502"
            alt=""
          />
          <div className="studentinfo">
            <div>
              <span className="studentname">Eddard Stark</span>
            </div>
            <span className="studentemail">kit_harrington1975@gmail.com</span>
          </div>
          <span className="joined">
            Joined <Dim>17 Oct 2018</Dim>
          </span>
        </StudentCard>
        <StudentCard
          htmlFor="student"
          checked={selected.includes(4)}
          onClick={() => handleClick(4)}>
          <ModifiedCheckBox checked={selected.includes(4)} />
          <span className="index">4.</span>
          <img
            width="80px"
            height="80px"
            src="http://unsplash.it/1000/1501"
            alt=""
          />
          <div className="studentinfo">
            <div>
              <span className="studentname">Ramsay Bolton</span>
            </div>
            <span className="studentemail">kit_harrington1975@gmail.com</span>
          </div>
          <span className="joined">
            Joined <Dim>17 Oct 2018</Dim>
          </span>
        </StudentCard>
      </CardContainer>
      <ModifiedPaginationButtons />
    </MainContainer>
  );
}

export default Student;
