import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobById } from "../../services/jobsService";
import BidList from "./BidList";
import SubmitBidForm from "./SubmitBidForm";
import { UserContext } from "../../contexts/UserContext";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  // Toast state
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success"); // success / error
  const [showMessage, setShowMessage] = useState(false);

  // Confirmation modal state
  const [showConfirm, setShowConfirm] = useState(false);

  const showToast = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  useEffect(() => {
    const fetchJob = async () => {
      const data = await getJobById(id);
      setJob(data);
      setLoading(false);
    };

    fetchJob();
  }, [id]);

  // DELETE JOB
  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACK_END_SERVER_URL}/jobs/${job._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.ok) {
        showToast("Job deleted successfully", "success");
        setTimeout(() => navigate("/jobs"), 1500); // redirect after 1.5s
      } else {
        showToast("Failed to delete job", "error");
      }
    } catch (err) {
      showToast("Error deleting job", "error");
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!job) return <p>Job not found.</p>;

  return (
    <div className="job-details-container">
      {/* Toast Message */}
      {showMessage && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: messageType === "success" ? "#4caf50" : "#f44336",
            color: "white",
            padding: "15px 25px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            zIndex: 9999,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {message}
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirm && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "25px",
            borderRadius: "10px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
            zIndex: 10000,
            textAlign: "center",
            minWidth: "300px",
          }}
        >
          <p style={{ marginBottom: "20px", fontWeight: "bold" }}>
            Are you sure you want to delete this job?
          </p>
          <div>
            <button
              onClick={() => { handleDelete(); setShowConfirm(false); }}
              style={{
                marginRight: "10px",
                padding: "8px 14px",
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Confirm
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              style={{
                padding: "8px 14px",
                background: "#777",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <h1>{job.title}</h1>
      <p>{job.description}</p>

      <div className="job-info">
        <p><strong>Budget:</strong> ${job.budget}</p>
        <p><strong>Category:</strong> {job.category}</p>
        <p><strong>Status:</strong> {job.status}</p>
        <p><strong>Posted by:</strong> {job.owner?.username}</p>
      </div>

      {/* Show Edit/Delete buttons only for owner */}
      {user?._id === job.owner?._id && (
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={() => navigate(`/jobs/${job._id}/edit`)}
            style={{
              marginRight: "10px",
              padding: "8px 14px",
              background: "#007bff",
              color: "white",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Edit Job
          </button>

          <button
            onClick={() => setShowConfirm(true)}
            style={{
              padding: "8px 14px",
              background: "red",
              color: "white",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Delete Job
          </button>
        </div>
      )}

      <hr />

      {job.status === "Open" &&
        user?.role === "freelancer" &&
        user?._id !== job.owner?._id && (
          <SubmitBidForm jobId={job._id} />
        )}

      <hr />

      <BidList bids={job.bids} ownerId={job.owner?._id} user={user} />
    </div>
  );
}
