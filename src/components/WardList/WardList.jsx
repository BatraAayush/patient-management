import "./WardList.css";
import "../../App.css";
import { useNavigate } from "react-router-dom";

export const WardList = ({ wards }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="ward-list-container">
        <table className="table">
          <thead className="table-head">
            <tr>
              <th>Ward Number</th>
              <th>Capacity</th>
              <th>Specialization</th>
            </tr>
          </thead>
          <tbody>
            {wards.map((ward) => (
              <tr
                key={ward._id}
                onClick={() => navigate(`/wards/${ward._id}`)}
                className="table-row"
              >
                <td>{ward.wardNumber}</td>
                <td>{ward.capacity}</td>
                <td>{ward.specialization}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
