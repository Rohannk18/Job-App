export default function CompanyProfile() {
  return (
    <section className="card">
      <h2 className="section-title">Company Profile</h2>
      <p>Manage your company brand and verification status.</p>
      <div className="grid">
        <div className="card">
          <h3>About</h3>
          <p>Describe your mission and culture.</p>
        </div>
        <div className="card">
          <h3>Verification</h3>
          <p>Status: Pending review</p>
        </div>
      </div>
    </section>
  );
}
