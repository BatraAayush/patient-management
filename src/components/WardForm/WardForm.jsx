import "./WardForm.css";
import "../../App.css";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addWardAsync, updateWardAsync } from "../../features/wards/wardSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { wardSpecializations, validateWardInput } from "./utils";

export const WardForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const ward = state ? state : null;

  const [wardInput, setWardInput] = useState({
    wardNumber: ward ? ward.wardNumber : "",
    capacity: ward ? ward.capacity : "",
    specialization: ward ? ward.specialization : wardSpecializations[0],
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValidated = validateWardInput(wardInput);

    if (isValidated) {
      setError("");

      if (ward) {
        dispatch(updateWardAsync({ id: ward._id, updatedWard: wardInput }));
        navigate(`/wards/${ward._id}`);
      } else {
        dispatch(addWardAsync(wardInput));
        navigate("/wards");
      }
    } else {
      setError("Please fill all the required fields");
    }
  };

  return (
    <div className="ward-form-container">
      <h2>{ward ? "Edit Ward" : "Add Ward"}</h2>

      <form className="ward-form">
        <label className="label">
          Ward Number:
          <input
            placeholder="Enter Ward Number"
            name="ward-number"
            type="number"
            value={wardInput.wardNumber}
            onChange={(e) =>
              setWardInput({ ...wardInput, wardNumber: e.target.value })
            }
            required
          />
        </label>

        <label className="label">
          Capacity:
          <input
            placeholder="Enter Capacity"
            name="contact"
            type="number"
            value={wardInput.capacity}
            onChange={(e) =>
              setWardInput({
                ...wardInput,
                capacity: e.target.value,
              })
            }
            required
          />
        </label>

        <label className="label">
          Specialization:
          <select
            value={wardInput.ward}
            onChange={(e) =>
              setWardInput({
                ...wardInput,
                specialization: e.target.value,
              })
            }
          >
            {wardSpecializations.map((specialization) => (
              <option value={specialization} key={specialization}>
                {specialization}
              </option>
            ))}
          </select>
        </label>

        {error && <small className="error">{error}</small>}

        <button className="ward-add-button" onClick={handleSubmit}>
          {ward ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};
