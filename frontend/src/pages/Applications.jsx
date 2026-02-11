import { useState } from "react";

const APPLICATIONS_KEY = "jea_applications";
const USERS_KEY = "jea_users";

export default function Applications() {
  const [applications] = useState(() => {
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

  return (
    <section className="card">
      <h2 className="section-title">Applications</h2>
      <p>Applicants for active job openings.</p>
      {applications.length ? (
        <div className="grid">
          {applications.map((application) => (
            <div className="card" key={`${application.jobId}-${application.applicantEmail}`}>
              <h3>{application.applicantName || application.applicantEmail || "Unknown"}</h3>
              <p>Role: {application.title}</p>
              <p>Status: {application.status}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No applications found.</p>
      )}
    </section>
  );
}
