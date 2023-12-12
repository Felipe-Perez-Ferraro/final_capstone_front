import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    boatDetails: [],
    isLoading: false,
    error: null,
    message: null,
};

export const getBoatDetails = createAsyncThunk(
    "boatDetails/getBoatDetails",
    async (id, thunkAPI) => {
        try {
            const response = await fetch(`http://localhost:3001/boats/${id}`);
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const boatDetailsSlice = createSlice({
    name: "boatDetails",
    initialState,
    reducers: {},
    extraReducers: {
        [getBoatDetails.pending]: (state) => {
            state.isLoading = true;
        },
        [getBoatDetails.fulfilled]: (state, action) => {
            state.boatDetails = action.payload;
            state.isLoading = false;
        },
        [getBoatDetails.rejected]: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

export default boatDetailsSlice.reducer;
