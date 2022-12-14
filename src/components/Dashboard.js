import React, { useEffect, useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { secondaryListItems } from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import { useNavigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import { LogoutRounded } from '@mui/icons-material';

import { useDispatch } from 'react-redux';
import { menuSliceActions } from '../store/menuSlice';
import { syncMenuItems } from '../server';
import { loginActions } from '../store/loginSlice';

//import Orders from "./Orders";

function Copyright(props) {
    return (
        <Typography variant='body2' color='text.secondary' align='center' {...props}>
            {'Copyright © '}
            <Link color='inherit' href='https://mui.com/'>
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    })
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
    '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        }),
        boxSizing: 'border-box',
        ...(!open && {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9)
            }
        })
    }
}));

const mdTheme = createTheme();

let sycnCounter = 1;

function DashboardContent() {
    console.log('Dashboard Render !!', sycnCounter++);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //dashboard state
    const [isDashboardActive, SetIsDashboardActive] = useState(true); //Note: React maintains useState call. so never goes in infinite loop.

    //get login slice to check if user is already logged in. If not, redirect user to login.
    const loginState = useSelector((state) => state.loginSlice);
    //const menuSlice = useSelector((state) => state.menuSlice);

    //console.log("Dashboard Component Menu State: ", menuSlice);
    console.log('Dashboard Component Login State: ', loginState);

    const isAuth = loginState?.isLoggedIn;

    useEffect(() => {
        if (!isAuth) {
            navigate('../login', { replace: true });
        }
    }, [navigate, isAuth]);

    //drawer toggler
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    //
    const menuClickHandler = async (event) => {
        event.preventDefault();
        const menuItems = await syncMenuItems();

        console.log('Menu Items ', menuItems);
        dispatch(
            menuSliceActions.setMenu({
                currentMenu: menuItems
            })
        );

        //set Dashboard false
        SetIsDashboardActive(false);
        console.log('Navidating !!');
        navigate('../home/menu', { replace: true });
    };

    const logoutHandler = (event) => {
        event.preventDefault();

        dispatch(loginActions.removeLoginDetails());

        navigate('../login', { replace: true });
    };

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position='absolute' open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px' // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge='start'
                            color='inherit'
                            aria-label='open drawer'
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' })
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography component='h1' variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
                            Dashboard
                        </Typography>
                        <IconButton color='inherit'>
                            <Badge badgeContent={4} color='secondary'>
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer variant='permanent' open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1]
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component='nav'>
                        <React.Fragment>
                            <ListItemButton>
                                <ListItemIcon>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText primary='Dashboard' />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <BarChartIcon />
                                </ListItemIcon>
                                <ListItemText primary='Menu' onClick={menuClickHandler} />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <LogoutRounded />
                                </ListItemIcon>
                                <ListItemText primary='Logout' onClick={logoutHandler} />
                            </ListItemButton>
                        </React.Fragment>
                        <Divider sx={{ my: 1 }} />
                        {secondaryListItems}
                    </List>
                </Drawer>
                <Box
                    component='main'
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto'
                    }}
                >
                    <Toolbar />
                    {isDashboardActive && (
                        <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
                            <Grid container spacing={3}>
                                {/* Chart */}
                                <Grid item xs={12} md={8} lg={9}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 240
                                        }}
                                    >
                                        <Chart />
                                    </Paper>
                                </Grid>
                                {/* Recent Deposits */}
                                <Grid item xs={12} md={4} lg={3}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 240
                                        }}
                                    >
                                        <Deposits />
                                    </Paper>
                                </Grid>
                                {/* Recent Orders */}
                                {/* <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Orders />
                </Paper>
              </Grid> */}
                            </Grid>
                            <Copyright sx={{ pt: 4 }} />
                        </Container>
                    )}
                    <Outlet />
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function Dashboard() {
    return <DashboardContent />;
}
