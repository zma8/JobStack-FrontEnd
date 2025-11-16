import { useContext, useState } from "react";
import { createJob } from "../../services/jobsService";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function CreateJobForm() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [category, setCategory] = useState("");

  // Categories from backend model
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

  if (!user || user.role !== "client") {
    return <h3>You are not authorized to post jobs.</h3>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      title,
      description,
      budget: Number(budget),
      category,
    };

    const created = await createJob(jobData);

    if (created) {
      navigate("/jobs"); // redirect to job list
    }
  };

  return (
    <div style={styles.container}>
      <h1>Create New Job</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <label>Job Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Description</label>
        <textarea
          rows="5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label>Budget ($)</label>
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
        />

        <label>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <button type="submit" style={styles.button}>Create Job</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  button: {
    marginTop: "10px",
    background: "#007bff",
    color: "#fff",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },
};
