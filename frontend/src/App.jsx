import { Link, Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Applications from "./pages/Applications.jsx";
import CompanyProfile from "./pages/CompanyProfile.jsx";
import EmployerDashboard from "./pages/EmployerDashboard.jsx";
import JobDetail from "./pages/JobDetail.jsx";
import JobList from "./pages/JobList.jsx";
import JobSeekerDashboard from "./pages/JobSeekerDashboard.jsx";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Moderation from "./pages/Moderation.jsx";
import Register from "./pages/Register.jsx";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/jobs", label: "Jobs" },
  { to: "/seeker", label: "Job Seeker" },
  { to: "/employer", label: "Admin" },
  { to: "/login", label: "Login" }
];

export default function App() {
  return (
    <div className="app">
      <header className="top-bar">
        <div className="brand">Job Ecosystem</div>
        <nav className="nav">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="page">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/seeker" element={<JobSeekerDashboard />} />
          <Route path="/employer" element={<EmployerDashboard />} />
          <Route path="/employer/company" element={<CompanyProfile />} />
          <Route path="/employer/applications" element={<Applications />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/moderation" element={<Moderation />} />
        </Routes>
      </main>
    </div>
  );
}
