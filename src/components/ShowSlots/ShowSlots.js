import React from "react";
import "./ShowSlots.css";

function ShowSlots() {
  return (
    <section class="weekday">
      <div class="weekday__title">
        <span>MONDAY </span>
      </div>
      <div class="weekday__slots">
        <div class="weekday_slotContainer">
          <span class="weekday_slotIndex">1.</span>
          <div class="slot">
            <button class="slot__edit">
              <i class="fa fa-pencil-square" aria-hidden="true"></i>
              <p>Edit Slot</p>
            </button>
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
            <i class="fa fa-trash" aria-hidden="true" id="slot__delete"></i>
          </div>
        </div>

        <div class="weekday_slotContainer">
          <span class="weekday_slotIndex">2.</span>
          <div class="slot">
            <button class="slot__edit">
              <i class="fa fa-pencil-square" aria-hidden="true"></i>
              <p>Edit Slot</p>
            </button>
            <span class="slot__title">Distributed System</span>
            <div class="slot__person">
              <span id="by">By</span>
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
            <i class="fa fa-trash" aria-hidden="true" id="slot__delete"></i>
          </div>
        </div>

        <div class="weekday_slotContainer">
          <span class="weekday_slotIndex">3.</span>
          <div class="slot">
            <button class="slot__edit">
              <i class="fa fa-pencil-square" aria-hidden="true"></i>
              <p>Edit Slot</p>
            </button>
            <span class="slot__title">Distributed System</span>
            <div class="slot__person">
              <span id="by">By</span>
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
            <i class="fa fa-trash" aria-hidden="true" id="slot__delete"></i>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShowSlots;
