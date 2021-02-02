import React, { Fragment, useState } from "react";
import "./Slots.css";

function ShowSlots({ day, slotData }) {
  console.log(slotData);
  return (
    <section class="weekday">
      <div class="weekday__title">
        <span>{day}</span>
        <span className="weekday__classCount">{slotData.length} Classes</span>
      </div>

      <div class="weekday__slots" id="style-1">
        {slotData.map((slot, index) => {
          const {
            id,
            created,
            duration,
            facultyName,
            title,
            startTime,
            endTime,
          } = slot;

          return (
            <div key={id} class="weekday_slotContainer">
              <span class="weekday_slotIndex">{index + 1}.</span>

              <label htmlFor={id}>
                <input
                  type="checkbox"
                  className="slotActivator"
                  name={id}
                  id={id}
                />
                <div class="slot">
                  {/*Elements that appear on Slot Hover*/}
                  <button class="slot__edit">
                    <i class="fa fa-pencil-square" aria-hidden="true"></i>
                    <p>Edit Slot</p>
                  </button>

                  <button id="slot__delete">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>

                  {/*Elements that disappear on Slot Hover*/}

                  <div className="slot__meta">
                    <span className="slot__duration">{duration}</span>
                    <span className="slot__lastActivity">{created}</span>
                  </div>

                  <span class="slot__title">{title}</span>
                  <div class="slot__person">
                    <span id="by">By </span>
                    <span class="slot__personName">{facultyName}</span>
                  </div>
                  <div class="slot__timing">
                    <i
                      class="fa fa-hourglass-start"
                      id="slot__icon"
                      aria-hidden="true"></i>
                    <span class="slot__start">09:00PM</span>
                    <span class="slot__sep">-</span>
                    <span class="slot__end">10:00AM</span>
                  </div>
                </div>
              </label>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Slots({ weekdayData }) {
  const [position, setPosition] = useState(0);

  const weekdayPerPage = 3;

  const pageData = weekdayData
    .slice(position, position + weekdayPerPage)
    .concat(weekdayData.slice(0, position > 4 ? position + 3 - 7 : 0));

  console.log(pageData);

  return (
    <Fragment>
      <div className="showdata__search">
        <input type="text" name="" placeholder="Search classes.." />

        <button className="showdata__searchButton">
          <i class="fas fa-search"></i>
        </button>
      </div>

      <div className="weekdayContainer">
        <i
          class="fas fa-chevron-left"
          onClick={(e) => setPosition(position === 0 ? 6 : position - 1)}></i>
        {pageData.map((item) => (
          <ShowSlots day={item.week} slotData={item.data} />
        ))}

        <i
          class="fas fa-chevron-right"
          onClick={(e) => setPosition(position === 6 ? 0 : position + 1)}></i>
      </div>
    </Fragment>
  );
}

export default Slots;
