import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobById } from "../../services/jobsService";
import BidList from "./BidList";
import SubmitBidForm from "./SubmitBidForm";
import ReviewModal from "../Reviews/ReviewModel";
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

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [acceptedFreelancerId, setAcceptedFreelancerId] = useState(null);

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

  useEffect(() => {
    if (job && job.bids) {
      const acceptedBid = job.bids.find(bid => bid.status === 'accepted');
      if (acceptedBid) {
        setAcceptedFreelancerId(acceptedBid.freelancerId);
      }
    }
  }, [job]);

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
  const handleCloseJob = async () => {
    if (!acceptedFreelancerId) {
      showToast("No freelancer accepted for this job", "error");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACK_END_SERVER_URL}/jobs/${job._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ status: "Closed" }),
        }
      );

      if (res.ok) {
        showToast("Job closed successfully", "success");
        setShowReviewModal(true); // Show review modal
        const updatedJob = await getJobById(id);
        setJob(updatedJob);
      } else {
        showToast("Failed to close job", "error");
      }
    } catch (err) {
      showToast("Error closing job", "error");
      console.error(err);
    }
  };

  const handleReviewSuccess = () => {
    showToast("Review submitted successfully!", "success");
  };

  if (loading) return <p>Loading...</p>;
  if (!job) return <p>Job not found.</p>;

  return (
    <div className="job-details-container">
      {/* Toast Message */}
      {showMessage && (
      <div className={`toast-message ${messageType === "success" ? "toast-success" : "toast-error"}`}>
        {message}
      </div>
    )}

      {/* Confirmation Modal */}
      {showConfirm && (
      <div className="modal-overlay">
        <div className="modal-box">
          <p className="modal-text">Are you sure you want to delete this job?</p>

          <div className="modal-buttons">
            <button
              onClick={() => { handleDelete(); setShowConfirm(false); }}
              className="btn btn-danger"
            >
              Confirm
            </button>

            <button
              onClick={() => setShowConfirm(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}


      {showReviewModal && acceptedFreelancerId && (
      <div className="modal-overlay">
        <div className="modal-box modal-large">
          <ReviewModal
            freelancerId={acceptedFreelancerId}
            clientId={user._id}
            onClose={() => setShowReviewModal(false)}
            onSuccess={handleReviewSuccess}
          />
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
        <div className="job-owner-actions">
          <button
            onClick={() => navigate(`/jobs/${job._id}/edit`)}
             className="btn btn-primary"
          >
            Edit Job
          </button>

          <button
            onClick={() => setShowConfirm(true)}
             className="btn btn-danger"
          >
            Delete Job
          </button>

       {job.status === "Close" && acceptedFreelancerId && (
      <button
        onClick={() => setShowReviewModal(true)}
        className="btn btn-warning"
         >
         Leave a Review
       </button>
          )}
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
