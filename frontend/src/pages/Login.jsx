import { useEffect, useState } from "react";

const STORAGE_KEY = "jea_auth";
const USERS_KEY = "jea_users";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [savedUser, setSavedUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSavedUser(parsed);
        setStatus(`Signed in as ${parsed.email}`);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      setStatus("Please enter email and password.");
      return;
    }
    const storedUsers = localStorage.getItem(USERS_KEY);
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    const user = users.find((item) => item.email === email);
    if (!user || user.password !== password) {
      setStatus("Invalid credentials or account not found.");
      return;
    }
    const payload = {
      email: user.email,
      name: user.name,
      role: user.role,
      signedInAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setSavedUser(payload);
    setStatus(`Signed in as ${user.email}`);
  };

  const handleSignOut = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSavedUser(null);
    setStatus("Signed out.");
  };

  return (
    <section className="card">
      <h2 className="section-title">Login</h2>
      <p>Use email and password to access your dashboard.</p>
      <form onSubmit={handleSubmit}>
        <div className="grid">
          <div className="card">
            <label>Email</label>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              type="email"
            />
          </div>
          <div className="card">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="********"
            />
          </div>
        </div>
        <div className="actions">
          <button className="btn" type="submit">Sign in</button>
          {savedUser ? (
            <button className="btn secondary" type="button" onClick={handleSignOut}>
              Sign out
            </button>
          ) : null}
        </div>
      </form>
      {status ? <p className="status">{status}</p> : null}
    </section>
  );
}
