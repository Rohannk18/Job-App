import { useMemo, useState } from "react";

const APPLICATIONS_KEY = "jea_applications";

const roadmap = [
  "Data structures refresher",
  "System design basics",
  "Behavioral interview practice",
  "Mock interview session",
  "Portfolio cleanup and project review"
];

export default function JobSeekerDashboard() {
  const [fullName, setFullName] = useState("");
  const [headline, setHeadline] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [projects, setProjects] = useState("");
  const [resumeDraft, setResumeDraft] = useState("");

  const applicationCount = useMemo(() => {
    const stored = localStorage.getItem(APPLICATIONS_KEY);
    const applications = stored ? JSON.parse(stored) : [];
    return applications.length;
  }, []);

  const generateResume = () => {
    const skillList = skills
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const resume = [
      `${fullName || "Your Name"}`,
      `${headline || "Professional Headline"}`,
      [location, email, phone].filter(Boolean).join(" | "),
      "",
      "Summary",
      summary || "Add a short professional summary.",
      "",
      "Skills",
      skillList.length ? `- ${skillList.join("\n- ")}` : "- Add your skills",
      "",
      "Experience",
      experience || "Add your experience entries.",
      "",
      "Projects",
      projects || "Add your project highlights.",
      "",
      "Education",
      education || "Add your education details."
    ].join("\n");

    setResumeDraft(resume.trim());
  };

  return (
    <section>
      <div className="card">
        <h2 className="section-title">Job Seeker Dashboard</h2>
        <div className="grid">
          <div className="card">
            <h3>Resume Builder</h3>
            <p>Create or update your AI-assisted resume.</p>
            <div className="grid">
              <div className="card">
                <label>Full name</label>
                <input
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Jane Doe"
                />
              </div>
              <div className="card">
                <label>Headline</label>
                <input
                  value={headline}
                  onChange={(event) => setHeadline(event.target.value)}
                  placeholder="Frontend Engineer"
                />
              </div>
              <div className="card">
                <label>Location</label>
                <input
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  placeholder="Remote, India"
                />
              </div>
              <div className="card">
                <label>Email</label>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="jane@example.com"
                  type="email"
                />
              </div>
              <div className="card">
                <label>Phone</label>
                <input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="+1 555 123 4567"
                />
              </div>
              <div className="card">
                <label>Summary</label>
                <textarea
                  value={summary}
                  onChange={(event) => setSummary(event.target.value)}
                  placeholder="2-3 lines about your experience and impact"
                  rows={4}
                />
              </div>
              <div className="card">
                <label>Skills (comma separated)</label>
                <input
                  value={skills}
                  onChange={(event) => setSkills(event.target.value)}
                  placeholder="React, Python, SQL"
                />
              </div>
              <div className="card">
                <label>Experience</label>
                <textarea
                  value={experience}
                  onChange={(event) => setExperience(event.target.value)}
                  placeholder="Company, role, dates, impact"
                  rows={4}
                />
              </div>
              <div className="card">
                <label>Projects</label>
                <textarea
                  value={projects}
                  onChange={(event) => setProjects(event.target.value)}
                  placeholder="Project name and outcomes"
                  rows={3}
                />
              </div>
              <div className="card">
                <label>Education</label>
                <textarea
                  value={education}
                  onChange={(event) => setEducation(event.target.value)}
                  placeholder="Degree, institution, year"
                  rows={3}
                />
              </div>
            </div>
            <div className="actions">
              <button className="btn" type="button" onClick={generateResume}>
                Build Resume
              </button>
            </div>
            {resumeDraft ? <pre className="status">{resumeDraft}</pre> : null}
          </div>
          <div className="card">
            <h3>Application Tracker</h3>
            <p>Applied: {applicationCount}</p>
          </div>
          <div className="card">
            <h3>Learning Roadmap</h3>
            <p>AI-guided resources for interview readiness:</p>
            <ul>
              {roadmap.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
