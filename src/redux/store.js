import { configureStore } from '@reduxjs/toolkit';
import usersessionReducer from './usersession/usersessionsSlice';
import boatsReducer from './boats/boatsSlice';

const store = configureStore({
  reducer: {
    usersession: usersessionReducer,
    boats: boatsReducer,
  },
});

export default store;
