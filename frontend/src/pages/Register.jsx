import { useState } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "jea_auth";
const USERS_KEY = "jea_users";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Job Seeker");
  const [status, setStatus] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !email || !password) {
      setStatus("Please fill out all fields.");
      return;
    }
    const storedUsers = localStorage.getItem(USERS_KEY);
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    const existing = users.find((item) => item.email === email);
    if (existing) {
      setStatus("Account already exists. Please sign in.");
      return;
    }
    const newUser = { name, email, password, role };
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ email, name, role, signedInAt: new Date().toISOString() })
    );
    setStatus("Account created. Redirecting to home...");
    navigate("/");
  };

  return (
    <section className="card">
      <h2 className="section-title">Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid">
          <div className="card">
            <label>Full name</label>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Jane Doe"
            />
          </div>
          <div className="card">
            <label>Email</label>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="jane@company.com"
              type="email"
            />
          </div>
          <div className="card">
            <label>Password</label>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Create a password"
              type="password"
            />
          </div>
          <div className="card">
            <label>Role</label>
            <select value={role} onChange={(event) => setRole(event.target.value)}>
              <option>Job Seeker</option>
              <option>Admin</option>
            </select>
          </div>
        </div>
        <div className="actions">
          <button className="btn" type="submit">Create account</button>
        </div>
      </form>
      {status ? <p className="status">{status}</p> : null}
    </section>
  );
}
