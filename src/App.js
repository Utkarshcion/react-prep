import React, { Fragment } from 'react';
import SignIn from './components/SignIn';
import StickyFooter from './components/StickyFooter';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AlignItemsList from './components/AlignItemsList';

let appCounter = 1;

function App() {
    console.log('AppCounter ', appCounter);

    //const loginSlice = useSelector((state) => state.loginSlice);
    // const isLoggedIn = localStorage.getItem('isLoggedIn');
    // console.log('Is Logged In ',isLoggedIn);

    //const isAuth = loginSlice?.isLoggedIn;

    return (
        <Fragment>
            <Routes>
                {/* <Route
          path="/home/*"
          element={isAuth ? <Navigate to="/home" /> : <Navigate to="/login" />}
        /> */}
                <Route path='/login/*' element={<Navigate to='/login' />} />
                <Route path='/login' element={<SignIn name='login' />} />
                <Route path='/home/*' element={<Dashboard />}>
                    <Route path='menu' element={<AlignItemsList />} />
                </Route>
                <Route path='/test' element={<StickyFooter />} />
            </Routes>
        </Fragment>
    );
}

export default App;
