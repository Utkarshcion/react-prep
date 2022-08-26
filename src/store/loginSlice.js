import { createSlice } from '@reduxjs/toolkit';

const initialState = { username: '', isLoggedIn: false, tokenClaim: '' };

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState,
    reducers: {
        storeLoginDetails(state, action) {
            console.log('storing login !!');
            //localStorage.setItem('isLoggedIn','true');
            //localStorage.setItem('username',action.payload.username);
            state.username = action.payload.username;
            state.isLoggedIn = true;
            state.tokenClaim = action.payload.tokenClaim;
        },

        removeLoginDetails(state) {
            //localStorage.removeItem('isLoggedIn','true');
            //localStorage.removeItem('username');
            state.username = '';
            state.isLoggedIn = false;
            state.tokenClaim = '';
            console.log('Logged Out State !!', state);
        }
    }
});

export const loginActions = loginSlice.actions;
export default loginSlice;
