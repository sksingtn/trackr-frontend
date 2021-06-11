import React from "react";
import styled from "styled-components";

import EditIcon from "@material-ui/icons/Edit";
import SendIcon from "@material-ui/icons/Send";
import AddBoxIcon from "@material-ui/icons/AddBox";
import RoundedIconButton from "../../baseUI/RoundedIconButton";

import Dim from "../../baseUI/Dim";
import ToolTip from "../Utils/Tooltip/Tooltip";
import Tag from "../../baseUI/Tag";
import BaseSearchBar from "../../baseUI/SearchBar";
import BasePaginationButtons from "../../baseUI/PaginationButton";

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Topbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 1.5em;
`;

const Searchbar = styled(BaseSearchBar)`
  font-size: 0.875em;
  width: 25em;
  margin-right: 1.5rem;
`;

const StatusBar = styled.div`
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

const FacultyCardWrapper = styled.div`
  width: 100%;
  min-height: 6em;
  border-radius: 10px;
  position: relative;
  background: #e2e6f2;
  border: 2px solid #e2e6f2;
  display: flex;

  &:hover {
    background: rgba(226, 230, 242, 0.8);

    & .deletebtn {
      display: block;
    }

    & ${ActionBar} {
      display: flex;
    }
  }

  & .leftsection {
    flex: 0.55;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    & .index {
      font-weight: 800;
      padding: 1em;
      margin-left: 1.5em;
      margin-right: 0.5em;
    }

    & > img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-right: 1em;
      filter: drop-shadow(0 0.125em 0.25em rgba(9, 30, 80, 0.2));
    }

    & .facultyinfo {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

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
    flex: 0.45;
    display: flex;
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

  & > .deletebtn {
    position: absolute;
    right: 0.8em;
    top: 0.8em;
    display: none;
  }
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

const facultyData = [
  {
    index: 1,
    image: "http://unsplash.it/1000/1503",
    name: "Kit Harrington",
    status: "VERIFIED",
    email: "shivaboss5552@gmail.com",
    classCount: 70,
    batchCount: 22,
    joined: "27 Oct 2018",
  },
  {
    index: 2,
    image: "http://unsplash.it/1000/1504",
    name: "Jaimie Lannister",
    status: "INVITED",
    email: "shivaboss5552@gmail.com",
    classCount: 69,
    batchCount: 22,
  },
  {
    index: 3,
    image: "http://unsplash.it/1000/1505",
    name: "Barrister Selmydawwwwwwwwwwwwwwwwww",
    status: "UNVERIFIED",
    classCount: 48,
    batchCount: 5,
  },
  {
    index: 4,
    image: "http://unsplash.it/1000/1506",
    name: "Petry Bailish",
    status: "VERIFIED",
    email: "sweetjesus5552@gmail.com",
    classCount: 105,
    batchCount: 18,
    joined: "27 Oct 2019",
  },
];

function FacultyCard({
  index,
  image,
  name,
  status,
  email,
  classCount,
  batchCount,
  joined,
}) {
  let canAddInvitationEmail = false;
  let canResendInvitation = false;
  let canEditInvitationEmail = false;
  let statusTagColor = "";

  switch (status.toLowerCase()) {
    case "verified":
      statusTagColor = "green";
      break;

    case "invited":
      statusTagColor = "orange";
      canEditInvitationEmail = true;
      canResendInvitation = true;
      break;

    case "unverified":
      statusTagColor = "red";
      canAddInvitationEmail = true;
  }

  return (
    <FacultyCardWrapper>
      <div className="leftsection">
        <span className="index">{index}.</span>
        <img width="80px" height="80px" src={image} alt="Faculty Image" />
        <div className="facultyinfo">
          <div>
            <ToolTip maxLength={16}>
              <span className="facultyname">{name}</span>
            </ToolTip>
            <Tag color={statusTagColor} text={status} />
          </div>
          <ToolTip maxLength={30}>
            <span className="facultyemail">{email || ""}</span>
          </ToolTip>
        </div>
      </div>

      <div className="rightsection">
        <div className="facultydetails">
          <span>
            Teaches in {classCount} classes{" "}
            <Dim style={{ cursor: "pointer" }}>(View)</Dim>
          </span>
          <span>
            Assigned to {batchCount} batches{" "}
            <Dim style={{ cursor: "pointer" }}>(View)</Dim>
          </span>

          {joined && (
            <span>
              Joined <Dim>17 Oct 2018</Dim>
            </span>
          )}
        </div>
      </div>

      <RoundedIconButton className="deletebtn" color="red">
        <i class="fas fa-trash"></i>
      </RoundedIconButton>

      <ActionBar>
        {canEditInvitationEmail && (
          <div>
            <span>Edit Invitation Email</span>
            <EditIcon color="primary" />
          </div>
        )}

        {canResendInvitation && (
          <div>
            <span>Resend Invite</span>
            <SendIcon style={{ color: "green" }} />
          </div>
        )}
        {canAddInvitationEmail && (
          <div>
            <span>Add Invitation Email</span>
            <AddBoxIcon color="secondary" />
          </div>
        )}
      </ActionBar>
    </FacultyCardWrapper>
  );
}

function Faculty() {
  return (
    <MainContainer>
      <Topbar>
        <Searchbar placeholder="Search for Faculties.." />
        <RoundedIconButton size="3em">
          <i className="fas fa-user-plus" style={{ fontSize: "1.5em" }}></i>
        </RoundedIconButton>
      </Topbar>
      <StatusBar>
        <h3>All faculties (40)</h3>
        <h3>Page 2/6</h3>
      </StatusBar>

      <CardContainer>
        {facultyData.map((item) => {
          return <FacultyCard {...item} />;
        })}
      </CardContainer>

      <PaginationButton disablePrev={true} />
    </MainContainer>
  );
}

export default Faculty;
