import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const JOBS_KEY = "jea_employer_jobs";
const APPLICATIONS_KEY = "jea_applications";
const USERS_KEY = "jea_users";
const AUTH_KEY = "jea_auth";

export default function EmployerDashboard() {
  const [showForm, setShowForm] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("Full Time");
  const [status, setStatus] = useState("");
  const [postedJobs, setPostedJobs] = useState(() => {
    const stored = localStorage.getItem(JOBS_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  const [applications, setApplications] = useState(() => {
    const stored = localStorage.getItem(APPLICATIONS_KEY);
    const usersStored = localStorage.getItem(USERS_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    const users = usersStored ? JSON.parse(usersStored) : [];
    const normalized = parsed.map((item) => {
      const matchedUser = users.find((user) => user.email === item.applicantEmail);
      const name = item.applicantName || matchedUser?.name || item.applicantEmail || "Unknown";
      const status = item.status || "Applied";
      return { ...item, applicantName: name, status };
    });
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(normalized));
    return normalized;
  });

  const refreshApplications = () => {
    const stored = localStorage.getItem(APPLICATIONS_KEY);
    const usersStored = localStorage.getItem(USERS_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    const users = usersStored ? JSON.parse(usersStored) : [];
    const normalized = parsed.map((item) => {
      const matchedUser = users.find((user) => user.email === item.applicantEmail);
      const name = item.applicantName || matchedUser?.name || item.applicantEmail || "Unknown";
      const status = item.status || "Applied";
      return { ...item, applicantName: name, status };
    });
    setApplications(normalized);
  };

  const refreshAuth = () => {
    const authStored = localStorage.getItem(AUTH_KEY);
    setAuthUser(authStored ? JSON.parse(authStored) : null);
  };

  useEffect(() => {
    refreshAuth();
    refreshApplications();
    window.addEventListener("storage", refreshApplications);
    window.addEventListener("focus", refreshAuth);
    return () => {
      window.removeEventListener("storage", refreshApplications);
      window.removeEventListener("focus", refreshAuth);
    };
  }, []);

  const analytics = useMemo(() => {
    const shortlisted = applications.filter((item) => item.status === "Shortlisted");
    const selected = applications.filter((item) => item.status === "Selected");
    const rejected = applications.filter((item) => item.status === "Rejected");
    return { shortlisted, selected, rejected };
  }, [applications]);

  const visibleApplications = useMemo(
    () => applications.filter((item) => item.status === "Applied"),
    [applications]
  );

  const updateStatus = (jobId, applicantEmail, statusValue) => {
    setApplications((prev) => {
      const updated = prev.map((item) =>
        item.jobId === jobId && item.applicantEmail === applicantEmail
          ? { ...item, status: statusValue }
          : item
      );
      localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isAdmin = authUser && (authUser.role === "Admin" || authUser.role === "Employer");
    if (!isAdmin) {
      setStatus("Only admins can post job openings. Please sign in as Admin.");
      return;
    }
    if (!title || !location) {
      setStatus("Please enter a title and location.");
      return;
    }
    const newJob = {
      id: `job-${Date.now()}`,
      title,
      location,
      jobType,
      postedAt: new Date().toISOString()
    };
    const updated = [newJob, ...postedJobs];
    localStorage.setItem(JOBS_KEY, JSON.stringify(updated));
    setPostedJobs(updated);
    setTitle("");
    setLocation("");
    setJobType("Full Time");
    setStatus("Job opening posted.");
    setShowForm(false);
  };

  return (
    <section>
      <div className="card">
        <h2 className="section-title">Employer Dashboard</h2>
        {(!authUser) ? (
          <p className="status">Sign in as Admin to post job openings.</p>
        ) : (authUser.role !== "Admin" && authUser.role !== "Employer") ? (
          <p className="status">Only admins can post job openings.</p>
        ) : null}
        <div className="grid">
          <div className="card">
            <h3>Post New Job</h3>
            <p>Create openings and set eligibility criteria.</p>
            <div className="actions">
              <button
                className="btn"
                type="button"
                onClick={() => setShowForm((prev) => !prev)}
                disabled={!authUser || (authUser.role !== "Admin" && authUser.role !== "Employer")}
              >
                {showForm ? "Close" : "Post job opening"}
              </button>
            </div>
            {showForm && authUser && (authUser.role === "Admin" || authUser.role === "Employer") ? (
              <form onSubmit={handleSubmit}>
                <div className="grid">
                  <div className="card">
                    <label>Job title</label>
                    <input
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                      placeholder="e.g., Backend Engineer"
                    />
                  </div>
                  <div className="card">
                    <label>Location</label>
                    <input
                      value={location}
                      onChange={(event) => setLocation(event.target.value)}
                      placeholder="e.g., Remote"
                    />
                  </div>
                  <div className="card">
                    <label>Job type</label>
                    <select value={jobType} onChange={(event) => setJobType(event.target.value)}>
                      <option>Full Time</option>
                      <option>Part Time</option>
                      <option>Contract</option>
                      <option>Intern</option>
                    </select>
                  </div>
                </div>
                <div className="actions">
                  <button className="btn" type="submit">Publish</button>
                </div>
              </form>
            ) : null}
            {status ? <p className="status">{status}</p> : null}
            {postedJobs.length ? (
              <div>
                <h4>Recently posted</h4>
                <ul>
                  {postedJobs.slice(0, 3).map((job) => (
                    <li key={job.id}>{job.title} - {job.location} ({job.jobType})</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          <div className="card">
            <h3>Applicants</h3>
            <p>Review shortlisted candidates and schedule interviews.</p>
            <div className="actions">
              <button className="btn secondary" type="button" onClick={refreshApplications}>
                Refresh applicants
              </button>
            </div>
            {visibleApplications.length ? (
              <ul>
                {visibleApplications.map((application) => (
                  <li key={`${application.jobId}-${application.applicantEmail}`}>
                    {application.applicantName || application.applicantEmail || "Unknown"} - {application.title} ({application.status})
                    <div className="actions">
                      <button
                        className="btn secondary"
                        type="button"
                        onClick={() =>
                          updateStatus(application.jobId, application.applicantEmail, "Shortlisted")
                        }
                      >
                        Shortlist
                      </button>
                      <button
                        className="btn"
                        type="button"
                        onClick={() =>
                          updateStatus(application.jobId, application.applicantEmail, "Selected")
                        }
                      >
                        Select
                      </button>
                      <button
                        className="btn ghost"
                        type="button"
                        onClick={() =>
                          updateStatus(application.jobId, application.applicantEmail, "Rejected")
                        }
                      >
                        Reject
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No applied applicants.</p>
            )}
            <div className="actions">
              <Link className="btn secondary" to="/employer/applications">View all applications</Link>
            </div>
          </div>
          <div className="card">
            <h3>Hiring Analytics</h3>
            <p>Shortlisted: {analytics.shortlisted.map((item) => item.applicantName || item.applicantEmail || "Unknown").join(", ") || "None"}</p>
            <p>Selected: {analytics.selected.map((item) => item.applicantName || item.applicantEmail || "Unknown").join(", ") || "None"}</p>
            <p>Rejected: {analytics.rejected.map((item) => item.applicantName || item.applicantEmail || "Unknown").join(", ") || "None"}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
