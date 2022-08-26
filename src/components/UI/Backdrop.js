import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function SimpleBackdrop(props) {
    return (
        <React.Fragment>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={props.open}
                onClick={props.handleClose}
            >
                <CircularProgress color='inherit'> Loading !!</CircularProgress>
            </Backdrop>
        </React.Fragment>
    );
}
