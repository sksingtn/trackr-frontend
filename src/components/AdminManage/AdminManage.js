import React, { useState } from "react";
import styled from "styled-components";
import { Link, Outlet, useLocation } from "react-router-dom";

import { SquareTabs, Tab } from "../../baseUI/SquareTabs";

const SimpleLink = styled(Link)`
text-decoration: none;
`

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



function AdminManage() {

  const location = useLocation();

  let childPage = location.pathname.split("/")[3]
  if (childPage === undefined) {
    childPage = "Student"
  }
  else {
    childPage = childPage[0].toUpperCase() + childPage.substring(1)
  }

  return (
    <ManageContainer>
      <HeaderContainer>
        <Heading>{`Manage ${childPage}`}</Heading>
        <SquareTabs>
          <SimpleLink to="student">
            <Tab
              text="Student"
              iconName="fas fa-user-graduate"
              checked={childPage === "Student"}
            />
          </SimpleLink>
          <SimpleLink to="faculty" >
            <Tab
              text="Faculty"
              iconName="fas fa-chalkboard-teacher"
              checked={childPage === "Faculty"}
            />
          </SimpleLink>

          <SimpleLink to="batch" >
            <Tab
              text="Batch"
              iconName="fas fa-users"
              checked={childPage === "Batch"}
            />
          </SimpleLink>
        </SquareTabs>
      </HeaderContainer>
      <Outlet />
    </ManageContainer>
  );
}

export default AdminManage;
