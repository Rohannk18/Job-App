import { useEffect, useState } from "react";

const APPLICATIONS_KEY = "jea_applications";
const EMPLOYER_JOBS_KEY = "jea_employer_jobs";
const AUTH_KEY = "jea_auth";

const mockJobs = [
  { id: "ln-101", title: "Frontend Engineer", location: "Remote", type: "Full Time", skills: ["React", "UI"] },
  { id: "ln-102", title: "Data Analyst", location: "New York", type: "Contract", skills: ["SQL", "Python"] },
  { id: "ln-103", title: "Product Designer", location: "London", type: "Full Time", skills: ["Figma", "UX"] }
];

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState("");
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    // Placeholder for external job feed integration.
    const authStored = localStorage.getItem(AUTH_KEY);
    setAuthUser(authStored ? JSON.parse(authStored) : null);
    const storedEmployerJobs = localStorage.getItem(EMPLOYER_JOBS_KEY);
    const employerJobs = storedEmployerJobs ? JSON.parse(storedEmployerJobs) : [];
    const formattedEmployerJobs = employerJobs.map((job) => ({
      id: job.id,
      title: job.title,
      location: job.location,
      type: job.jobType,
      skills: ["Company Post"],
      source: "Employer"
    }));
    setJobs([...formattedEmployerJobs, ...mockJobs]);
  }, []);

  const handleApply = (job) => {
    if (!authUser) {
      setStatus("Please sign in to apply.");
      return;
    }
    if (authUser.role !== "Job Seeker") {
      setStatus("Only job seekers can apply for jobs.");
      return;
    }
    const storedApps = localStorage.getItem(APPLICATIONS_KEY);
    const applications = storedApps ? JSON.parse(storedApps) : [];
    const exists = applications.find(
      (item) => item.jobId === job.id && item.applicantEmail === authUser.email
    );
    if (exists) {
      setStatus("You already applied to this job.");
      return;
    }
    const displayName = authUser.name && authUser.name.trim()
      ? authUser.name.trim()
      : authUser.email;
    const updated = [
      ...applications,
      {
        jobId: job.id,
        title: job.title,
        company: job.source === "Employer" ? "Employer Post" : "External Feed",
        applicantName: displayName,
        applicantEmail: authUser.email,
        status: "Applied",
        appliedAt: new Date().toISOString()
      }
    ];
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(updated));
    setStatus(`Applied to ${job.title}.`);
  };

  return (
    <section>
      <div className="card">
        <h2 className="section-title">Latest Job Openings</h2>
        <p className="status">External job feed placeholder (including employer-posted jobs).</p>
        {status ? <p className="status">{status}</p> : null}
        <div className="grid">
          {jobs.map((job) => (
            <div className="card" key={job.id}>
              <h3>{job.title}</h3>
              <p>{job.location} | {job.type}</p>
              <div>
                {job.skills.map((skill) => (
                  <span className="tag" key={skill}>{skill}</span>
                ))}
              </div>
              <div className="actions">
                <button className="btn" type="button" onClick={() => handleApply(job)}>
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
