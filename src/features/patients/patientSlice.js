import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../utils";

const initialState = {
  patients: [],
  status: "idle",
  error: null,
};

export const fetchPatients = createAsyncThunk(
  "patients/fetchPatients",
  async () => {
    const response = await axios.get(`${BASE_URL}/patients`);
    return response.data.patients;
  }
);

export const addPatientAsync = createAsyncThunk(
  "patients/addPatientAsync",
  async (newStudent) => {
    const response = await axios.post(`${BASE_URL}/patients`, newStudent);
    return response.data.patient;
  }
);

export const updatePatientAsync = createAsyncThunk(
  "patients/updatePatientAsync",
  async ({ id, updatedPatient }) => {
    const response = await axios.put(
      `${BASE_URL}/patients/${id}`,
      updatedPatient
    );
    return response.data.patient;
  }
);

export const deletePatientAsync = createAsyncThunk(
  "patients/deletePatientAsync",
  async (id) => {
    const response = await axios.delete(`${BASE_URL}/patients/${id}`);
    return response.data.patient;
  }
);

export const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPatients.pending]: (state) => {
      state.status = "loading";
    },
    [fetchPatients.fulfilled]: (state, action) => {
      state.status = "success";
      state.patients = action.payload;
    },
    [fetchPatients.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [addPatientAsync.pending]: (state) => {
      state.status = "loading";
    },
    [addPatientAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.patients.push(action.payload);
    },
    [addPatientAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [updatePatientAsync.pending]: (state) => {
      state.status = "loading";
    },
    [updatePatientAsync.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedPatient = action.payload;
      const index = state.patients.findIndex(
        (s) => s._id === updatedPatient._id
      );

      if (index !== -1) {
        state.patients[index] = updatedPatient;
      }
    },
    [updatePatientAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deletePatientAsync.pending]: (state) => {
      state.status = "loading";
    },
    [deletePatientAsync.fulfilled]: (state, action) => {
      state.status = "success";
      const deletedPatient = action.payload;
      state.patients = state.patients.filter(
        (patient) => patient._id !== deletedPatient._id
      );
    },
    [deletePatientAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export default patientsSlice.reducer;
