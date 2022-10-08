import React, { useState, useEffect, Fragment } from "react";

import { useSelector, useDispatch } from "react-redux";
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
  CurrentFaculty
} from "./style";
import TimeInput from "../../baseUI/TimeInput";
import { Tab, Tabs as BaseTabs } from "../../baseUI/Tabs";
import PaginationButton from "../../baseUI/PaginationButton";
import SearchBar from "../../baseUI/SearchBar";
import Checkbox from "../../baseUI/Checkbox";
import Tag from "../../baseUI/Tag";
import Dim from "../../baseUI/Dim";
import styled from "styled-components";
import Tooltip from "../Utils/Tooltip/Tooltip";
import { setToastSuccess, setToastError } from "../Utils/Toast/toastSlice";
import { IDLE_STATE, PENDING_STATE, FETCHED_STATE } from "../constants"
import { ADMIN_CREATE_SLOT, ADMIN_LIST_CREATE_FACULTY, adminSlotRetriveUpdateDeleteUrl } from "../urls";
import axiosInstance from "../axios";
import {
  selectCurrentBatch, selectCurrentSlot,
  setSlot, resetSelectedSlot, updateSlot
} from "../AdminDashboard/adminDashboardSlice";

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
    img: "http://unsplash.it/800/600",
    status: "UNVERIFIED",
  },
  {
    id: 2,
    name: "Ramjeet Yadav",
    img: "http://unsplash.it/800/600",
    status: "INVITED",
  },
  {
    id: 3,
    name: "Arvind Singh",
    img: "http://unsplash.it/800/600",
    status: "UNVERIFIED",
  },
  {
    id: 4,
    name: "Pradeep Kumar",
    img: "http://unsplash.it/800/600",
    status: "VERIFIED",
  },
  {
    id: 5,
    name: "Utkarsh Singh",
    img: "http://unsplash.it/800/601",
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

function ManageSlots(props) {

  const dispatch = useDispatch();
  const selectedBatch = useSelector(selectCurrentBatch);
  const selectedSlot = useSelector(selectCurrentSlot);
  //To Handle the TAB changes between search section & add section
  const [tab, setTab] = useState(0);

  //To Handle the API data
  const [facultyList, setFacultyList] = useState({
    count: 0,
    // next: null,
    // previous: null,
    currentPage: 1,
    totalPages: 1,
    results: sampleData,
    status: IDLE_STATE,
    isSearch: false,
  });

  //To handle Form Changes
  const formInitialState = {
    title: "",
    start_time: "",
    end_time: "",
    weekday: "",
    faculty: { id: null, name: null, image: null },
  }
  const [form, setForm] = useState(formInitialState);

  let canSaveForm = false
  if (form.title && form.weekday !== "" && form.faculty.id
    && (form.start_time.length + form.end_time.length === 10)) {
    canSaveForm = true
  }

  let selectStyle = {};
  if (form.weekday === "") {
    selectStyle = { fontWeight: 400, color: "rgb(93, 92, 92)" };
  }

  //To handle form changes in Add faculty section
  const [invite, setInvite] = useState({ name: "", email: "" });

  //To Handler Faculty Search Bar
  const [facultySearch, setFacultySearch] = useState("");

  useEffect(() => {
    //Load new faculty data on component load & Tab Change
    if (facultyList.status === IDLE_STATE && tab === 0) {
      fetchFacultyList();
    }
  }, [tab]);

  useEffect(() => {
    setForm(formInitialState)
  }, [selectedBatch])

  useEffect(async () => {
    if (selectedSlot) {
      try {
        const response = await axiosInstance.get(adminSlotRetriveUpdateDeleteUrl(selectedSlot))
        const { title, startTime: start_time, endTime: end_time, weekday, faculty } = response.data.data
        setForm({ ...form, title, start_time, end_time, weekday, faculty })

      }
      catch (err) {
        dispatch(setToastError("Something went wrong!"))
      }
    }

  }, [selectedSlot])




  const handleInvite = async () => {
    const postData = { name: invite.name };
    const email = invite.email;
    if (email) {
      postData["email"] = email;
    }

    try {
      const response = await axiosInstance.post(ADMIN_LIST_CREATE_FACULTY, postData)
      dispatch(setToastSuccess(response.data.data))
      setInvite({ name: "", email: "" });
      //So that faculty page refreshes
      setFacultyList({ ...facultyList, status: IDLE_STATE })
    }
    catch (err) {
      dispatch(setToastError(err.response.data.data))
    }

  };

  //TODO:Refactor
  const handleSave = async () => {

    if (!canSaveForm) {
      dispatch(setToastError("Fill all the mandatory fields!"))
    }

    if (canSaveForm && selectedSlot && selectedBatch) {
      try {
        const postData = {
          ...form,
          faculty: form.faculty.id
        }
        const response = await axiosInstance.put(adminSlotRetriveUpdateDeleteUrl(selectedSlot), postData)
        const payload = {
          slot: response.data.data,
          batch: selectedBatch.id,
        }
        dispatch(updateSlot(payload))
        dispatch(setToastSuccess(`Slot Updated SuccessFully`))
        setForm(formInitialState)
      }
      catch (err) {
        dispatch(setToastError(err.response.data.data))
      }
    }
    else if (canSaveForm && selectedBatch) {
      try {
        const postData = {
          ...form,
          faculty: form.faculty.id,
          batch: selectedBatch.id
        }
        const response = await axiosInstance.post(ADMIN_CREATE_SLOT, postData)
        const payload = {
          slot: response.data.data,
          batch: selectedBatch.id
        }
        dispatch(setSlot(payload))
        dispatch(setToastSuccess(`Slot Saved SuccessFully`))
        setForm(formInitialState)
      }
      catch (err) {
        dispatch(setToastError(err.response.data.data))
      }

    }

  };

  const fetchFacultyList = async (pageNumber = 1, searchquery) => {

    setFacultyList({ ...facultyList, status: PENDING_STATE })

    const response = await axiosInstance.get(ADMIN_LIST_CREATE_FACULTY,
      {
        params: {
          page: pageNumber,
          q: searchquery
        }
      })
    setFacultyList({
      ...response.data, status: FETCHED_STATE,
      isSearch: Boolean(searchquery)
    })
  };

  const handleFacultySearch = () => {
    if (facultySearch.length > 0) {
      fetchFacultyList(1, facultySearch);
    }
  };

  const handleTimeInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleClear = () => {
    fetchFacultyList();
    //setFacultyList({ ...facultyList, isSearch: false })
    setFacultySearch("")
    //setTimeout(() => setFacultySearch(""), 500);
  };

  const handleFacultySelect = (id, name, image) => {

    if (id === form.faculty.id) {
      setForm({ ...form, faculty: { id: null, name: null, image: null } });
    } else {
      setForm({ ...form, faculty: { id, name, image } });
    }
  };

  const handleClearUpdate = () => {
    setForm(formInitialState)
    dispatch(resetSelectedSlot())
  }

  const handleClearFaculty = () => {
    setForm({
      ...form,
      faculty: { id: null, name: null, image: null }
    })
  }

  const selectFacultySection = <SelectFacultySection hidden={tab !== 0}>
    <SearchBar
      placeholder={`Search in ${facultyList.count} faculties...`}
      value={facultySearch}
      onChange={(e) => setFacultySearch(e.target.value)}
      onSearch={handleFacultySearch}
      showClear={facultyList.isSearch}
      onClear={handleClear}
      style={{ marginBottom: "0.5em" }}
    />

    {facultyList.results.length === 0 && (
      <span className="highlight">No Faculties Found!</span>
    )}

    <FacultyCardContainer>
      {facultyList.results.map((item, count) => {
        const { id, name, image, status, index } = item;

        return (
          <FacultyCard
            id={id}
            index={index}
            facultyName={name}
            imgURL={sampleData[count].img}
            status={status}
            checked={id === form.faculty.id}
            onClick={() => handleFacultySelect(id, name, sampleData[count].img)}
            loading={facultyList.status == PENDING_STATE}
          />
        );
      })}
    </FacultyCardContainer>

    <ModifiedPaginationButton
      onPrev={() => fetchFacultyList(facultyList.currentPage - 1, facultyList.isSearch ? facultySearch : undefined)}
      disablePrev={facultyList.currentPage === 1}
      onNext={() => fetchFacultyList(facultyList.currentPage + 1, facultyList.isSearch ? facultySearch : undefined)}
      disableNext={facultyList.currentPage === facultyList.totalPages}
    />
  </SelectFacultySection>

  const inviteFacultySection = <InviteFacultySection>
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


  const facultySection = <>
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
    {tab === 0 && selectFacultySection}

    {tab === 1 && inviteFacultySection}
  </>


  let headingStyle = {}

  if (selectedSlot === null) {
    headingStyle = { textAlign: "center" }
  }
  else {
    headingStyle = {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }

  console.log(facultyList)

  return (
    <ManageSlotContainer>
      <div className="heading" style={headingStyle}>
        {selectedSlot === null ?
          <span>Add a New Slot</span> :
          <>
            <span>Update Existing Slot</span>
            <button className="clearSlot" onClick={handleClearUpdate}>
              <i class="fas fa-times"></i> Clear
            </button>
          </>
        }
      </div>

      <Divider />

      <TitleInput
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <div className="weekdayDropdown">
        <select
          value={form.weekday}
          style={selectStyle}
          onChange={(e) => setForm({ ...form, weekday: e.target.value })}>
          <option value="">Choose a weekday</option>
          <option value="0">Monday</option>
          <option value="1">Tuesday</option>
          <option value="2">Wednesday</option>
          <option value="3">Thursday</option>
          <option value="4">Friday</option>
          <option value="5">Saturday</option>
          <option value="6">Sunday</option>
        </select>
        <span className="icon">
          <i className="fas fa-caret-down fa-2x"></i>
        </span>
      </div>

      <TimeInputWrapper>
        <TimeInput
          placeholder="From hh:mm"
          name="start_time"
          value={form.start_time}
          onChange={handleTimeInput}
        />

        <TimeInput
          placeholder="To hh:mm"
          name="end_time"
          value={form.end_time}
          onChange={handleTimeInput}
        />
      </TimeInputWrapper>

      {selectedSlot === null || (selectedSlot !== null && form.faculty.id === null) ?
        facultySection :
        <CurrentFaculty>
          <img
            src={"http://localhost:8000/media/profile_images/FACULTY/thumbnail/thumbnail_2a95e451-319c-4c1c-b944-8fe53ac76ecb.jpg"}
            alt="Faculty profile image"
            height="32px"
          />
          <Tooltip maxLength={15}>
            <span>{form.faculty.name || ''}</span>
          </Tooltip>
          <button onClick={handleClearFaculty}>Change</button>
        </CurrentFaculty>}

      <Divider />
      <Button id="createclassbtn" variant="contained" onClick={handleSave}>
        {selectedSlot === null ?
          <>
            <i className="fas fa-plus-square"></i>
            <span className="label">CREATE SLOT</span>
          </> :
          <>
            <i class="fas fa-edit"></i>
            <span className="label">UPDATE SLOT</span>
          </>
        }
      </Button>
    </ManageSlotContainer>
  );
}

export default React.memo(ManageSlots);
