import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from "react-router-dom";

import {
  DashboardWrapper, BatchDetailsContainer,
  MessageWrapper, TopBar
} from "./style";
import Toggle from "../../baseUI/Toggle";
import BaseStats from "../Stats/Stats";
import ShowSlots from "../ShowSlots/ShowSlots";
import ManageSlots from "../ManageSlots/ManageSlots";
import {
  getBatchList, selectBatchList, selectCurrentBatch,
  setSelectedBatch, selectBatchListStatus, selectDetailedBatch,
  getBatchDetail, selectBatchDetailLoading, selectCurrentSlot,
  resetSelectedSlot, updateBatchStatus, resetAll
} from './adminDashboardSlice'
import { PENDING_STATE, FETCHED_STATE } from "../constants";



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


  useEffect(() => {
    dispatch(getBatchList())

    return () => dispatch(resetAll())
  }, [])

  useEffect(() => {
    dispatch(resetSelectedSlot())
    //If batch detail not in store then fetch it.
    if (batchDetail === null && selectedBatch !== null) {
      dispatch(getBatchDetail(selectedBatch.id))
    }
  }, [selectedBatch])


  if (batchListStatus === PENDING_STATE) {
    return (
      <MessageWrapper>
        <CircularProgress />
        <span className="info">Fetching Batch list . . .</span>
      </MessageWrapper>)
  }

  if (batchListStatus === FETCHED_STATE && batchList.length === 0) {
    return (
      <MessageWrapper>
        <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
        <span className="info">No Batch Found. Click&nbsp;
          <Link to="/admin/manage/batch">
            here
          </Link>
          &nbsp;to create.
        </span>
      </MessageWrapper>)
  }

  const batchInLoading = batchDetailLoading || batchDetail === null

  const handleBatchToggle = () => {
    if (!batchInLoading) {
      dispatch(updateBatchStatus(selectedBatch.id))
    }
  }

  let showSlotsProps = null;
  if (batchInLoading) {
    showSlotsProps = { loading: true }
  }
  else {
    showSlotsProps = {
      weekdayData: batchDetail.weekdayData,
      currentWeekday: batchDetail.currentWeekday,
      selectedSlot: selectedSlot,
      selectedBatch: selectedBatch?.id
    }
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
          <Toggle checked={batchInLoading ? false : batchDetail.isActive}
            onClick={handleBatchToggle}
            text={{ on: "ACTIVE", off: "PAUSED" }} />
        </TopBar>
        <Stats
          info={{
            totalStudents: batchInLoading ? 0 : batchDetail.totalStudents,
            totalClasses: batchInLoading ? 0 : batchDetail.totalClasses,
            totalFaculties: batchInLoading ? 0 : batchDetail.totalFaculties
          }}
        />
        <ShowSlots
          {...showSlotsProps}
        />
      </BatchDetailsContainer>

      <ManageSlots />
    </DashboardWrapper>
  );
}

export default AdminDashboard;
