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
    return response.data.data;
  } catch (error) {
    return error.response.data;
  }
});

export const deleteBoat = createAsyncThunk('boat/deleteboat', async (id) => {
  try {
    const response = await fetch(`http://127.0.0.1:3001/api/v1/boats/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      return { id };
    }
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to delete post');
  } catch (error) {
    throw new Error(error.message || 'Failed to delete boat');
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
      })
      .addCase(deleteBoat.fulfilled, (state, action) => {
        const boatId = action.payload.id;
        state.boats = state.boats.filter((boat) => boat.id !== boatId);
      });
  },
});

export default boatsSlice.reducer;

export const selectAllBoats = (state) => state.boats.boats;
