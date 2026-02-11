export default function Moderation() {
  return (
    <section className="card">
      <h2 className="section-title">Moderation</h2>
      <p>Approve job posts, resolve complaints, and manage fake listings.</p>
      <div className="actions">
        <button className="btn" type="button">Approve all verifications</button>
      </div>
      <div className="grid">
        <div className="card">
          <h3>Job Report #118</h3>
          <p>Reason: Suspicious salary range</p>
          <p>Applicants: 24</p>
          <button>Resolve</button>
        </div>
        <div className="card">
          <h3>Employer Verification</h3>
          <p>Company: Bright Labs</p>
          <button>Approve</button>
        </div>
      </div>
    </section>
  );
}
