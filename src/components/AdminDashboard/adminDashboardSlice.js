import { createSlice } from "@reduxjs/toolkit"

import axiosInstance from "../axios"
import { ADMIN_LIST_BATCH, adminBatchRetriveUrl } from "../urls"


const initialState = {
    batchList: [],
    selectedBatch: null,
    batchListStatus: 'idle',
    batchDetail: {},
    batchDetailLoading: false,
    selectedSlot: null

}

const adminDashboardSlice = createSlice({
    name: 'adminDashboard',
    initialState,
    reducers: {
        setBatchLoading: (state) => {
            state.batchListStatus = 'pending'
        },
        setBatchDetailLoading: (state) => {
            state.batchDetailLoading = true
        },
        loadBatchList: (state, action) => {
            const batchList = action.payload
            if (batchList.length > 0) {
                state.selectedBatch = batchList[0]
            }
            state.batchList = batchList
            state.batchListStatus = 'fetched'
        },
        loadBatchDetail: (state, action) => {
            const { batch, data } = action.payload
            state.batchDetail[batch] = data
            state.batchDetailLoading = false
        },
        setSelectedBatch: (state, action) => {
            state.selectedBatch = action.payload
        },
        setSlot: (state, action) => {
            const { batch, slot } = action.payload;
            const targetWeekday = state.batchDetail[batch].weekdayData
                .find(item => item.weekday === slot.weekday).data
            targetWeekday.push(slot)
            state.batchDetail[batch]["totalClasses"]++
        },
        removeSlot: (state, action) => {
            const { slotId, weekday, batch } = action.payload;
            let targetWeekday = state.batchDetail[batch].weekdayData
                .find(item => item.weekday === weekday).data
            const slotIndex = targetWeekday.findIndex(slot => slot.id === slotId)
            targetWeekday.splice(slotIndex, 1)
            state.batchDetail[batch]["totalClasses"]--
        },
        updateSlot: (state, action) => {
            const { batch, slot } = action.payload;
            const slotId = slot.id;

            const currentBatch = state.batchDetail[batch].weekdayData
            const currentWeekday = slot.weekday
            let previousWeekday = null
            //To find previous weekday in case weekday has been updated
            for (let item of currentBatch) {
                const weekday = item.weekday
                const slotArray = item.data.map(slot => slot.id)
                if (slotArray.includes(slotId)) {
                    previousWeekday = weekday
                    break
                }
            }
            //If weekday hasn't been changed then simply overwrite the slot with updated details
            if (currentWeekday === previousWeekday) {
                let targetWeekday = currentBatch.find(item => item.weekday === currentWeekday).data
                const slotIndex = targetWeekday.findIndex(slot => slot.id === slotId)
                targetWeekday[slotIndex] = slot
            }
            //If weekday has been changed, then remove slot from old weekday array and  
            //add a new slot to new weekday array
            else {
                let targetWeekday = currentBatch.find(item => item.weekday === previousWeekday).data
                const slotIndex = targetWeekday.findIndex(slot => slot.id === slotId)
                targetWeekday.splice(slotIndex, 1)
                currentBatch.find(item => item.weekday === currentWeekday).data.push(slot)
            }

            state.selectedSlot = null
        },
        setSelectedSlot: (state, action) => {
            state.selectedSlot = action.payload
        },
        resetSelectedSlot: (state) => {
            state.selectedSlot = null
        }
    }
})

export const getBatchList = () => {

    return async (dispatch, getState) => {
        dispatch(setBatchLoading())
        const response = await axiosInstance.get(ADMIN_LIST_BATCH)
        dispatch(loadBatchList(response.data.data))
    }
}

export const getBatchDetail = (batchId) => {

    return async (dispatch, getState) => {
        dispatch(setBatchDetailLoading())
        const response = await axiosInstance.get(adminBatchRetriveUrl(batchId))
        dispatch(loadBatchDetail({ batch: batchId, data: response.data.data }))
    }
}

export default adminDashboardSlice.reducer;

export const selectBatchList = (state) => state.adminDashboard.batchList;
export const selectCurrentBatch = (state) => state.adminDashboard.selectedBatch;
export const selectCurrentSlot = (state) => state.adminDashboard.selectedSlot;
export const selectBatchListStatus = (state) => state.adminDashboard.batchListStatus;
export const selectBatchDetailLoading = (state) => state.adminDashboard.batchDetailLoading;

export const selectDetailedBatch = (state) => {
    const selectedBatch = state.adminDashboard.selectedBatch;
    const batchDetail = state.adminDashboard.batchDetail;
    if (selectedBatch !== null &&
        Object.keys(batchDetail).includes(selectedBatch.id)) {
        return batchDetail[selectedBatch.id]
    }
    else {
        return null
    }
}

export const { setBatchLoading, loadBatchList, setSelectedBatch,
    setBatchDetailLoading, loadBatchDetail, setSlot, removeSlot,
    setSelectedSlot, resetSelectedSlot, updateSlot } = adminDashboardSlice.actions;