import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialMenuState = { menu: [] };

const menuSlice = createSlice({
    name: 'menuSlice',
    initialState: initialMenuState,
    reducers: {
        setMenu(state, action) {
            console.log('Setting Menu!!');
            state.menu = action.payload.currentMenu;
        }
    }
});

export const menuSliceActions = menuSlice.actions;
export default menuSlice;
