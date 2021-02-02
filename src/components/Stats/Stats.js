import React from "react";
import "./Stats.css";

function Stats() {
  return (
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
  );
}

export default Stats;
