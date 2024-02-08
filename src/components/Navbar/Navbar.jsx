import "./Navbar.css";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="nav-container">
      <h2>
        <NavLink to="/">Patient Management System</NavLink>
      </h2>

      <ul className="nav-pills">
        <li>
          <NavLink to="/">Patients</NavLink>
        </li>
        <li>
          <NavLink to="wards">Wards</NavLink>
        </li>
        <li>
          <NavLink to="/hospitals">Hospitals</NavLink>
        </li>
      </ul>
    </nav>
  );
};
