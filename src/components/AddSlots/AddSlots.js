import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import "./style.css";

function AddSlots() {
  const [tick, setTick] = useState(undefined);
  const sampleData = [
    {
      id: 1,
      name: "Amit Maurya",
      img: "http://unsplash.it/1000/1501",
      status: "VERIFIED",
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
      status: "INVITED",
    },
  ];

  return (
    <div className="container">
      <div className="editDeck">
        <input
          type="text"
          name=""
          id="editDeck__title"
          placeholder="Title for the class..."
        />

        <div className="editDeck__timingControls">
          <div className="editDeck__weekday">
            <select name="" id="">
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

          <div className="spacing"></div>

          <div className="editDeck__endTime">
            <div className="editDeck__iconContainer">
              <i class="fas fa-clock"></i>
            </div>
            <input type="text" name="" id="" placeholder="End Time" />
          </div>
        </div>

        <hr id="divider" />
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

                  <div className="editDeck__faculty">
                    <img className="editDeck__image" src={img} alt="" />
                    <span>{name}</span>
                  </div>

                  <span className="editDeck__status">{status}</span>
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

        <Button id="save" variant="contained">
          <i class="fas fa-plus-square"></i>
          <span>CREATE CLASS</span>
        </Button>
      </div>
    </div>
  );
}

export default AddSlots;
