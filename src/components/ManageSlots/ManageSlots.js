import React, { useState, useEffect, useRef, Fragment } from "react";
import Tooltip from "../Utils/Tooltip/Tooltip";

//External Imports
import axios from "axios";
import Skeleton from "@material-ui/lab/Skeleton";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import EmailIcon from "@material-ui/icons/Email";

import {
  ManageSlotContainer,
  Divider,
  TitleInput,
  TimeInputWrapper,
  SelectFacultySection,
  FacultyCardContainer,
  FacultyCardWrapper,
  InviteFacultySection,
} from "./style";
import TimeInput from "../../baseUI/TimeInput";
import { Tab, Tabs as BaseTabs } from "../../baseUI/Tabs";
import PaginationButton from "../../baseUI/PaginationButton";
import SearchBar from "../../baseUI/SearchBar";
import Checkbox from "../../baseUI/Checkbox";
import Tag from "../../baseUI/Tag";
import Dim from "../../baseUI/Dim";
import styled from "styled-components";

//TODO:Animate height change

const ModifiedPaginationButton = styled(PaginationButton)`
  margin-top: 0.6em;
  font-size: 1.35em;
`;

const Tabs = styled(BaseTabs)`
  font-size: 1.3em;
  margin-bottom: 0.6em;

  & .text {
    margin-right: 0.8em;
    text-transform: capitalize;
    letter-spacing: 0.04em;
  }
`;

const sampleData = [
  {
    id: 1,
    name: "Amit Maurya",
    img: "http://unsplash.it/1000/1501",
    status: "UNVERIFIED",
  },
  {
    id: 2,
    name: "Ramjeet Yadav",
    img: "http://unsplash.it/1000/1502",
    status: "INVITED",
  },
  {
    id: 3,
    name: "Arvind Singh",
    img: "http://unsplash.it/1000/1503",
    status: "UNVERIFIED",
  },
  {
    id: 4,
    name: "Pradeep Kumar",
    img: "http://unsplash.it/1000/1504",
    status: "VERIFIED",
  },
  {
    id: 5,
    name: "Utkarsh Singh",
    img: "http://unsplash.it/1000/1505",
    status: "UNVERIFIED",
  },
];

function FacultyCard({
  checked,
  index,
  imgURL,
  facultyName,
  status,
  onClick,
  loading,
}) {
  function getTagColor(status) {
    switch (status.toLowerCase()) {
      case "verified":
        return "green";
      case "invited":
        return "orangered";
      case "unverified":
        return "red";
      default:
        return "green";
    }
  }

  return (
    <FacultyCardWrapper checked={checked} onClick={onClick}>
      {loading ? (
        <Skeleton
          style={{ width: "80%", height: "100%", marginLeft: "5%" }}
          animation="wave"
        />
      ) : (
        <Fragment>
          <Checkbox
            checked={checked}
            rounded={false}
            thickness="2px"
            color="#B6244F"
          />
          <span className="index">{index}.</span>
          <img
            src={imgURL}
            alt="Faculty profile image"
            className="profileimg"
          />
          <Tooltip maxLength={15}>
            <span className="name">{facultyName}</span>
          </Tooltip>
          <Tag color={getTagColor(status)} text={status} />
        </Fragment>
      )}
    </FacultyCardWrapper>
  );
}

