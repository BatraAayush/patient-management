import "./WardView.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWards } from "../../features/wards/wardSlice";
import { WardList } from "../WardList/WardList";
import { Link } from "react-router-dom";

export const WardView = () => {
  const dispatch = useDispatch();
  const wards = useSelector((state) => state.wards.wards);
  const status = useSelector((state) => state.wards.status);
  const error = useSelector((state) => state.wards.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchWards());
    }
  }, []);

  return (
    <div className="wards-view">
      <h2>Ward View</h2>

      <Link to={`/wards/add`}>
        <button className="primary-button">Add ward</button>
      </Link>

      {status === "loading" && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <WardList wards={wards} />
    </div>
  );
};
