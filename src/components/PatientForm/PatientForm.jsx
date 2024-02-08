import "./PatientForm.css";
import "../../App.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPatientAsync,
  updatePatientAsync
} from "../../features/patients/patientSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { validatePatientInput } from "./utils";
import { fetchWards } from "../../features/wards/wardSlice";

export const PatientForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const wards = useSelector((state) => state.wards.wards);

  const patient = state ? state : null;

  const [patientInput, setPatientInput] = useState({
    name: patient ? patient.name : "",
    age: patient ? patient.age : 0,
    gender: patient ? patient.gender : "Male",
    medicalHistory: patient ? patient.medicalHistory : "",
    contact: patient ? patient.contact : 0,
    ward: patient ? patient.ward._id : wards[0]?._id
  });

  useEffect(() => {
    if (wards.length === 0) {
      dispatch(fetchWards());
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValidated = validatePatientInput(patientInput);

    if (isValidated) {
      setError("");

      if (patient) {
        dispatch(
          updatePatientAsync({ id: patient._id, updatedPatient: patientInput })
        );
        navigate(`/patients/${patient._id}`);
      } else {
        dispatch(addPatientAsync(patientInput));
        navigate("/");
      }
    } else {
      setError("Please fill all the required fields");
    }
  };

  return (
    <div className="patient-form-container">
      <h2>{patient ? "Edit Patient" : "Add Patient"}</h2>

      <form className="patient-form">
        <label className="label">
          Name:
          <input
            placeholder="Enter Name"
            type="text"
            value={patientInput.name}
            onChange={(e) =>
              setPatientInput({ ...patientInput, name: e.target.value })
            }
            required
          />
        </label>

        <label className="label">
          Age:
          <input
            placeholder="Age"
            type="number"
            min={0}
            value={patientInput.age}
            onChange={(e) =>
              setPatientInput({ ...patientInput, age: e.target.value })
            }
            required
          />
        </label>

        <div>
          <label className="label">
            Gender:
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={patientInput.gender === "Male"}
                onChange={(e) =>
                  setPatientInput({ ...patientInput, gender: e.target.value })
                }
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={patientInput.gender === "Female"}
                onChange={(e) =>
                  setPatientInput({ ...patientInput, gender: e.target.value })
                }
              />
              Female
            </label>
          </label>
        </div>

        <label className="label">
          Medical History:
          <input
            placeholder="Medical History"
            name="medical-history"
            type="string"
            value={patientInput.medicalHistory}
            onChange={(e) =>
              setPatientInput({
                ...patientInput,
                medicalHistory: e.target.value
              })
            }
            required
          />
        </label>

        <label className="label">
          Contact:
          <input
            placeholder="Contact"
            name="contact"
            type="number"
            value={patientInput.contact}
            onChange={(e) =>
              setPatientInput({ ...patientInput, contact: e.target.value })
            }
            required
          />
        </label>

        <label className="label">
          Wards:
          {wards.length === 0 && <p className="error">* No ward available</p>}
          {wards.length > 0 && (
            <select
              onChange={(e) =>
                setPatientInput({ ...patientInput, ward: e.target.value })
              }
              value={patientInput.ward}
            >
              {wards.map(({ _id, wardNumber, specialization }) => (
                <option value={_id} key={_id}>
                  {wardNumber} - {specialization}
                </option>
              ))}
            </select>
          )}
        </label>

        {error && <small className="error">{error}</small>}

        <button className="patient-add-button" onClick={handleSubmit}>
          {patient ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};
