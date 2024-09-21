import React from 'react';

const TourCard = ({ tour }) => {
  return (
    <div className="card h-100">
      <img src={tour.image} className="card-img-top" alt={tour.name} />
      <div className="card-body">
        <h5 className="card-title">{tour.name}</h5>
        <p className="card-text">{tour.description}</p>
        <p className="card-text"><strong>Price:</strong> {tour.price}</p>
        <a href={`/tours/${tour.id}`} className="btn btn-primary">View Details</a>
      </div>
    </div>
  );
};

export default TourCard;
