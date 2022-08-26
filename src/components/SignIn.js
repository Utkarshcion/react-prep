import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginActions } from '../store/loginSlice';
import { v4 as uuidv4 } from 'uuid';
import SimpleAlert from './UI/SimpleAlert';
import SimpleBackdrop from './UI/Backdrop';
import ReactDOM from 'react-dom';

function Copyright(props) {
    return (
        <Typography variant='body2' color='text.secondary' align='center' {...props}>
            {'Copyright © '}
            <Link color='inherit' href='https://mui.com/'>
                Alpha Consultancy Services
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

let signincounter = 1;

export default function SignIn(props) {
    const [open, setOpen] = React.useState(false);
    const [severity, SetSeverity] = React.useState('info');
    const [message, SetMessage] = React.useState(undefined);
    const [showAlert, SetShowAlert] = React.useState(false);

    console.log('Sign in ', signincounter);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleFocus = (event) => {};

    const handleToggle = () => {
        console.log('Toggling ', open);
        setOpen(!open);
    };

    const navidateDelay = () => {
        navigate('../home', { replace: true });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleToggle();
        console.log('Event ', open);
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password')
        });

        if (data.get('email') === 'utkarsh' && data.get('password') === 'pass') {
            // //store locally
            // localStorage.setItem('loggedInUser','true');
            // localStorage.setItem('username',data.get('email'));
            // console.log('navigating !!');

            // //store in context
            // signInContext.setUHandler(data.get('email'));

            //Store in Redux Store.
            console.log('dispatching from sign in component!!');
            dispatch(
                loginActions.storeLoginDetails({
                    username: data.get('email'),
                    tokenClaim: uuidv4()
                })
            );
            SetShowAlert(true);
            SetSeverity('success');
            SetMessage('Logging In...fetching your profile..');

            setTimeout(navidateDelay, 2000);

            //navigate('../home', { replace: true });
        } else {
            SetShowAlert(true);
            SetSeverity('error');
            SetMessage('Invalid Username/Password combination');
        }
        handleToggle();
        console.log('Here !!', open);
    };

    return (
        <React.Fragment>
            {!showAlert && ReactDOM.createPortal(<SimpleBackdrop open={open} />, document.getElementById('backdrop'))}
            {showAlert &&
                ReactDOM.createPortal(
                    <SimpleAlert severity={severity}> {message} </SimpleAlert>,
                    document.getElementById('notifications')
                )}
            <Container component='main' maxWidth='xs'>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LoginIcon />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Sign in for {props.name}
                    </Typography>
                    <Box component='form' onFocus={handleFocus} onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id='email'
                            label='Email Address'
                            name='email'
                            autoComplete='email'
                            autoFocus
                        />
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            type='password'
                            id='password'
                            autoComplete='current-password'
                        />
                        <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
                        <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href='#' variant='body2'>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href='#' variant='body2'>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </React.Fragment>
    );
}
