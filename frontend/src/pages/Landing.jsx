import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "jea_auth";

export default function Landing() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setProfile(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem(STORAGE_KEY);
    setProfile(null);
  };

  const dashboardLink = profile?.role === "Admin"
    ? "/employer"
    : "/seeker";

  return (
    <section className="card">
      <h1 className="section-title">Job Ecosystem App</h1>
      <p>
        A unified platform where job seekers discover genuine roles and employers hire
        with confidence.
      </p>
      <div className="actions">
        <Link className="btn" to="/jobs">Explore jobs</Link>
        {profile ? (
          <>
            <Link className="btn secondary" to={dashboardLink}>Go to dashboard</Link>
            <button className="btn ghost" type="button" onClick={handleSignOut}>
              Sign out
            </button>
          </>
        ) : (
          <>
            <Link className="btn secondary" to="/register">Create account</Link>
            <Link className="btn ghost" to="/login">Sign in</Link>
          </>
        )}
      </div>
      {profile ? (
        <div className="card">
          <h3>Signed-in Profile</h3>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Role:</strong> {profile.role}</p>
        </div>
      ) : null}
      <div className="grid">
        <div className="card">
          <h3>Job Seeker</h3>
          <p>Search, apply, track, and build AI-assisted resumes.</p>
        </div>
        <div className="card">
          <h3>Admin</h3>
          <p>Post roles, shortlist candidates, and manage hiring pipelines.</p>
        </div>
      </div>
    </section>
  );
}
