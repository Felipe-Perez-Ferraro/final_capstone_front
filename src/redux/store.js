import { configureStore } from '@reduxjs/toolkit';
import usersessionReducer from './usersession/usersessionsSlice';

const store = configureStore({
  reducer: {
    usersession: usersessionReducer,
  },
});

export default store;
