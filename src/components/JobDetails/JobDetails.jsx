import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobById } from "../../services/jobsService";
import BidList from "./BidList";
import SubmitBidForm from "./SubmitBidForm";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

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

      {job.status === "Open" && <SubmitBidForm jobId={job._id} />}

      <hr />

      <BidList bids={job.bids} ownerId={job.owner?._id} />
    </div>
  );
}
