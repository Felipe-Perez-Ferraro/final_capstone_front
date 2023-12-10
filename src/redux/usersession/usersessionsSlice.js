import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: {},
  isLoading: false,
  error: null,
};

export const getUserLogin = createAsyncThunk(
  'usersession/getUserLogin',
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/login',
        {
          name: user.name,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('Dispatching getUserLogin action');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getUserSignup = createAsyncThunk(
  'usersession/getUserSignup',
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/signup',
        {
          name: user.name,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const logoutUser = createAsyncThunk(
  'usersession/logoutUser',
  async (user, thunkAPI) => {
    try {
      const response = await axios.delete(
        'http://localhost:3001/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const usersessionSlice = createSlice({
  name: 'usersession',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUserLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getUserSignup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserSignup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUserSignup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default usersessionSlice.reducer;

export const selectUser = (state) => state.usersession.user;
export const selectIsLoading = (state) => state.usersession.isLoading;
export const selectError = (state) => state.usersession.error;
