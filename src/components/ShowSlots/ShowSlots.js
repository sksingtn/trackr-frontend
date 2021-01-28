import React from "react";
import "./ShowSlots.css";

import "simplebar"; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import "simplebar/dist/simplebar.css";

function ShowSlots({ day }) {
  return (
    <section class="weekday">
      <div class="weekday__title">
        <span>{day}</span>
      </div>

      {/*<Scrollbars autoHeight autoHeightMax={400}>*/}

      <div class="weekday__slots" id="style-1">
        <div class="weekday_slotContainer">
          <span class="weekday_slotIndex">1.</span>

          <label htmlFor="1">
            <input type="checkbox" className="slotActivator" name="" id="1" />
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
                <span className="slot__duration">45 Mins</span>
                <span className="slot__lastActivity">10 seconds ago</span>
              </div>

              <span class="slot__title">Distributed System</span>
              <div class="slot__person">
                <span id="by">By </span>
                <span class="slot__personName">Amit Maurya</span>
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

        <div class="weekday_slotContainer">
          <span class="weekday_slotIndex">2.</span>
          <label htmlFor="2">
            <input
              type="checkbox"
              className="slotActivator"
              name="test"
              id="2"
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
                <span className="slot__duration">45 Mins</span>
                <span className="slot__lastActivity">10 seconds ago</span>
              </div>

              <span class="slot__title">Distributed System</span>
              <div class="slot__person">
                <span id="by">By </span>
                <span class="slot__personName">Amit Maurya</span>
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

        <div class="weekday_slotContainer">
          <span class="weekday_slotIndex">3.</span>
          <label htmlFor="3">
            <input
              type="checkbox"
              className="slotActivator"
              name="test"
              id="3"
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
                <span className="slot__duration">45 Mins</span>
                <span className="slot__lastActivity">10 seconds ago</span>
              </div>

              <span class="slot__title">Distributed System</span>
              <div class="slot__person">
                <span id="by">By </span>
                <span class="slot__personName">Amit Maurya</span>
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

        <div class="weekday_slotContainer">
          <span class="weekday_slotIndex">3.</span>
          <label htmlFor="3">
            <input
              type="checkbox"
              className="slotActivator"
              name="test"
              id="3"
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
                <span className="slot__duration">45 Mins</span>
                <span className="slot__lastActivity">10 seconds ago</span>
              </div>

              <span class="slot__title">Distributed System</span>
              <div class="slot__person">
                <span id="by">By </span>
                <span class="slot__personName">Amit Maurya</span>
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
      </div>
    </section>
  );
}

export default ShowSlots;
