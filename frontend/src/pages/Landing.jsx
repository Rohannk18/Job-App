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
    <section className="landing">
      <div className="hero card fade-up">
        <div>
          <div className="pill-row">
            <span className="pill">Verified roles</span>
            <span className="pill">Smart matching</span>
            <span className="pill">Fast hiring</span>
          </div>
          <h1 className="hero-title">Job Ecosystem App</h1>
          <p className="hero-subtitle">
            A unified platform where job seekers discover genuine roles and employers hire
            with confidence. Keep pipelines transparent, collaborative, and data-rich.
          </p>
          <div className="hero-actions">
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
          <div className="hero-stats">
            <div className="stat-card">
              <div className="stat-value">1.6k+</div>
              <div className="stat-label">Active opportunities</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">92%</div>
              <div className="stat-label">Interview response rate</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">48 hrs</div>
              <div className="stat-label">Average review time</div>
            </div>
          </div>
        </div>
        <div className="hero-panel">
          <div className="card fade-up fade-delay">
            <h3>Company Spotlight</h3>
            <p>
              Curated employers with clear salary bands, structured interviews, and rapid
              feedback loops.
            </p>
            <div className="tag">Hiring now</div>
            <div className="tag">Remote-ready</div>
            <div className="tag">Inclusive teams</div>
          </div>
          {profile ? (
            <div className="card profile-card fade-up fade-delay-2">
              <h3>Signed-in Profile</h3>
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Role:</strong> {profile.role}</p>
            </div>
          ) : (
            <div className="card profile-card fade-up fade-delay-2">
              <h3>Get started in minutes</h3>
              <p>Build a polished profile and apply with one click to verified roles.</p>
              <div className="actions">
                <Link className="btn secondary" to="/register">Start profile</Link>
                <Link className="btn ghost" to="/jobs">Browse roles</Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="feature-grid">
        <div className="feature-card fade-up">
          <h3>Job Seeker Hub</h3>
          <p>Search, apply, track, and build AI-assisted resumes tailored to each role.</p>
        </div>
        <div className="feature-card fade-up fade-delay">
          <h3>Employer Control</h3>
          <p>Post roles, shortlist candidates, and keep hiring stages crystal clear.</p>
        </div>
        <div className="feature-card fade-up fade-delay-2">
          <h3>Admin Insights</h3>
          <p>Monitor listings, review reports, and keep the marketplace trusted.</p>
        </div>
      </div>
    </section>
  );
}
