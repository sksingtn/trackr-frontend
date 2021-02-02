import React from "react";

import "./App.css";

//External Library Imports

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

//Internal Imports
import Sidebar from "./components/Sidebar/Sidebar";
import AddSlots from "./components/AddSlots/AddSlots";
import Slots from "./components/Slots/Slots";
import Stats from "./components/Stats/Stats";

import data from "./testData";

const top100Films = [{ title: "C.S.E 4th Year", year: 1994 }];

function App() {
  const weekdayData = data.weekdayData;
  return (
    <div className="main">
      <div className="main__body">
        <section className="left">
          <Sidebar />
        </section>

        <section className="showdata">
          <div className="showdata__batch">
            <div className="showdata__batchControls">
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

            <div className="showdata__batchToggle">
              <span>STATUS </span>
              <span>&nbsp;:&nbsp;&nbsp;</span>
              <label className="activeToggle" htmlFor="toggle">
                <input type="checkbox" name="" id="toggle" />
                <div className="toggle"></div>
              </label>
            </div>
          </div>
          <Stats />
          <Slots
            weekdayData={Object.keys(weekdayData).map((key) => ({
              week: key,
              data: weekdayData[key],
            }))}
          />
        </section>

        <section className="right">
          <AddSlots />
        </section>
      </div>
    </div>
  );
}

export default App;
