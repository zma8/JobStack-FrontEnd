import BidCard from "./BidCard";

export default function BidList({ bids, ownerId, user }) {
  if (!bids || bids.length === 0) {
    return <p>No bids yet.</p>;
  }

  return (
    <div className="bid-list-container">
      <h2 className="bid-list-title">Bids</h2>
            <div className="bid-list">

      {bids.map((bid) => (
        <BidCard key={bid._id} bid={bid} ownerId={ownerId} user={user} />
      ))}
    </div>
       </div>

  );
}
