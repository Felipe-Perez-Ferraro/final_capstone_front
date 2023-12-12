import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  reservations: [],
  error: null,
};

export const createReservation = createAsyncThunk(
  'reservation/createreservation',
  async (postData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://127.0.0.1:3001/api/v1/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const data = await response.json();
        return rejectWithValue(data.errors);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createReservation.fulfilled, (state, action) => {
      state.reservations.push(action.payload);
    });
    builder.addCase(createReservation.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default reservationsSlice.reducer;
