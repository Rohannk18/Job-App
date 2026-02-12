import { useMemo, useState } from "react";

const focusOptions = [
  { key: "dsa", label: "Data structures refresher" },
  { key: "system", label: "System design basics" },
  { key: "behavioral", label: "Behavioral interview practice" },
  { key: "mock", label: "Mock interview sessions" },
  { key: "portfolio", label: "Portfolio cleanup and review" }
];

const sectionTemplates = {
  dsa: {
    title: "Data structures refresher",
    goal: "Rebuild algorithm confidence with a tight practice loop.",
    tasks: [
      "Arrays, strings, stacks, queues, hash maps",
      "Sorting, two pointers, sliding window",
      "Trees, graphs, BFS/DFS patterns",
      "Timed practice: 3 problems per session"
    ]
  },
  system: {
    title: "System design basics",
    goal: "Learn scalable architecture fundamentals and clear tradeoffs.",
    tasks: [
      "Design core components and APIs",
      "Caching, queues, databases, and indexing",
      "Failure modes, monitoring, and SLOs",
      "Practice 2 end-to-end design prompts"
    ]
  },
  behavioral: {
    title: "Behavioral interview practice",
    goal: "Build crisp stories with impact and measurable outcomes.",
    tasks: [
      "Create STAR stories for 6 key themes",
      "Practice concise impact framing",
      "Rehearse leadership and collaboration examples"
    ]
  },
  mock: {
    title: "Mock interview sessions",
    goal: "Simulate real interviews and tighten communication.",
    tasks: [
      "Schedule 2 mock sessions per week",
      "Record and review feedback notes",
      "Focus on thinking out loud"
    ]
  },
  portfolio: {
    title: "Portfolio cleanup and project review",
    goal: "Align projects with the role and polish presentation.",
    tasks: [
      "Audit top 3 projects and outcomes",
      "Update README, metrics, and demos",
      "Prepare a 60-second walkthrough"
    ]
  }
};

const roleAdds = {
  "Software Engineer": "Emphasize clean problem framing and complexity tradeoffs.",
  "Frontend Engineer": "Highlight UI architecture, performance, and accessibility.",
  "Backend Engineer": "Focus on API design, data modeling, and scalability.",
  "Data Analyst": "Add SQL, dashboards, and business metric storytelling.",
  "Product Manager": "Show product sense, prioritization, and stakeholder alignment."
};

const levelAdds = {
  Intern: "Lean on fundamentals, practice daily, and track progress.",
  Junior: "Build consistent practice cadence and project clarity.",
  Mid: "Sharpen system design depth and leadership stories.",
  Senior: "Prioritize strategic impact, mentoring, and architecture tradeoffs."
};

const defaultFocus = {
  dsa: true,
  system: true,
  behavioral: true,
  mock: true,
  portfolio: true
};

const buildRoadmap = ({ role, level, timelineWeeks, hoursPerWeek, focus }) => {
  const chosen = Object.entries(focus)
    .filter(([, value]) => value)
    .map(([key]) => key);

  const activeKeys = chosen.length ? chosen : Object.keys(defaultFocus);
  const totalSections = activeKeys.length;
  const baseWeeks = Math.floor(timelineWeeks / totalSections);
  let remainder = timelineWeeks % totalSections;
  let startWeek = 1;

  const sections = activeKeys.map((key) => {
    const span = baseWeeks + (remainder > 0 ? 1 : 0);
    remainder = Math.max(0, remainder - 1);
    const endWeek = startWeek + span - 1;
    const template = sectionTemplates[key];
    const section = {
      key,
      title: template.title,
      goal: template.goal,
      tasks: template.tasks,
      weekRange: `Week ${startWeek}-${endWeek}`
    };
    startWeek = endWeek + 1;
    return section;
  });

  const summary = [
    `Role focus: ${role}.`,
    `Level guidance: ${levelAdds[level]}`,
    `Weekly commitment: ${hoursPerWeek} hours.`
  ].join(" ");

  const markdown = [
    "# AI Learning Roadmap",
    `Role: ${role} | Level: ${level} | Timeline: ${timelineWeeks} weeks | Hours/week: ${hoursPerWeek}`,
    "",
    summary,
    "",
    ...sections.flatMap((section) => [
      `## ${section.weekRange}: ${section.title}`,
      section.goal,
      "",
      ...section.tasks.map((task) => `- ${task}`),
      ""
    ])
  ].join("\n");

  return { sections, summary, markdown };
};

