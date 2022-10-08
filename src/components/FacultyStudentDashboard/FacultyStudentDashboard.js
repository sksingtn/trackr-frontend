import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Timeline from "../Timeline/Timeline";
import ShowSlots from "../ShowSlots/ShowSlots";
import { FACULTY_VIEW_TIMELINE, STUDENT_VIEW_TIMELINE } from "../urls";
import { selectUserRole } from "../Auth/authSlice";
import { FACULTY_ROLE, STUDENT_ROLE } from "../constants"
import axiosInstance from "../axios"



const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;


function FacultyStudentDashboard() {

  const currentRole = useSelector(selectUserRole);

  const [dashboard, setDashboard] = useState({
    timelineData: null,
    currentWeekday: null,
    weekdayData: null,
    loading: false
  })

  const URL_MAPPING = {
    [FACULTY_ROLE]: FACULTY_VIEW_TIMELINE,
    [STUDENT_ROLE]: STUDENT_VIEW_TIMELINE
  }

  const getDashboardData = async () => {
    setDashboard({ ...dashboard, loading: true })
    const response = await axiosInstance.get(URL_MAPPING[currentRole])
    const { timelineData, weekdayData, currentWeekday } = response.data.data;
    setDashboard({
      timelineData,
      weekdayData,
      currentWeekday,
      loading: false
    })

  }

  useEffect(() => {
    getDashboardData()
  }, [])

  let showSlotsProps = null;

  if (dashboard.loading || dashboard.weekdayData === null) {
    showSlotsProps = { loading: true }
  } else {
    showSlotsProps = {
      weekdayData: dashboard.weekdayData,
      currentWeekday: dashboard.currentWeekday,
      loading: false
    }
  }


  return (
    <DashboardWrapper>
      <Timeline style={{ margin: "1.5em 0em 1em 4em", fontSize: "14px" }}
        loading={dashboard.loading || dashboard.timelineData === null}
        timelineData={dashboard.timelineData}
        reset={getDashboardData} />
      <ShowSlots
        style={{ marginBottom: "1em", width: "85%" }}
        readOnly={true}
        {...showSlotsProps}
      />
    </DashboardWrapper>
  );
}

export default FacultyStudentDashboard;
