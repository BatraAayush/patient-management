import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../utils";

const initialState = {
  wards: [],
  status: "idle",
  error: null,
};

export const fetchWards = createAsyncThunk("wards/fetchWards", async () => {
  const response = await axios.get(`${BASE_URL}/wards`);
  return response.data.wards;
});

export const addWardAsync = createAsyncThunk(
  "wards/addWardAsync",
  async (newTeacher) => {
    const response = await axios.post(`${BASE_URL}/wards`, newTeacher);
    return response.data.ward;
  }
);

export const updateWardAsync = createAsyncThunk(
  "wards/updateWardAsync",
  async ({ id, updatedWard }) => {
    const response = await axios.put(`${BASE_URL}/wards/${id}`, updatedWard);
    return response.data.ward;
  }
);

export const deleteWardAsync = createAsyncThunk(
  "wards/deleteWardAsync",
  async (id) => {
    const response = await axios.delete(`${BASE_URL}/wards/${id}`);
    return response.data.ward;
  }
);

export const wardsSlice = createSlice({
  name: "wards",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchWards.pending]: (state) => {
      state.status = "loading";
    },
    [fetchWards.fulfilled]: (state, action) => {
      state.status = "success";
      state.wards = action.payload;
    },
    [fetchWards.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [addWardAsync.pending]: (state) => {
      state.status = "loading";
    },
    [addWardAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.wards.push(action.payload);
    },
    [addWardAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [updateWardAsync.pending]: (state) => {
      state.status = "loading";
    },
    [updateWardAsync.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedWard = action.payload;
      const index = state.wards.findIndex(
        (ward) => ward._id === updatedWard._id
      );
      if (index !== -1) {
        state.wards[index] = updatedWard;
      }
    },
    [updateWardAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deleteWardAsync.pending]: (state) => {
      state.status = "loading";
    },
    [deleteWardAsync.fulfilled]: (state, action) => {
      state.status = "success";
      const deletedWard = action.payload;
      state.wards = state.wards.filter((ward) => ward._id !== deletedWard._id);
    },
    [deleteWardAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export default wardsSlice.reducer;
