import { Button, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useState } from "react";
import styled, { css } from "styled-components";

import Dim from "../../baseUI/Dim";
import BaseSearchBar from "../../baseUI/SearchBar";
import BaseCheckbox from "../../baseUI/Checkbox";
import BasePaginationButtons from "../../baseUI/PaginationButton";

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const PaginationButton = styled(BasePaginationButtons)`
  align-self: flex-end;
  margin-top: 1.5em;
  width: 14em;
  font-size: 1.1em;

  & > button {
    background: #e2e6f2;
  }
`;

const Searchbar = styled(BaseSearchBar)`
  font-size: 0.875em;
  width: 25em;
`;

const BoldButton = styled(Button)`
  & > .MuiButton-label {
    font-weight: 600;
  }
`;

const Checkbox = styled(BaseCheckbox)`
  margin: 0em 2em;
`;

const Topbar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5em;
  margin-bottom: 1.1em;
`;

const batchOptions = [
  { title: "C.S.E 4th Year" },
  { title: "C.S.E 3rd Year" },
  { title: "M.B.A 4th Year" },
];

const StatusBar = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  color: var(--primary);

  & > span {
    font-weight: 400;
    font-size: 1em;
    color: rgba(0, 0, 0, 0.5);
  }

  & > span:nth-of-type(1) {
    flex: 1;
  }

  & > .MuiButtonBase-root {
    font-size: 0.8em;
    margin-right: 1em;
  }
`;

const CardContainer = styled.div`
  margin-top: 1em;
  width: 80%;
  align-self: center;
  display: flex;
  flex-direction: column;

  & > * {
    margin-bottom: 0.6em;
  }
`;

const StudentCardWrapper = styled.div`
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

    & > ${Checkbox} {
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
    filter: drop-shadow(0 0.125em 0.25em rgba(9, 30, 80, 0.2));
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

const StudentData = [
  {
    index: "1",
    studentImg: "http://unsplash.it/1000/1503",
    studentName: "Kit Harrington",
    email: "kit_harrington1975@gmail.com",
    joined: "17 Oct 2018",
  },
  {
    index: "2",
    studentImg: "http://unsplash.it/1000/1504",
    studentName: "Petry Bailish",
    email: "kit_harrington1975@gmail.com",
    joined: "17 Oct 2018",
  },
  {
    index: "3",
    studentImg: "http://unsplash.it/1000/1505",
    studentName: "Jorah Mormont",
    email: "kit_harrington1975@gmail.com",
    joined: "17 Oct 2018",
  },
  {
    index: "4",
    studentImg: "http://unsplash.it/1000/1506",
    studentName: "Barrister Selmy",
    email: "kit_harrington1975@gmail.com",
    joined: "17 Oct 2018",
  },
];

function StudentCard({
  checked,
  onClick,
  index,
  studentImg,
  studentName,
  email,
  joined,
}) {
  return (
    <StudentCardWrapper checked={checked} onClick={onClick}>
      <Checkbox checked={checked} />
      <span className="index">{index}.</span>
      <img width="80px" height="80px" src={studentImg} alt="Student Image" />
      <div className="studentinfo">
        <div>
          <span className="studentname">{studentName}</span>
        </div>
        <span className="studentemail">{email}</span>
      </div>
      <span className="joined">
        Joined <Dim>{joined}</Dim>
      </span>
    </StudentCardWrapper>
  );
}

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
      <Topbar>
        <Searchbar placeholder="Search for Students..." />
        <Autocomplete
          id="combo-box-demo"
          options={batchOptions}
          getOptionLabel={(option) => option.title}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Select a Batch" variant="outlined" />
          )}
        />
      </Topbar>

      <StatusBar>
        <span className="result">All Students (40)</span>
        <BoldButton variant="contained" color="secondary">
          Move {selected.length === 0 ? "All" : `(${selected.length})`}
        </BoldButton>
        <BoldButton variant="contained" color="secondary">
          Delete {selected.length === 0 ? "All" : `(${selected.length})`}
        </BoldButton>
        <span>Page 2/6</span>
      </StatusBar>

      <CardContainer>
        {StudentData.map((item, index) => {
          return (
            <StudentCard
              checked={selected.includes(index + 1)}
              onClick={() => handleClick(index + 1)}
              {...item}
            />
          );
        })}
      </CardContainer>
      <PaginationButton disablePrev={true} />
    </MainContainer>
  );
}

export default Student;
