import { configureStore } from "@reduxjs/toolkit";
import { patientsSlice } from "./features/patients/patientSlice";
import { wardsSlice } from "./features/wards/wardSlice";

export default configureStore({
  reducer: {
    patients: patientsSlice.reducer,
    wards: wardsSlice.reducer,
  },
});
