import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { selectToast, resetToast } from './toastSlice'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Toast() {
    const dispatch = useDispatch()
    const { severity, message } = useSelector(selectToast);
    const showToast = Boolean(severity) && Boolean(message)

    //Message is passed to make sure that a onClose of a previous
    //toast shouldn't close a new popup.
    const closeToast = () => dispatch(resetToast(message))

    useEffect(() => {
        if (showToast) {
            setTimeout(closeToast, 3000)
        }
    }, [closeToast, showToast])

    return (
        <Snackbar open={showToast} >
            <Alert severity={severity !== '' ? severity : undefined} sx={{
                width: '100%',
                fontWeight: 600,
                background: severity === 'success' ? '#404483' : 'red'
            }}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default Toast 