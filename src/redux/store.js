import { configureStore } from '@reduxjs/toolkit';
import usersessionReducer from './usersession/usersessionsSlice';
import reservationsReducer from './reservations/reservationsSlice';
import boatsReducer from './boats/boatsSlice';

const store = configureStore({
  reducer: {
    usersession: usersessionReducer,
    boats: boatsReducer,
    reservations: reservationsReducer,
  },
});

export default store;
