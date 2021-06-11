import React from "react";
import styled from "styled-components";

import { DashboardWrapper, BatchDetailsContainer, TopBar } from "./style";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import Toggle from "../../baseUI/Toggle";
import BaseStats from "../Stats/Stats";
import ShowSlots from "../ShowSlots/ShowSlots";
import { data1, data2 } from "../../testData";
import ManageSlots from "../ManageSlots/ManageSlots";

//TODO: Put a wrapper around showslots

const TestData = data1;

const Stats = styled(BaseStats)`
  margin-left: 4em;
  margin-bottom: 4em;
`;

const batchOptions = [{ title: "C.S.E 4th Year", year: 1994 }];

function AdminDashboard() {
  return (
    <DashboardWrapper>
      <BatchDetailsContainer>
        <TopBar>
          <Autocomplete
            id="combo-box-demo"
            options={batchOptions}
            getOptionLabel={(option) => option.title}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select a Batch"
                variant="outlined"
              />
            )}
          />
          <Toggle text={{ on: "ACTIVE", off: "PAUSED" }} />
        </TopBar>
        <Stats
          info={{
            totalStudents: 1,
            totalClasses: 15,
            totalFaculties: 8,
          }}
        />
        <ShowSlots
          weekdayData={Object.keys(TestData.weekdayData).map((key) => ({
            week: key,
            data: TestData.weekdayData[key],
          }))}
        />
      </BatchDetailsContainer>

      <ManageSlots />
    </DashboardWrapper>
  );
}

export default AdminDashboard;
