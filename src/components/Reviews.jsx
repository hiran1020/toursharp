import React, { useState } from 'react';

const Reviews = ({ tourId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);
  const [sortOrder, setSortOrder] = useState('newest');

  const handleSubmitReview = () => {
    const review = {
      id: Date.now(),
      rating,
      reviewText: newReview,
      tourId,
    };
    setReviews([...reviews, review]);
    setNewReview('');
    setRating(0);
  };

  const sortedReviews = reviews.sort((a, b) => {
    if (sortOrder === 'highest') return b.rating - a.rating;
    return a.id - b.id;
  });

  return (
    <div>
      <h2>User Reviews</h2>
      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="newest">Newest</option>
        <option value="highest">Highest Rating</option>
      </select>
      {sortedReviews.length === 0 ? <p>No reviews yet. Be the first!</p> : (
        <ul>
          {sortedReviews.map((review) => (
            <li key={review.id}>
              <strong>Rating: {review.rating}/5</strong>
              <p>{review.reviewText}</p>
            </li>
          ))}
        </ul>
      )}
      <textarea
        value={newReview}
        onChange={(e) => setNewReview(e.target.value)}
        placeholder="Leave your review"
      />
      <select value={rating} onChange={(e) => setRating(e.target.value)}>
        <option value={0}>Select Rating</option>
        {[...Array(5)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1} Star
          </option>
        ))}
      </select>
      <button onClick={handleSubmitReview}>Submit Review</button>
    </div>
  );
};

export default Reviews;
