import "./PatientView.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients } from "../../features/patients/patientSlice";
import { PatientList } from "../PatientList/PatientList";
import { Link } from "react-router-dom";
import { fetchWards } from "../../features/wards/wardSlice";

export const PatientView = () => {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients.patients);
  const status = useSelector((state) => state.patients.status);
  const error = useSelector((state) => state.patients.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPatients());
      dispatch(fetchWards());
    }
  }, []);

  return (
    <div className="patients-view">
      <h2>Patient View</h2>

      <Link to={`/patients/add`}>
        <button className="primary-button">Add patient</button>
      </Link>

      {status === "loading" && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <PatientList patients={patients} />
    </div>
  );
};
