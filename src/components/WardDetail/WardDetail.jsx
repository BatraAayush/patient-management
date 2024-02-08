import "./WardDetail.css";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteWardAsync } from "../../features/wards/wardSlice";

export const WardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ward = useSelector((state) =>
    state.wards.wards.find((ward) => ward._id === id)
  );

  if (!ward) {
    return <div>Ward not found.</div>;
  }

  const handleDelete = (id) => {
    dispatch(deleteWardAsync(id));
    navigate("/wards");
  };

  return (
    <div className="ward-details-page">
      <h2>Ward Detail</h2>

      <div>
        <div className="ward-detail">
          <p>Ward Number:</p>
          <p>{ward.wardNumber}</p>
        </div>
        <div className="ward-detail">
          <p>Capacity:</p>
          <p>{ward.capacity}</p>
        </div>
        <div className="ward-detail">
          <p>Specialization:</p>
          <p>{ward.specialization}</p>
        </div>

        <div className="buttons-container">
          <Link to={`/wards/edit/${ward._id}`} state={ward}>
            <button className="primary-button">Edit Details</button>
          </Link>
          <button
            className="secondary-button"
            onClick={() => handleDelete(ward._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
