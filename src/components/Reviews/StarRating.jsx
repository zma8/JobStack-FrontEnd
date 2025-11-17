import { useState } from 'react';

export default function StarRating({ rating, onRatingChange, readOnly = false }) {
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleClick = (star) => {
    if (!readOnly && onRatingChange) {
      onRatingChange(star);
    }
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= (hoveredStar || rating);

        return (
          <button
            key={star}
            type="button"
            className={`star ${isActive ? 'active' : 'inactive'}`}
            onClick={() => handleClick(star)}
            onMouseEnter={() => !readOnly && setHoveredStar(star)}
            onMouseLeave={() => !readOnly && setHoveredStar(0)}
            disabled={readOnly}
            style={{ 
              background: 'none', 
              border: 'none', 
              padding: 0,
              cursor: readOnly ? 'default' : 'pointer'
            }}
          >
            <span>{isActive ? '★' : '☆'}</span>
          </button>
        );
      })}
      {rating > 0 && <span> {rating}.0</span>}
    </div>
  );
}