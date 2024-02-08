import "./PatientList.css";
import "../../App.css";
import { useNavigate } from "react-router-dom";

export const PatientList = ({ patients }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="patient-list-container">
        <table className="table">
          <thead className="table-head">
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Ward</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr
                key={patient._id}
                onClick={() => navigate(`/patients/${patient._id}`)}
                className="table-row"
              >
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.gender}</td>
                <td>{patient.ward.wardNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
