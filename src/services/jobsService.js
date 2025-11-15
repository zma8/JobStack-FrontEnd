const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/jobs`;

// Fetch all jobs
export const getJobs = async () => {
  try {
    const res = await fetch(`${BASE_URL}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
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