export default function Roadmap() {
  const [role, setRole] = useState("Software Engineer");
  const [level, setLevel] = useState("Junior");
  const [timelineWeeks, setTimelineWeeks] = useState(8);
  const [hoursPerWeek, setHoursPerWeek] = useState(6);
  const [focus, setFocus] = useState(defaultFocus);
  const [generated, setGenerated] = useState(null);

  const handleToggle = (key) => {
    setFocus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleGenerate = () => {
    const safeWeeks = Math.max(4, Math.min(16, Number(timelineWeeks) || 8));
    const safeHours = Math.max(3, Math.min(15, Number(hoursPerWeek) || 6));
    setTimelineWeeks(safeWeeks);
    setHoursPerWeek(safeHours);
    setGenerated(buildRoadmap({ role, level, timelineWeeks: safeWeeks, hoursPerWeek: safeHours, focus }));
  };

  const handleReset = () => {
    setRole("Software Engineer");
    setLevel("Junior");
    setTimelineWeeks(8);
    setHoursPerWeek(6);
    setFocus(defaultFocus);
    setGenerated(null);
  };

  const downloadName = useMemo(() => {
    const safeRole = role.toLowerCase().replace(/\s+/g, "-");
    return `roadmap-${safeRole}-${timelineWeeks}w.md`;
  }, [role, timelineWeeks]);

  const handleDownload = () => {
    if (!generated) return;
    const blob = new Blob([generated.markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = downloadName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="roadmap-page">
      <div className="card roadmap-hero fade-up">
        <div>
          <div className="pill-row">
            <span className="pill">AI guided</span>
            <span className="pill">Custom timeline</span>
            <span className="pill">Interview ready</span>
          </div>
          <h1>Learning Roadmap</h1>
          <p className="hero-subtitle">
            Build a focused plan for interview readiness with role-specific guidance,
            weekly milestones, and a downloadable roadmap.
          </p>
          <p className="roadmap-meta">
            {roleAdds[role]} {levelAdds[level]}
          </p>
        </div>
        <div className="card">
          <h3>Quick tips</h3>
          <ul>
            <li>Pick a timeline you can sustain.</li>
            <li>Keep mock interviews on the calendar.</li>
            <li>Ship small updates to your portfolio weekly.</li>
          </ul>
        </div>
      </div>

      <div className="card fade-up">
        <h2 className="section-title">Generate your roadmap</h2>
        <div className="roadmap-form">
          <div className="form-row">
            <div>
              <label>Target role</label>
              <select value={role} onChange={(event) => setRole(event.target.value)}>
                {Object.keys(roleAdds).map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Experience level</label>
              <select value={level} onChange={(event) => setLevel(event.target.value)}>
                {Object.keys(levelAdds).map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div>
              <label>Timeline (weeks)</label>
              <input
                type="number"
                min="4"
                max="16"
                value={timelineWeeks}
                onChange={(event) => setTimelineWeeks(event.target.value)}
              />
            </div>
            <div>
              <label>Hours per week</label>
              <input
                type="number"
                min="3"
                max="15"
                value={hoursPerWeek}
                onChange={(event) => setHoursPerWeek(event.target.value)}
              />
            </div>
          </div>
          <div>
            <label>Focus areas</label>
            <div className="checkbox-grid">
              {focusOptions.map((item) => (
                <label key={item.key} className="checkbox-card">
                  <input
                    type="checkbox"
                    checked={focus[item.key]}
                    onChange={() => handleToggle(item.key)}
                  />
                  {item.label}
                </label>
              ))}
            </div>
          </div>
          <div className="actions">
            <button className="btn" type="button" onClick={handleGenerate}>Generate roadmap</button>
            <button className="btn ghost" type="button" onClick={handleReset}>Reset</button>
            <button
              className="btn secondary"
              type="button"
              onClick={handleDownload}
              disabled={!generated}
            >
              Download markdown
            </button>
          </div>
        </div>
      </div>

      {generated ? (
        <>
          <div className="roadmap-grid">
            {generated.sections.map((section) => (
              <div key={section.key} className="roadmap-card fade-up">
                <div className="roadmap-meta">{section.weekRange}</div>
                <h3>{section.title}</h3>
                <p>{section.goal}</p>
                <ul>
                  {section.tasks.map((task) => (
                    <li key={task}>{task}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="card">
            <h3>Roadmap output</h3>
            <p className="roadmap-meta">Copy or download this plan.</p>
            <pre className="roadmap-output">{generated.markdown}</pre>
          </div>
        </>
      ) : null}
    </section>
  );
}
