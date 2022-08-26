import { Alert } from '@mui/material';

const SimpleAlert = (props) => {
    return <Alert severity={props.severity}>{props.children}</Alert>;
};

export default SimpleAlert;
