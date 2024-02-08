import { useDispatch, useSelector } from "react-redux";
import "./HospitalView.css";
import { useEffect } from "react";
import { fetchPatients } from "../../features/patients/patientSlice";
import { fetchWards } from "../../features/wards/wardSlice";

export const HospitalView = () => {
  const patients = useSelector((state) => state.patients.patients);
  const wards = useSelector((state) => state.wards.wards);
  const status = useSelector((state) => state.patients.status);
  const error = useSelector((state) => state.patients.error);
  const dispatch = useDispatch();

  const totalPatients = patients.length;

  const totalCapacity = wards.reduce((total, curr) => total + curr.capacity, 0);

  const occupancyRate = totalCapacity
    ? (patients.length / totalCapacity) * 100
    : 0;

  const wardCount = patients.reduce((acc, { ward: { wardNumber } }) => {
    acc[wardNumber] = (acc[wardNumber] || 0) + 1;
    return acc;
  }, {});

  const topWard = Object.keys(wardCount).reduce((top, ward) => {
    if (wardCount[top]) {
      if (wardCount[ward] > wardCount[top]) {
        return ward;
      }
    } else {
      return ward;
    }
    return top;
  }, "NA");

  useEffect(() => {
    if (patients.length === 0) {
      dispatch(fetchPatients());
      dispatch(fetchWards());
    }
  }, []);

  return (
    <div className="hospital-view">
      {status === "loading" && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {status !== "loading" && patients && (
        <>
          <p>
            <strong>Total Patients: </strong>
            {totalPatients}
          </p>
          <p>
            <strong>Current Occupancy Rate: </strong>
            {occupancyRate.toFixed(2)}%
          </p>
          <p>
            <strong>Top Ward: </strong>
            {topWard}
          </p>
        </>
      )}
    </div>
  );
};
