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
      
      const reviewsArray = data.reviews || [];
      setReviews(reviewsArray);
      
      if (reviewsArray.length > 0) {
        const sum = reviewsArray.reduce((acc, review) => acc + (review.rating || 0), 0);
        const avg = sum / reviewsArray.length;
        setAverageRating(avg);
        console.log('Calculated average:', avg, 'from reviews:', reviewsArray.map(r => r.rating));
      } else {
        setAverageRating(0);
      }
      
      setTotalReviews(reviewsArray.length);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading reviews...</div>;
  }

  return (
    <div className="reviews-list-container">
      {totalReviews > 0 && (
        <div className="reviews-summary">
          <h4>Average Rating: {averageRating.toFixed(1)}</h4>
          <StarRating rating={Math.round(averageRating)} readOnly={true} />
          <p>{totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}</p>
        </div>
      )}

      <div className="reviews-list">
        {reviews.length === 0 ? (
          <p className="reviews-empty">No reviews yet</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} className="review-item">
              <StarRating rating={review.rating} readOnly={true} />
              {review.comment && <p>{review.comment}</p>}
              <p>
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}