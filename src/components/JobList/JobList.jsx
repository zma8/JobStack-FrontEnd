import React, { useEffect, useState } from "react";
import { getJobs } from "../../services/jobsService";
import JobCard from "./JobCard";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getJobs();
      setJobs(data);
      setLoading(false);
    };

    fetchJobs();
  }, []);

  if (loading) return <h3>Loading jobs...</h3>;

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Available Jobs</h1>

      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        jobs.map((job) => <JobCard key={job._id} job={job} />)
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "700px",
    margin: "0 auto",
    padding: "20px",
  },
  heading: {
    marginBottom: "20px",
  },
};

export default JobList;