function ManageSlots({ createClass }) {
  //To Handle the TAB changes between search section & add section
  const [tab, setTab] = useState(0);

  //To Handle the API data
  const [faculty, setFaculty] = useState({
    count: 0,
    next: null,
    previous: null,
    results: sampleData,
    loading: false,
    isSearch: false,
  });

  //To handle Form Changes
  const [form, setForm] = useState({
    title: "",
    startTime: "",
    endTime: "",
    weekdayChoice: "0",
    facultyChoice: undefined,
  });

  let selectStyle = {};
  if (form.weekdayChoice === "0") {
    selectStyle = { fontWeight: 400, color: "rgb(93, 92, 92)" };
  }

  //To handle form changes in Add faculty section
  const [invite, setInvite] = useState({ name: "", email: "" });

  //To Handler Faculty Search Bar
  const [facultySearch, setFacultySearch] = useState("");

  const handleInvite = async () => {
    const postData = { name: invite.name };
    const email = invite.email;
    if (email) {
      postData["email"] = email;
    }
    console.log(postData);

    const newFacultyResponse = await axios
      .post(`http://localhost:8000/api/admin-faculty/`, postData, {
        headers: {
          Authorization: "Token 5cb0055b1e6fdb316389af267b0a1c3a43c085b5",
        },
      })
      .then((res) => res.data);

    console.log(newFacultyResponse);
    setInvite({ name: "", email: "" });
  };

  useEffect(() => {
    //Load new faculty data on component load & Tab Change
    handlePagination(`http://localhost:8000/api/admin-faculty/`);
  }, [tab]);

  const handleSave = () => {
    createClass(form);
    setForm({
      title: "",
      startTime: "",
      endTime: "",
      weekdayChoice: "0",
      facultyChoice: undefined,
    });
  };

  const handlePagination = async (url, isSearch = false) => {
    setFaculty({ ...faculty, loading: true });
    const facultydData = await axios
      .get(url, {
        headers: {
          Authorization: "Token 5cb0055b1e6fdb316389af267b0a1c3a43c085b5",
        },
      })
      .then((res) => res.data);
    setTimeout(
      () => setFaculty({ ...facultydData, loading: false, isSearch: isSearch }),
      1000
    );
  };

  const handleFacultySearch = () => {
    if (facultySearch) {
      handlePagination(
        `http://localhost:8000/api/admin-faculty/?q=${facultySearch}`,
        true
      );
    }
  };

  const handleTimeInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleClear = () => {
    handlePagination(`http://localhost:8000/api/admin-faculty/`);
    setTimeout(() => setFacultySearch(""), 500);
  };

  const handleFacultySelect = (id) => {
    console.log("faculty clicked");
    if (id === form.facultyChoice) {
      setForm({ ...form, facultyChoice: null });
    } else {
      setForm({ ...form, facultyChoice: id });
    }
  };

  return (
    <ManageSlotContainer>
      <div className="heading">
        <span>Add a New Class</span>
      </div>

      <Divider />

      <TitleInput
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <div className="weekdayDropdown">
        <select
          value={form.weekdayChoice}
          style={selectStyle}
          onChange={(e) => setForm({ ...form, weekdayChoice: e.target.value })}>
          <option value="0">Choose a weekday</option>
          <option value="Sunday">Sunday</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
        </select>
        <span className="icon">
          <i className="fas fa-caret-down fa-2x"></i>
        </span>
      </div>

      <TimeInputWrapper>
        <TimeInput
          placeholder="From hh:mm"
          name="startTime"
          value={form.startTime}
          onChange={handleTimeInput}
        />

        <TimeInput
          placeholder="To hh:mm"
          name="endTime"
          value={form.endTime}
          onChange={handleTimeInput}
        />
      </TimeInputWrapper>

      <Divider />

      <Tabs>
        <Tab
          text="Select"
          icon={<i class="fas fa-list" aria-hidden="true"></i>}
          checked={tab === 0}
          onClick={() => setTab(0)}
        />
        <Tab
          text="Invite"
          icon={<i class="fas fa-user-plus"></i>}
          checked={tab === 1}
          onClick={() => setTab(1)}
        />
      </Tabs>
      {tab === 0 && (
        <SelectFacultySection hidden={tab !== 0}>
          <SearchBar
            placeholder={`Search in ${faculty.count} faculties...`}
            value={facultySearch}
            onChange={(e) => setFacultySearch(e.target.value)}
            onSearch={handleFacultySearch}
            showClear={faculty.isSearch}
            onClear={handleClear}
            style={{ marginBottom: "0.5em" }}
          />

          {faculty.results.length === 0 && (
            <span className="highlight">No Faculties Found!</span>
          )}

          <FacultyCardContainer>
            {faculty.results.map((item, count) => {
              const { id, name, image, status, index } = item;

              return (
                <FacultyCard
                  id={id}
                  index={index}
                  facultyName={name}
                  imgURL={sampleData[count].img}
                  status={status}
                  checked={id === form.facultyChoice}
                  onClick={() => handleFacultySelect(id)}
                  loading={faculty.loading}
                />
              );
            })}
          </FacultyCardContainer>

          <ModifiedPaginationButton
            onPrev={() => handlePagination(faculty.previous, faculty.isSearch)}
            disablePrev={faculty.previous === null}
            onNext={() => handlePagination(faculty.next, faculty.isSearch)}
            disableNext={faculty.next === null}
          />
        </SelectFacultySection>
      )}

      {tab === 1 && (
        <InviteFacultySection>
          <TextField
            value={invite.name}
            onChange={(e) => setInvite({ ...invite, name: e.target.value })}
            id="outlined-basic"
            label="Faculty Name"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle
                    style={{ color: "#b6244f" }}
                    color="secondary"
                  />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            value={invite.email}
            onChange={(e) => setInvite({ ...invite, email: e.target.value })}
            id="outlined-basic"
            label="Email (Optional)"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon style={{ color: "#b6244f" }} color="secondary" />
                </InputAdornment>
              ),
            }}
          />

          <Dim>Note:An Email Invite would be sent, if its provided.</Dim>

          <Button
            id="addFacultyButton"
            variant="contained"
            color="primary"
            onClick={handleInvite}>
            <i className="fas fa-user-plus"></i>
            <span>Add Faculty</span>
          </Button>
        </InviteFacultySection>
      )}

      <Divider />

      <Button id="createclassbtn" variant="contained" onClick={handleSave}>
        <i className="fas fa-plus-square"></i>
        <span className="label">CREATE CLASS</span>
      </Button>
    </ManageSlotContainer>
  );
}

export default ManageSlots;
