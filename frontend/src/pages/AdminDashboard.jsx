import { useState } from "react";

const initialRequests = [
  { id: "req-1", company: "Bright Labs", status: "Pending" },
  { id: "req-2", company: "NovaTech", status: "Pending" },
  { id: "req-3", company: "Skyline Works", status: "Pending" }
];

export default function AdminDashboard() {
  const [requests, setRequests] = useState(initialRequests);

  const pendingRequests = requests.filter((item) => item.status === "Pending");
  const pendingCount = pendingRequests.length;

  const handleAccept = (id) => {
    setRequests((prev) => prev.map((item) => (
      item.id === id ? { ...item, status: "Approved" } : item
    )));
  };

  return (
    <section>
      <div className="card">
        <h2 className="section-title">Admin Dashboard</h2>
        <div className="grid">
          <div className="card">
            <h3>Employer Verifications</h3>
            <p>{pendingCount} pending approvals</p>
            {pendingRequests.length ? (
              <ul>
                {pendingRequests.map((request) => (
                  <li key={request.id}>
                    {request.company} - Pending
                    <button
                      className="btn secondary"
                      type="button"
                      onClick={() => handleAccept(request.id)}
                    >
                      Accept
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No pending requests.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
