import React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";

import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import RoundedIconButton from "../../baseUI/RoundedIconButton";

import Dim from "../../baseUI/Dim";
import ToolTip from "../Utils/Tooltip/Tooltip";
import Tag from "../../baseUI/Tag";
import BaseSearchBar from "../../baseUI/SearchBar";
import Toggle from "../../baseUI/Toggle";
import BasePaginationButtons from "../../baseUI/PaginationButton";

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
  margin-right: 1.5rem;
`;

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SearchBarContainer = styled.div`
  display: flex;
  margin-top: 1.5em;
  align-items: center;
`;

const StatusBar = styled.div`
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

const ActionBar = styled.div`
  opacity: 0;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  transition: opacity 0.1s ease;

  & > * {
    margin-left: 0.4em;
  }
`;

const CopyButton = styled.button`
  display: none;
  position: absolute;
  bottom: 0.5em;
  right: 0.5em;
  align-items: center;
  font-size: 0.8em;
  cursor: pointer;
  opacity: 0.7;
  padding: 0em 0.4em;
  border-radius: 5px;
  color: var(--primary);
  background: transparent;
  outline: none;
  border: none;

  & > span {
    margin-right: 0.2em;
  }

  &:hover {
    opacity: 1;
    background: rgba(31, 31, 31, 0.1);
  }
  &:active {
    background: white;
  }
`;

const BatchCardWrapper = styled.div`
  width: 100%;
  min-height: 6em;
  border-radius: 10px;
  position: relative;
  background: #e2e6f2;
  border: 2px solid #e2e6f2;

  display: flex;

  &:hover {
    background: rgba(226, 230, 242, 0.8);

    & > ${ActionBar} {
      opacity: 1;
    }

    & > ${CopyButton} {
      display: flex;
    }
  }

  & .leftsection {
    display: flex;
    flex: 0.5;
    justify-content: flex-start;
    align-items: center;

    & .index {
      font-weight: 800;
      padding: 1em;
      margin-left: 1.5em;
      margin-right: 0.5em;
    }

    & .batchinfo {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      & > div {
        display: flex;
        align-items: center;
      }

      & .batchname {
        margin-right: 0.2em;
        font-size: 1.5em;
        color: rgb(31, 31, 31);
      }

      & > span {
        font-weight: 200;
        color: grey;
      }
    }
  }

  & .rightsection {
    display: flex;
    flex: 0.5;
    justify-content: flex-start;
    align-items: center;

    & .batchoptions {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      color: rgba(31, 31, 31, 0.9);

      & > * {
        margin-bottom: 0.3em;
      }
    }
  }
`;

const BoldButton = styled(Button)`
  & > .MuiButton-label {
    font-weight: 600;
  }
`;

const batchData = [
  {
    index: 1,
    name: "C.S.E 4th Year",
    isActive: true,
    slotCount: 78,
    facultyCount: 12,
    studentCount: 72,
    maxStudents: 100,
    created: "21 June 1999",
  },
  {
    index: 2,
    name: "BioTech 2nd Year",
    isActive: true,
    slotCount: 78,
    facultyCount: 12,
    studentCount: 82,
    maxStudents: 10,
    created: "21 June 1999",
  },
  {
    index: 3,
    name: "C.S.E 3rd Year",
    isActive: false,
    slotCount: 78,
    facultyCount: 15,
    studentCount: 64,
    maxStudents: 181,
    created: "21 June 1999",
  },
  {
    index: 4,
    name: "C.S.E 4th Year",
    isActive: true,
    slotCount: 78,
    facultyCount: 12,
    studentCount: 48,
    maxStudents: 115,
    created: "21 June 1999",
  },
];

function BatchCard({
  index,
  name,
  isActive,
  slotCount,
  facultyCount,
  studentCount,
  maxStudents,
  created,
}) {
  return (
    <BatchCardWrapper>
      <ActionBar>
        <Toggle
          checked={isActive}
          text={{ off: "Paused", on: "Active" }}
          style={{ fontSize: "13px" }}
        />
        <RoundedIconButton className="editbtn">
          <i class="fas fa-pencil-alt"></i>
        </RoundedIconButton>
        <RoundedIconButton className="deletebtn" color="red">
          <i class="fas fa-trash"></i>
        </RoundedIconButton>
      </ActionBar>
      <div className="leftsection">
        <span className="index">{index}.</span>

        <div className="batchinfo">
          <div>
            <ToolTip maxLength={18}>
              <span className="batchname">{name}</span>
            </ToolTip>
            <Tag
              color={isActive ? "green" : "red"}
              text={isActive ? "Active" : "Paused"}
            />
          </div>
          <span>
            {slotCount} classes, taught by {facultyCount} faculties
          </span>
          <span>{studentCount} Students</span>
        </div>
      </div>
      <div className="rightsection">
        <div className="batchoptions">
          <span>
            Allow stuents to join : <span style={{ color: "green" }}>YES</span>
          </span>
          <span>
            Max Students : <Dim>{maxStudents}</Dim>
          </span>
          <span>
            Created : <Dim>{created}</Dim>
          </span>
        </div>
      </div>
      <CopyButton>
        <span>Student Invitation link</span>
        <i class="far fa-copy"></i>
      </CopyButton>
    </BatchCardWrapper>
  );
}

function Batch() {
  return (
    <MainContainer>
      <SearchBarContainer>
        <Searchbar placeholder="Search for Batches.." />
        <RoundedIconButton size="3em">
          <LibraryAddIcon style={{ fontSize: "2.2em" }} />
        </RoundedIconButton>
      </SearchBarContainer>

      <StatusBar>
        <h3>All Batches (40)</h3>
        <BoldButton
          variant="contained"
          startIcon={<PauseIcon />}
          color="secondary">
          Resume All
        </BoldButton>
        <BoldButton
          variant="contained"
          startIcon={<PlayArrowIcon />}
          color="secondary">
          Pause All
        </BoldButton>
        <h3>Page 2/6</h3>
      </StatusBar>

      <CardContainer>
        {batchData.map((item) => {
          return <BatchCard {...item} />;
        })}
      </CardContainer>
      <PaginationButton disablePrev={true} />
    </MainContainer>
  );
}

export default Batch;
