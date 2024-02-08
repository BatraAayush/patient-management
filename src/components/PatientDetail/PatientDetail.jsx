import "./PatientDetail.css";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deletePatientAsync } from "../../features/patients/patientSlice";

export const PatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const patient = useSelector((state) =>
    state.patients.patients.find((patient) => patient._id === id)
  );

  if (!patient) {
    return <div>Patient not found.</div>;
  }

  const handleDelete = (id) => {
    dispatch(deletePatientAsync(id));
    navigate("/");
  };

  return (
    <div className="patient-details-page">
      <h2>Student Detail</h2>

      <div>
        <div className="patient-detail">
          <p>Name:</p>
          <p>{patient.name}</p>
        </div>
        <div className="patient-detail">
          <p>Age:</p>
          <p>{patient.age}</p>
        </div>
        <div className="patient-detail">
          <p>Gender:</p>
          <p>{patient.gender}</p>
        </div>
        <div className="patient-detail">
          <p>Contact:</p>
          <p>{patient.contact}</p>
        </div>
        <div className="patient-detail">
          <p>Ward:</p>
          <p>{patient.ward.wardNumber}</p>
        </div>
        <div className="patient-detail">
          <p>Medical History:</p>
          <p>{patient.medicalHistory}</p>
        </div>

        <div className="buttons-container">
          <Link to={`/patients/edit/${patient._id}`} state={patient}>
            <button className="primary-button">Edit Details</button>
          </Link>
          <button
            className="secondary-button"
            onClick={() => handleDelete(patient._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
