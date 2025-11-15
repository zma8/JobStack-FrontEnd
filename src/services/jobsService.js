const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/jobs`;

const getToken = () => localStorage.getItem("token");

// Fetch all jobs
export const getJobs = async () => {
  try {
    const res = await fetch(BASE_URL, {
      method: "GET",
      headers: { Authorization: `Bearer ${getToken()}` }
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.err || "Failed to fetch jobs");
    }

    return data;
  } catch (err) {
    console.error("Error fetching jobs:", err);
    return [];
  }
};

// Fetch a single job
export const getJobById = async (jobId) => {
  try {
    const res = await fetch(`${BASE_URL}/${jobId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.err || "Failed to fetch job details");
    }

    return data;
  } catch (err) {
    console.error("Error fetching job:", err);
    return null;
  }
};

// Submit a bid
export const submitBid = async (jobId, bidData) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/bids`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify({ ...bidData, jobId })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.err || "Failed to submit bid");
    }

    return data;
  } catch (err) {
    console.error("Error submitting bid:", err);
    return null;
  }
};

// Accept a bid
export const acceptBid = async (bidId) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BACK_END_SERVER_URL}/bids/${bidId}/accept`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${getToken()}` }
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.err || "Failed to accept bid");
    }

    return data;
  } catch (err) {
    console.error("Error accepting bid:", err);
    return null;
  }
};