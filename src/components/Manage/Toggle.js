import React from "react";

function Toggle() {
  return (
    <label
      className="activeToggle"
      style={{ fontSize: "0.7em" }}
      htmlFor="toggle">
      <input type="checkbox" name="" checked={true} id="toggle" />
      <div className="toggle"></div>
    </label>
  );
}

export default Toggle;
