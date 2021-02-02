import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import EmailIcon from "@material-ui/icons/Email";
import "./AddSlots.css";

function AddSlots() {
  const [tick, setTick] = useState(undefined);
  const [tab, setTab] = useState(0);

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
      name: "Shivam Singh",
      img: "http://unsplash.it/1000/1503",
      status: "UNVERIFIED",
    },
    {
      id: 4,
      name: "John Snow",
      img: "http://unsplash.it/1000/1504",
      status: "VERIFIED",
    },
    {
      id: 5,
      name: "Petyr Baelish",
      img: "http://unsplash.it/1000/1505",
      status: "UNVERIFIED",
    },
  ];

  return (
    <div className="editDeck">
      <div className="editDeck__statusBar">
        <span className="editDeck__statusText">Add a New Class</span>
      </div>
      <hr id="divider" />
      <input
        type="text"
        name=""
        id="editDeck__title"
        placeholder="Title for the class..."
      />

      <div className="editDeck__timingControls">
        <div className="editDeck__weekday">
          <select name="" id="">
            <option value="" selected>
              Select a weekday
            </option>
            <option value="">Sunday</option>
            <option value="">Monday</option>
            <option value="">Tuesday</option>
            <option value="">Wednesday</option>
            <option value="">Thursday</option>
            <option value="">Friday</option>
            <option value="">Saturday</option>
          </select>
          <div className="editDeck__dropdown">
            <i class="fas fa-caret-down fa-2x"></i>
          </div>
        </div>
      </div>

      <div className="editDeck__time">
        <div className="editDeck__startTime">
          <div className="editDeck__iconContainer">
            <i class="fas fa-clock"></i>
          </div>

          <input type="text" name="" id="" placeholder="Start Time" />
        </div>

        <div className="editDeck__endTime">
          <div className="editDeck__iconContainer">
            <i class="fas fa-clock"></i>
          </div>
          <input type="text" name="" id="" placeholder="End Time" />
        </div>
      </div>

      <hr id="divider" />

      {/*Tabs*/}
      <div className="editDeck__tabs">
        <Button
          className={`editDeck__tab ${tab === 0 && "editDeck__tab--active"}`}
          onClick={(e) => setTab(0)}
          disableElevation
          style={{ borderRadius: 0, boxSizing: "border-box" }}
          variant="contained">
          <i class="fas fa-list"></i>
          <span style={{ textTransform: "capitalize" }}>Select</span>
        </Button>
        <Button
          className={`editDeck__tab ${tab === 1 && "editDeck__tab--active"}`}
          onClick={(e) => setTab(1)}
          disableElevation
          style={{ borderRadius: 0 }}
          variant="contained">
          <i class="fas fa-user-plus"></i>
          <span style={{ textTransform: "capitalize" }}>Invite</span>
        </Button>
      </div>

      {/*Search Faculties Section*/}
      <section className="selectFaculties" hidden={tab !== 0}>
        <div className="editDeck__searchFaculty">
          <input type="text" name="" placeholder="Search faculties.." />

          <button className="editDeck__searchButton">
            <i class="fas fa-search"></i>
          </button>
        </div>

        <ul className="editDeck__items">
          {sampleData.map((item, index) => {
            const { id, name, img, status } = item;

            return (
              <li id={id}>
                <label
                  htmlFor={name}
                  className={`editDeck__item ${
                    index === tick ? "editDeck__item--checked" : ""
                  }`}>
                  <input
                    type="radio"
                    name="facultyList"
                    id={name}
                    checked={index === tick}
                    onChange={() => setTick(index)}
                  />
                  <div className="actualradio"></div>

                  <span className="editDeck__index">{index + 1}.</span>
                  <div className="editDeck__faculty">
                    <img className="editDeck__image" src={img} alt="" />
                    <span>{name}</span>
                  </div>

                  <span
                    className={`editDeck__status ${
                      index % 2 === 0 ? "editDeck__status--failed" : ""
                    }`}>
                    {status}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>

        <div className="editDeck__controls">
          <button id="editDeck__previous">
            <i class="fas fa-backward"></i>
            <span>Previous</span>
          </button>

          <button id="editDeck__next">
            <span>Next</span>
            <i class="fas fa-forward"></i>
          </button>
        </div>
      </section>

      {tab === 1 && (
        <section className="addFaculties" hidden={tab !== 1}>
          <TextField
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

          <span className="addFaculties__note">
            Note:An Email Invite would be sent, if its provided.
          </span>
          <Button id="addFacultyButton" variant="contained" color="primary">
            <i class="fas fa-user-plus"></i>
            <span>Add Faculty</span>
          </Button>
        </section>
      )}

      <hr id="divider" />

      <Button id="save" variant="contained">
        <i class="fas fa-plus-square"></i>
        <span>CREATE CLASS</span>
      </Button>
    </div>
  );
}

export default AddSlots;
