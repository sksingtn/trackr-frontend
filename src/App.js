import React from "react";
import ProfileImage from "./assets/profileImage.png";
import "./App.css";
import Button from "@material-ui/core/Button";
import AddSlots from "./components/AddSlots/AddSlots";
import ShowSlots from "./components/ShowSlots/ShowSlots";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const top100Films = [
  { title: "C.S.E 4th Year", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  { title: "The Lord of the Rings: The Return of the King", year: 2003 },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  { title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001 },
  { title: "Star Wars: Episode V - The Empire Strikes Back", year: 1980 },
  { title: "Forrest Gump", year: 1994 },
];

function App() {
  return (
    <div className="main">
      <div className="main__body">
        <div className="sidebar">
          <div className="sidebar__logo">
            <i class="fas fa-calendar-week" id="logo"></i>
            <span className="sidebar__name">Trackr</span>
          </div>

          <div className="sidebar__profile">
            <div className="sidebar__profileImage">
              <img src={ProfileImage} alt="" />
            </div>
            <span className="sidebar__profileName">Shivam Singh</span>
            <span className="sidebar__profilePosition">ADMIN</span>
          </div>

          <div className="sidebar__links">
            <label className="sidebar__link">
              <i class="fas fa-chart-area"></i>
              <span className="sidebar__linkText">Dashboard</span>
            </label>
            <label className="sidebar__link">
              <i class="fas fa-user-graduate"></i>
              <span className="sidebar__linkText">Batch</span>
            </label>
            <label className="sidebar__link">
              <i class="fas fa-question-circle"></i>
              <span className="sidebar__linkText">Help</span>
            </label>
            <label className="sidebar__link">
              <i class="fas fa-cog"></i>
              <span className="sidebar__linkText">Settings</span>
            </label>
          </div>

          <Button id="logout" variant="contained">
            <i class="fas fa-sign-out-alt"></i>
            <span>LOGOUT</span>
          </Button>
        </div>

        <section className="showdata">
          <div className="showdata__batch">
            <Autocomplete
              id="combo-box-demo"
              className="showdata__select"
              options={top100Films}
              getOptionLabel={(option) => option.title}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select a Batch"
                  variant="outlined"
                />
              )}
            />
            <span>OR</span>
            <i class="fas fa-plus-square"></i>
          </div>
          <div className="showdata__cards">
            <div className="showdata__students">
              <span>Total Students</span>
              <span>0</span>
            </div>

            <div className="showdata__faculties">
              <span>Total Faculties</span>
              <span>4/10 Verified</span>
              <div class="progressBar">
                <div class="progressBar__content"></div>
              </div>
            </div>

            <div className="showdata__classes">
              <span>Total classes</span>
              <span>12</span>
            </div>
          </div>

          <div className="showdata__search">
            <input type="text" name="" placeholder="Search classes.." />

            <button className="showdata__searchButton">
              <i class="fas fa-search"></i>
            </button>
          </div>

          <div className="weekdayContainer">
            <i class="fas fa-chevron-left"></i>
            <ShowSlots />
            <ShowSlots />
            <ShowSlots />
            <i class="fas fa-chevron-right"></i>
          </div>
        </section>

        <section className="right">
          <AddSlots />
        </section>
      </div>
    </div>
  );
}

export default App;
