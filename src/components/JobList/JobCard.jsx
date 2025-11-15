import React from "react";

const JobCard = ({ job }) => {
  return (
    <div style={styles.card}>
      <h2 style={styles.title}>{job.title}</h2>

      <p style={styles.desc}>
        {job.description.length > 120
          ? job.description.slice(0, 120) + "..."
          : job.description}
      </p>

      <div style={styles.row}>
        <span style={styles.badge}>{job.category}</span>
        <span style={styles.budget}>${job.budget}</span>
      </div>

      <div style={styles.row}>
        <span>Status: {job.status}</span>
        <span>Bids: {job.bids?.length}</span>
      </div>

      <small style={styles.date}>
        Posted: {new Date(job.createdAt).toLocaleDateString()}
      </small>
    </div>
  );
};

const styles = {
  card: {
    background: "#fff",
    padding: "18px",
    borderRadius: "12px",
    boxShadow: "0 2px 9px rgba(0,0,0,0.1)",
    marginBottom: "18px",
    width: "100%",
  },
  title: {
    margin: 0,
    marginBottom: "8px",
  },
  desc: {
    fontSize: "14px",
    color: "#444",
    marginBottom: "12px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "6px",
  },
  badge: {
    background: "#eee",
    padding: "4px 10px",
    borderRadius: "8px",
    fontSize: "13px",
  },
  budget: {
    fontWeight: "bold",
  },
  date: {
    color: "#666",
    fontSize: "12px",
  },
};

export default JobCard;
