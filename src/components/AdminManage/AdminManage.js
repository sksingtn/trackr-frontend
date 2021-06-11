import React, { useState } from "react";
import styled from "styled-components";
import Student from "./Student";
import Faculty from "./Faculty";
import Batch from "./Batch";

import { SquareTabs, Tab } from "../../baseUI/SquareTabs";

const ManageContainer = styled.div`
  width: 80%;
  min-height: 95%;
  padding: 2em 4em;
  place-self: center;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Heading = styled.h1`
  font-weight: 400;
  color: #253858;
`;

const getSection = (identifier) => {
  switch (identifier) {
    case 1:
      return <Student />;
    case 2:
      return <Faculty />;
    case 3:
      return <Batch />;
    default:
      return <h1>Wrong section!</h1>;
  }
};

function AdminManage() {
  const [section, setSection] = useState(1);

  const sectionMap = { 1: "Student", 2: "Faculty", 3: "Batch" };
  return (
    <ManageContainer>
      <HeaderContainer>
        <Heading>{`Manage ${sectionMap[section]}`}</Heading>
        <SquareTabs>
          <Tab
            text="Student"
            iconName="fas fa-user-graduate"
            checked={section === 1}
            onClick={() => setSection(1)}
          />
          <Tab
            text="Faculty"
            iconName="fas fa-chalkboard-teacher"
            checked={section === 2}
            onClick={() => setSection(2)}
          />
          <Tab
            text="Batch"
            iconName="fas fa-users"
            checked={section === 3}
            onClick={() => setSection(3)}
          />
        </SquareTabs>
      </HeaderContainer>
      {getSection(section)}
    </ManageContainer>
  );
}

export default AdminManage;
