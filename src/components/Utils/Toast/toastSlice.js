import { createSlice } from "@reduxjs/toolkit";

const SUCCESS_SEVERITY = 'success';
const ERROR_SEVERITY = 'error';
const INFO_SEVERITY = 'info';

const initialState = {
    severity: '',
    message: ''
}

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        setToastSuccess: (state, action) => {
            state.severity = SUCCESS_SEVERITY
            state.message = action.payload
        },
        setToastError: (state, action) => {
            state.severity = ERROR_SEVERITY
            state.message = action.payload
        },
        setToastInfo: (state, action) => {
            state.severity = INFO_SEVERITY
            state.message = action.payload
        },
        resetToast: (state, action) => {
            const msgToBeCleared = action.payload;
            //Only reset state for the message that invoked it
            if (msgToBeCleared === state.message) {
                return initialState
            }
            return state
        }
    }

})

export default toastSlice.reducer;

export const selectToast = (state) => state.toast;

export const { setToastSuccess, setToastError, setToastInfo, resetToast } = toastSlice.actions;