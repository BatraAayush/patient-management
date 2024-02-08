import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import {
  PatientView,
  PatientForm,
  PatientDetail,
  WardView,
  WardForm,
  WardDetail,
  HospitalView
} from "./components/index";

export default function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<PatientView />} />
        <Route path="/patients/:id" element={<PatientDetail />} />
        <Route path="/patients/add" element={<PatientForm />} />
        <Route path="/patients/edit/:id" element={<PatientForm />} />
        <Route path="/wards" element={<WardView />} />
        <Route path="/wards/:id" element={<WardDetail />} />
        <Route path="/wards/add" element={<WardForm />} />
        <Route path="/wards/edit/:id" element={<WardForm />} />
        <Route path="/hospitals" element={<HospitalView />} />
      </Routes>
    </div>
  );
}
