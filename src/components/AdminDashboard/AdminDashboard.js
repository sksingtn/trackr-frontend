import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { DashboardWrapper, BatchDetailsContainer, TopBar } from "./style";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import Toggle from "../../baseUI/Toggle";
import BaseStats from "../Stats/Stats";
import ShowSlots from "../ShowSlots/ShowSlots";
import { data1, data2 } from "../../testData";
import ManageSlots from "../ManageSlots/ManageSlots";
import axiosInstance from "../axios";
import {
  getBatchList, selectBatchList, selectCurrentBatch,
  setSelectedBatch, selectBatchListStatus, selectDetailedBatch,
  getBatchDetail, selectBatchDetailLoading, selectCurrentSlot,
  resetSelectedSlot
} from './adminDashboardSlice'


//TODO: Put a wrapper around showslots

const TestData = data1;

const Stats = styled(BaseStats)`
  margin-left: 4em;
  margin-bottom: 4em;
`;


function AdminDashboard() {

  const dispatch = useDispatch();
  const selectedBatch = useSelector(selectCurrentBatch)
  const selectedSlot = useSelector(selectCurrentSlot);
  const batchList = useSelector(selectBatchList)
  const batchListStatus = useSelector(selectBatchListStatus)
  const batchDetail = useSelector(selectDetailedBatch)
  const batchDetailLoading = useSelector(selectBatchDetailLoading)

  //TODO: Reset relevant state when batch is switched
  useEffect(() => {
    dispatch(getBatchList())
  }, [])

  useEffect(() => {
    dispatch(resetSelectedSlot())
    //If batch detail not in store then fetch it
    if (batchDetail === null && selectedBatch !== null) {
      dispatch(getBatchDetail(selectedBatch.id))
    }
  }, [selectedBatch])

  if (batchListStatus === 'pending') {
    return <h1>Loading...</h1>
  }

  if (batchDetailLoading || batchDetail == null) {
    return <h1>Batch Details Loading...</h1>
  }

  if (batchListStatus === 'fetched' && batchList.length === 0) {
    return <h1>No Batch Created Yet. Click here to create</h1>
  }

  return (
    <DashboardWrapper>
      <BatchDetailsContainer>
        <TopBar>
          <Autocomplete
            id="combo-box-demo"
            value={selectedBatch}
            onChange={(event, newValue) => {
              dispatch(setSelectedBatch(newValue));
            }}
            options={batchList}
            disableClearable
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
          <Toggle checked={batchDetail.isActive} text={{ on: "ACTIVE", off: "PAUSED" }} />
        </TopBar>
        <Stats
          info={{
            totalStudents: batchDetail.totalStudents,
            totalClasses: batchDetail.totalClasses,
            totalFaculties: batchDetail.totalFaculties
          }}
        />
        <ShowSlots
          weekdayData={batchDetail.weekdayData}
          currentWeekday={batchDetail.currentWeekday}
          selectedSlot={selectedSlot}
          selectedBatch={selectedBatch?.id}
        />
      </BatchDetailsContainer>

      <ManageSlots />
    </DashboardWrapper>
  );
}

export default AdminDashboard;
