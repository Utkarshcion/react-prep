import { configureStore } from '@reduxjs/toolkit';
import menuSlice from './menuSlice';
import loginSlice from './loginSlice';

const store = configureStore({
    reducer: { loginSlice: loginSlice.reducer, menuSlice: menuSlice.reducer }
});

export default store;
