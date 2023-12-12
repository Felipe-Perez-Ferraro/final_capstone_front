import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  boats: [],
  isLoading: false,
  errors: null,
};

export const fetchBoats = createAsyncThunk('boats/fetchBoats', async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/v1/boats');
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    return error.response.data;
  }
});

const boatsSlice = createSlice({
  name: 'boats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBoats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.boats = action.payload;
      })
      .addCase(fetchBoats.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
      });
  },
});

export default boatsSlice.reducer;

export const selectAllBoats = (state) => state.boats.boats;
