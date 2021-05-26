import React, { useState } from "react";
import styled, { css } from "styled-components";
import ManageHeader from "./ManageHeader";
import "./Manage.css";
import Student from "./Student";
import Faculty from "./Faculty";
import Batch from "./Batch";

const getSection = (identifier) => {
  switch (identifier) {
    case 1:
      return <Student />;
    case 2:
      return <Faculty />;
    case 3:
      return <Batch />;
    default:
      return false;
  }
};

function Manage() {
  const [section, setSection] = useState(1);

  return (
    <div className="manage">
      <ManageHeader section={section} setSection={setSection} />
      {getSection(section)}
    </div>
  );
}

export default Manage;
