import { acceptBid } from "../../services/jobsService";

export default function BidCard({ bid, ownerId }) {
  const userId = localStorage.getItem("userId");

  const handleAccept = async () => {
    await acceptBid(bid._id);
    window.location.reload();
  };

  return (
    <div className="bid-card">
      <p><strong>Amount:</strong> ${bid.amount}</p>
      <p><strong>Message:</strong> {bid.message}</p>
      <p><strong>Status:</strong> {bid.status}</p>
      <p><strong>Freelancer:</strong> {bid.freelancerId?.username}</p>

      {userId === ownerId && bid.status === "pending" && (
        <button onClick={handleAccept}>Accept Bid</button>
      )}
    </div>
  );
}
