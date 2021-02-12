import React from "react";
import "./Stats.css";

function Stats({info}) {

  const {totalStudents,totalClasses,totalFaculties,verifiedFaculties} = info;

  
  return (
    <div className="showdata__cards">
      <div className="showdata__students">
        <span>Total Students</span>
        <span>{totalStudents}</span>
      </div>

      <div className="showdata__faculties">
        <span>Total Faculties</span>
        <span>{verifiedFaculties}/{totalFaculties} Verified</span>
        <div className="progressBar">
          <div className="progressBar__content" style={{width:`${Math.round(verifiedFaculties/totalFaculties*100)}%`}}></div>
        </div>
      </div>

      <div className="showdata__classes">
        <span>Total classes</span>
        <span>{totalClasses}</span>
      </div>
    </div>
  );
}

export default Stats;
