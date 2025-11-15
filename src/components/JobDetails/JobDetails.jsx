import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getJobById } from "../../services/jobsService";
import BidList from "./BidList";
import SubmitBidForm from "./SubmitBidForm";
import { UserContext } from "../../contexts/UserContext";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchJob = async () => {
      const data = await getJobById(id);
      setJob(data);
      setLoading(false);
    };

    fetchJob();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!job) return <p>Job not found.</p>;

  return (
    <div className="job-details-container">
      <h1>{job.title}</h1>
      <p>{job.description}</p>

      <div className="job-info">
        <p><strong>Budget:</strong> ${job.budget}</p>
        <p><strong>Category:</strong> {job.category}</p>
        <p><strong>Status:</strong> {job.status}</p>
        <p><strong>Posted by:</strong> {job.owner?.username}</p>
      </div>

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
