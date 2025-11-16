import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobById } from "../../services/jobsService";

export default function EditJobForm() {
  const { id } = useParams(); // Get job ID from URLL
  const navigate = useNavigate();

  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    budget: "",
    category: "",
    status: ""
  });

  const [loading, setLoading] = useState(true);

  // Toast message state
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success"); // success / error
  const [showMessage, setShowMessage] = useState(false);

  // Predefined job categories
  const categories = [
    "Web Development",
    "Mobile Development",
    "UI/UX Design",
    "Graphic Design",
    "Writing & Translation",
    "Digital Marketing",
    "Video & Animation",
    "Music & Audio",
    "Business",
    "Data & Analytics",
    "AI & Machine Learning",
    "Game Development",
    "Software Testing",
    "Cybersecurity",
    "Other"
  ];

  // Fetch job data when page loads
  useEffect(() => {
    const fetchJob = async () => {
      const job = await getJobById(id);

      if (job) {
        setJobData({
          title: job.title,
          description: job.description,
          budget: job.budget,
          category: job.category,
          status: job.status
        });
      }

      setLoading(false);
    };

    fetchJob();
  }, [id]);

  // Handle input/select changes
  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  // Show toast message
  const showToast = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setShowMessage(true);

    setTimeout(() => setShowMessage(false), 3000); // Hide after 3 seconds
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACK_END_SERVER_URL}/jobs/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify(jobData)
        }
      );

      if (res.ok) {
        showToast("Job updated successfully!", "success");
        setTimeout(() => navigate(`/jobs/${id}`), 1500); // Redirect after 1.5s
      } else {
        showToast("Failed to update job", "error");
      }
    } catch (err) {
      showToast("Error updating job", "error");
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="edit-job-container">
      <h1>Edit Job</h1>

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

      <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
        {/* Job Title */}
        <label>Title</label>
        <input
          name="title"
          value={jobData.title}
          onChange={handleChange}
          required
        />

        {/* Job Description */}
        <label>Description</label>
        <textarea
          name="description"
          value={jobData.description}
          onChange={handleChange}
          required
        />

        {/* Job Budget */}
        <label>Budget</label>
        <input
          type="number"
          name="budget"
          value={jobData.budget}
          onChange={handleChange}
          required
        />

        {/* Job Category as dropdown */}
        <label>Category</label>
        <select
          name="category"
          value={jobData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Job Status */}
        <label>Status</label>
        <select
          name="status"
          value={jobData.status}
          onChange={handleChange}
        >
          <option value="Open">Open</option>
          <option value="Close">Close</option>
          <option value="in-progress">In Progress</option>
        </select>

        {/* Submit button */}
        <button
          type="submit"
          style={{
            marginTop: "15px",
            padding: "10px 15px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
