import React,{useState,useEffect} from "react";

import "./App.css";

//External Library Imports

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from 'axios'; 

//Internal Imports
import Sidebar from "./components/Sidebar/Sidebar";
import AddSlots from "./components/AddSlots/AddSlots";
import Slots from "./components/Slots/Slots";
import Stats from "./components/Stats/Stats";

import data from "./testData";

const top100Films = [{ title: "C.S.E 4th Year", year: 1994 }]; 

function App() {
  

  const [main,setMain] = useState(data);

  useEffect(() => {
    
    async function fetchData(){

      const dashboardData = await axios.get(`http://localhost:8000/api/admin-batch/4/`,{headers: {
    'Authorization': 'Token 7529b12f6d032b6779a34679d07ada6759caf5ee'
  }}).then(res => res.data)
      console.log(dashboardData, "API")

      setMain(dashboardData.data)
    }

    fetchData()


  }, [])

  const {totalStudents,totalClasses,totalFaculties,verifiedFaculties,isActive} = main;

  const weekdayData = main.weekdayData;

  const createClass = async (final) => {

    const {title,startTime,endTime,weekdayChoice,facultyChoice} = final;

    console.log(title,startTime,endTime,weekdayChoice,facultyChoice)

    const newSlotResponse = await axios.post(`http://localhost:8000/api/admin-slots/`,{"title":title,"faculty":facultyChoice,"schedule":4,"slot":{"start_time":startTime,"end_time":endTime,"weekday":weekdayChoice}},{headers: {
    'Authorization': 'Token 7529b12f6d032b6779a34679d07ada6759caf5ee'
  }}).then(res => res.data)

    

    console.log(newSlotResponse.data,"RESPONSE")

    const newSlot = newSlotResponse.data

    const weekday = newSlot.weekday
    delete newSlot.weekday

    
    const modified = JSON.parse(JSON.stringify(main))
    modified['totalClasses'] += 1
    modified.weekdayData[weekday].push(newSlot)
    setMain(modified)

  }

  const deleteClass = async (id) => {

    const deleteSlotResponse = await axios.delete(`http://localhost:8000/api/admin-slots/${id}/`,{headers: {
    'Authorization': 'Token 7529b12f6d032b6779a34679d07ada6759caf5ee'
  }}).then(res => res.data)

  console.log(deleteSlotResponse)

  const deleteSlot = deleteSlotResponse.data

  const weekday = deleteSlot.weekday
  delete deleteSlot.weekday

  const modified = JSON.parse(JSON.stringify(main))
  modified['totalClasses'] -= 1
  modified.weekdayData[weekday] = modified.weekdayData[weekday].filter((item) => item.id !== deleteSlot.id)
  setMain(modified)

  }


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
              <i className="fas fa-plus-square"></i>
            </div>

            <div className="showdata__batchToggle">
              <span>STATUS </span>
              <span>&nbsp;:&nbsp;&nbsp;</span>
              <label className="activeToggle" htmlFor="toggle">
                <input type="checkbox" name="" checked={isActive} id="toggle" />
                <div className="toggle"></div>
              </label>
            </div>
          </div>
          <Stats  info = {{totalStudents,totalClasses,totalFaculties,verifiedFaculties,isActive}}/>
          <Slots
            weekdayData={Object.keys(weekdayData).map((key) => ({
              week: key,
              data: weekdayData[key],
              
            }))}

            deleteClass = {deleteClass}
          />
        </section>

        <section className="right">
          <AddSlots createClass={createClass} />
        </section>
      </div>
    </div>
  );
}

export default App;
