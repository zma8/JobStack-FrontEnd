import { useState, useEffect } from 'react';
import { getFreelancerReviews } from '../../services/reviewService';
import StarRating from './StarRating';

export default function ReviewsList({ freelancerId }) {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, [freelancerId]);

  const fetchReviews = async () => {
    try {
      const data = await getFreelancerReviews(freelancerId);
      setReviews(data.reviews);
      setAverageRating(data.averageRating);
      setTotalReviews(data.totalReviews);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading reviews...</div>;
  }

  return (
    <div>
      {totalReviews > 0 && (
        <div>
          <h4>Average Rating: {averageRating.toFixed(1)}</h4>
          <StarRating rating={Math.round(averageRating)} readOnly={true} />
          <p>{totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}</p>
        </div>
      )}

      <div>
        {reviews.length === 0 ? (
          <p>No reviews yet</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index}>
              <StarRating rating={review.rating} readOnly={true} />
              {review.comment && <p>{review.comment}</p>}
              <p>
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
              <hr />
            </div>
          ))
        )}
      </div>
    </div>
  );
}