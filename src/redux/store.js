import { configureStore } from '@reduxjs/toolkit';
import usersessionReducer from './usersession/usersessionsSlice';
import reservationsReducer from './reservations/reservationsSlice';

const store = configureStore({
  reducer: {
    usersession: usersessionReducer,
    reservations: reservationsReducer,
  },
});

export default store;
