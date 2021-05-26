import React from "react";
import styled, { css } from "styled-components";
import SearchBar from "./SearchBar";
import { Button } from "@material-ui/core";
import DeleteButton from "./DeleteButton";
import Toggle from "./Toggle";

import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import FileCopyIcon from "@material-ui/icons/FileCopy";
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
  display: flex;
  margin-top: 1.5em;
  align-items: center;
`;

const ModifiedAddButton = styled(Button)`
  padding: 0em !important;

  & .MuiSvgIcon-root {
    font-size: 2.5em;
    color: var(--primary);
  }
`;

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

const ActionBar = styled.div`
  display: none;
  align-items: center;
  position: absolute;
  top: 0.5em;
  right: 0.5em;

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

const BatchCard = styled.div`
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
      display: flex;
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

const StatusTag = styled.div`
  font-size: 0.6em;
  font-weight: 200;
  color: #28901f;
  border: 1px solid #28901f;
  box-shadow: 0 0 1px transparent;
  border-radius: 10px;
  padding: 0.2em 0.4em;
  text-transform: capitalize;

  ${(props) =>
    props.type?.toLowerCase() === "unverified" &&
    css`
      color: red;
      border: 1px solid red;
    `}

  ${(props) =>
    props.type?.toLowerCase() === "invited" &&
    css`
      color: orangered;
      border: 1px solid orangered;
    `}
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

const ModifiedDeleteButton = styled(DeleteButton)``;

const BoldButton = styled(Button)`
  & > .MuiButton-label {
    font-weight: 600;
  }
`;

function Batch() {
  return (
    <MainContainer>
      <SearchBarContainer>
        <ModifiedSearchBar placeholder="Search for Batches.." />
        <ModifiedAddButton>
          <LibraryAddIcon />
        </ModifiedAddButton>
      </SearchBarContainer>

      <StatusBarContainer>
        <h3>
          All Batches <span className="highlight">(40)</span>
        </h3>
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
        <h3>
          <span className="highlight">Page</span> 2/6
        </h3>
      </StatusBarContainer>

      <CardContainer>
        <BatchCard>
          <ActionBar>
            <Toggle />
            <ModifiedDeleteButton icon="fas fa-pencil-alt" color="blue" />
            <ModifiedDeleteButton />
          </ActionBar>
          <div className="leftsection">
            <span className="index">1.</span>

            <div className="batchinfo">
              <div>
                <span className="batchname">C.S.E 4th Year</span>
                <StatusTag>Active</StatusTag>
              </div>
              <span>78 classes, taught by 12 faculties</span>
              <span>72 Students</span>
            </div>
          </div>
          <div className="rightsection">
            <div className="batchoptions">
              <span>
                Allow stuents to join :{" "}
                <span style={{ color: "green" }}>YES</span>
              </span>
              <span>
                Max Students : <Dim>100</Dim>
              </span>
              <span>
                Created : <Dim>28 Nov 1998</Dim>{" "}
              </span>
            </div>
          </div>
          <CopyButton>
            <span>Student Invitation link</span>
            <i class="far fa-copy"></i>
          </CopyButton>
        </BatchCard>

        <BatchCard>
          <ActionBar>
            <Toggle />
            <ModifiedDeleteButton icon="fas fa-pencil-alt" color="blue" />
            <ModifiedDeleteButton />
          </ActionBar>
          <div className="leftsection">
            <span className="index">2.</span>

            <div className="batchinfo">
              <div>
                <span className="batchname">BioTech 2nd Year</span>
                <StatusTag>Active</StatusTag>
              </div>
              <span>78 classes, taught by 12 faculties</span>
              <span>72 Students</span>
            </div>
          </div>
          <div className="rightsection">
            <div className="batchoptions">
              <span>
                Allow stuents to join :{" "}
                <span style={{ color: "green" }}>YES</span>
              </span>
              <span>
                Max Students : <Dim>100</Dim>
              </span>
              <span>
                Created : <Dim>28 Nov 1998</Dim>{" "}
              </span>
            </div>
          </div>
          <CopyButton>
            <span>Student Invitation link</span>
            <i class="far fa-copy"></i>
          </CopyButton>
        </BatchCard>

        <BatchCard>
          <ActionBar>
            <Toggle />
            <ModifiedDeleteButton icon="fas fa-pencil-alt" color="blue" />
            <ModifiedDeleteButton />
          </ActionBar>
          <div className="leftsection">
            <span className="index">3.</span>

            <div className="batchinfo">
              <div>
                <span className="batchname">C.S.E 3rd Year</span>
                <StatusTag type="unverified">Paused</StatusTag>
              </div>
              <span>78 classes, taught by 12 faculties</span>
              <span>72 Students</span>
            </div>
          </div>
          <div className="rightsection">
            <div className="batchoptions">
              <span>
                Allow stuents to join :{" "}
                <span style={{ color: "green" }}>YES</span>
              </span>
              <span>
                Max Students : <Dim>100</Dim>
              </span>
              <span>
                Created : <Dim>28 Nov 1998</Dim>{" "}
              </span>
            </div>
          </div>
          <CopyButton>
            <span>Student Invitation link</span>
            <i class="far fa-copy"></i>
          </CopyButton>
        </BatchCard>

        <BatchCard>
          <ActionBar>
            <Toggle />
            <ModifiedDeleteButton icon="fas fa-pencil-alt" color="blue" />
            <ModifiedDeleteButton />
          </ActionBar>
          <div className="leftsection">
            <span className="index">4.</span>

            <div className="batchinfo">
              <div>
                <span className="batchname">C.S.E 4th Year</span>
                <StatusTag>Active</StatusTag>
              </div>
              <span>78 classes, taught by 12 faculties</span>
              <span>72 Students</span>
            </div>
          </div>
          <div className="rightsection">
            <div className="batchoptions">
              <span>
                Allow stuents to join :{" "}
                <span style={{ color: "green" }}>YES</span>
              </span>
              <span>
                Max Students : <Dim>100</Dim>
              </span>
              <span>
                Created : <Dim>28 Nov 1998</Dim>{" "}
              </span>
            </div>
          </div>
          <CopyButton>
            <span>Student Invitation link</span>
            <i class="far fa-copy"></i>
          </CopyButton>
        </BatchCard>
      </CardContainer>
      <ModifiedPaginationButtons />
    </MainContainer>
  );
}

export default Batch;
