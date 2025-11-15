import { useState } from "react";
import { submitBid } from "../../services/jobsService";

export default function SubmitBidForm({ jobId }) {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitBid(jobId, { amount, message });
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit} className="submit-bid-form">
      <h3>Submit a Bid</h3>

      <label>Amount</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <label>Message</label>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button type="submit">Submit</button>
    </form>
  );
}
