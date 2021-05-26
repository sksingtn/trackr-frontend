import { Button } from "@material-ui/core";
import React from "react";
import styled, { css } from "styled-components";
import SearchBar from "./SearchBar";
import DeleteButton from "./DeleteButton";

import EditIcon from "@material-ui/icons/Edit";
import SendIcon from "@material-ui/icons/Send";
import AddBoxIcon from "@material-ui/icons/AddBox";
import PaginationButtons from "./PaginationButtons";

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 1.5em;
`;

const ModifiedSearchBar = styled(SearchBar)`
  font-size: 14px;
  margin-right: 2rem;
`;

const InviteButton = styled(Button)`
  padding: 0.2em 0.4em !important;
  & > * {
    color: var(--primary);
    font-size: 1.2em;
    padding: none !important;
  }

  & * {
  }

  & #inviteText {
    text-transform: capitalize;
    margin-right: 0.3rem;
  }
`;

const StatusBarContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5em;
  color: var(--primary);

  & > h3 {
    font-weight: 400;
    font-size: 1em;
    color: rgba(0, 0, 0, 0.5);
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

const ModifiedDeleteButton = styled(DeleteButton)`
  position: absolute;
  right: 0.8em;
  top: 0.8em;
  display: none;
`;

const FacultyCard = styled.div`
  width: 100%;
  min-height: 6em;
  border-radius: 10px;
  position: relative;

  background: #e2e6f2;
  border: 2px solid #e2e6f2;

  display: flex;

  &:hover {
    background: rgba(226, 230, 242, 0.8);
  }

  &:hover ${ModifiedDeleteButton} {
    display: block;
  }

  & > div {
    display: flex;
    flex: 0.5;
  }

  & .leftsection {
    justify-content: flex-start;
    align-items: center;

    & .index {
      font-weight: 800;
      padding: 1em;
    }

    & > img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-right: 1em;
    }

    & .facultyinfo {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      transform: translateY(-10%);

      & > div {
        display: flex;
        align-items: center;
      }

      & .facultyname {
        margin-right: 0.2em;
        font-size: 1.5em;
        color: rgb(31, 31, 31);
      }

      & .facultyemail {
        font-weight: 200;
        color: grey;
      }
    }
  }

  & .rightsection {
    justify-content: flex-start;
    align-items: center;

    & .facultydetails {
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

const ActionBar = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0.3rem;
  right: 0.5rem;

  & > div {
    margin-left: 0.4em;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover :nth-child(1) {
      opacity: 0.9;
    }

    > :nth-child(1) {
      font-size: 0.9em;
      opacity: 0.6;
    }

    > :nth-child(2) {
      font-size: 1em;
      margin-left: 0.2em;
    }
  }
`;

const ModifiedPaginationButtons = styled(PaginationButtons)`
  align-self: flex-end;
  font-size: 12px;
  margin-top: 1.5em;
`;

function Faculty() {
  return (
    <MainContainer>
      <SearchBarContainer>
        <ModifiedSearchBar placeholder="Search for Batches.." />
        <InviteButton>
          <span id="inviteText">Add/Invite</span>
          <i class="fas fa-user-plus"></i>
        </InviteButton>
      </SearchBarContainer>
      <StatusBarContainer>
        <h3>
          All faculties <span className="highlight">(40)</span>
        </h3>
        <h3>
          <span className="highlight">Page</span> 2/6
        </h3>
      </StatusBarContainer>
      <CardContainer>
        <FacultyCard>
          <div className="leftsection">
            <span className="index">1.</span>
            <img
              width="80px"
              height="80px"
              src="http://unsplash.it/1000/1504"
              alt=""
            />
            <div className="facultyinfo">
              <div>
                <span className="facultyname">Kit Harrington</span>
                <StatusTag>Verified</StatusTag>
              </div>
              <span className="facultyemail">kit_harrington1975@gmail.com</span>
            </div>
          </div>
          <div className="rightsection">
            <div className="facultydetails">
              <span>
                Teaches in 70 classes{" "}
                <Dim style={{ cursor: "pointer" }}>(View)</Dim>
              </span>
              <span>
                Assigned to 2 batches{" "}
                <Dim style={{ cursor: "pointer" }}>(View)</Dim>
              </span>
              <span>
                Joined <Dim>17 Oct 2018</Dim>
              </span>
            </div>
          </div>
          <ModifiedDeleteButton />
        </FacultyCard>
        <FacultyCard>
          <div className="leftsection">
            <span className="index">2.</span>
            <img
              width="80px"
              height="80px"
              src="http://unsplash.it/1000/1505"
              alt=""
            />
            <div className="facultyinfo">
              <div>
                <span className="facultyname">Jaimie Lannister</span>
                <StatusTag type="Invited">Invited</StatusTag>
              </div>
              <span className="facultyemail">ilovemysister@castlerock.com</span>
            </div>
          </div>

          <div className="rightsection">
            <div className="facultydetails">
              <span>
                Teaches in 70 classes{" "}
                <Dim style={{ cursor: "pointer" }}>(View)</Dim>
              </span>
              <span>
                Assigned to 2 batches{" "}
                <Dim style={{ cursor: "pointer" }}>(View)</Dim>
              </span>
            </div>
          </div>
          <ModifiedDeleteButton />

          <ActionBar>
            <div>
              <span>Edit Invitation Email</span>
              <EditIcon color="primary" />
            </div>
            <div>
              <span>Resend Invite</span>
              <SendIcon style={{ color: "green" }} />
            </div>
          </ActionBar>
        </FacultyCard>
        <FacultyCard>
          <div className="leftsection">
            <span className="index">3.</span>
            <img
              width="80px"
              height="80px"
              src="http://unsplash.it/1000/1506"
              alt=""
            />
            <div className="facultyinfo">
              <div>
                <span className="facultyname">Barrister Selmy</span>
                <StatusTag type="Unverified">Unverified</StatusTag>
              </div>
            </div>
          </div>

          <div className="rightsection">
            <div className="facultydetails">
              <span>
                Teaches in 70 classes{" "}
                <Dim style={{ cursor: "pointer" }}>(View)</Dim>
              </span>
              <span>
                Assigned to 2 batches{" "}
                <Dim style={{ cursor: "pointer" }}>(View)</Dim>
              </span>
            </div>
          </div>
          <ModifiedDeleteButton />

          <ActionBar>
            <div>
              <span>Add Invitation Email</span>
              <AddBoxIcon color="secondary" />
            </div>
          </ActionBar>
        </FacultyCard>

        <FacultyCard>
          <div className="leftsection">
            <span className="index">4.</span>
            <img
              width="80px"
              height="80px"
              src="http://unsplash.it/1000/1504"
              alt=""
            />
            <div className="facultyinfo">
              <div>
                <span className="facultyname">Kit Harrington</span>
                <StatusTag>Verified</StatusTag>
              </div>
              <span className="facultyemail">kit_harrington1975@gmail.com</span>
            </div>
          </div>
          <div className="rightsection">
            <div className="facultydetails">
              <span>
                Teaches in 70 classes{" "}
                <Dim style={{ cursor: "pointer" }}>(View)</Dim>
              </span>
              <span>
                Assigned to 2 batches{" "}
                <Dim style={{ cursor: "pointer" }}>(View)</Dim>
              </span>
              <span>
                Joined <Dim>17 Oct 2018</Dim>
              </span>
            </div>
          </div>
          <ModifiedDeleteButton />
        </FacultyCard>
      </CardContainer>

      <ModifiedPaginationButtons />
    </MainContainer>
  );
}

export default Faculty;
