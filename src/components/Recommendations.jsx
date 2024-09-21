import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Recommendations = ({ userId }) => {
  const [recommendedTours, setRecommendedTours] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(`/api/recommendations?userId=${userId}`);
        setRecommendedTours(response.data);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };
    fetchRecommendations();
  }, [userId]);

  return (
    <div>
      <h2>Recommended Tours</h2>
      {recommendedTours.length > 0 ? (
        recommendedTours.map((tour) => (
          <div key={tour.id}>
            <h3>{tour.name}</h3>
            <p>{tour.description}</p>
          </div>
        ))
      ) : (
        <p>No recommendations available</p>
      )}
    </div>
  );
};

export default Recommendations;
