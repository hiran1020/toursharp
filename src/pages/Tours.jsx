import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Card, Button, Row, Col, Spinner, Alert } from 'react-bootstrap';
import Filters from '../components/Filters';
import { Link } from 'react-router-dom';
import useFetchImages from '../components/useFetchImages';

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredTourId, setHoveredTourId] = useState(null);
  const tourNames = filteredTours.map(tour => tour.name);
  const { imagesMap, videosMap, loading: imagesLoading, error: fetchError } = useFetchImages(tourNames);

  const handleFilterChange = useCallback((filters) => {
    const { price, location, duration } = filters;
    const filtered = tours.filter((tour) => {
      const isPriceValid = price
        ? tour.price >= price[0] && tour.price <= price[1]
        : true;
      const isLocationValid = location
        ? (tour.location ? tour.location.toLowerCase().includes(location.toLowerCase()) : false)
        : true;
      const isDurationValid = duration
        ? (tour.duration ? tour.duration.toLowerCase().includes(duration.toLowerCase()) : false)
        : true;
      return isPriceValid && isLocationValid && isDurationValid;
    });
    setFilteredTours(filtered);
  }, [tours]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const tourResponse = await axios.get('/api/countries.json');
        setTours(tourResponse.data);
        setFilteredTours(tourResponse.data);
      } catch (err) {
        setError('Failed to load tours.');
        console.error('Failed to load tours', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const getVideoUrl = (tourName) => {
    const video = videosMap[tourName];
    return video ? video : null;
  };

  const handleMouseEnter = (tourId) => {
    setHoveredTourId(tourId);
  };

  const handleMouseLeave = () => {
    setHoveredTourId(null);
  };

  return (
    <div className="container mt-5">
      <Filters onFilterChange={handleFilterChange} />
      {loading || imagesLoading ? (
        <Spinner animation="border" />
      ) : (
        <>
          {error && <Alert variant="danger">{error.message}</Alert>}
          {fetchError && <Alert variant="danger">{fetchError.message}</Alert>}
          {filteredTours.length === 0 ? (
            <p>No tours match your filters.</p>
          ) : (
            <Row>
              {filteredTours.map((tour) => (
                <Col key={tour.id} md={4} className="mb-4">
                  <Card
                    onMouseEnter={() => handleMouseEnter(tour.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {hoveredTourId === tour.id ? (
                      <video
                        src={getVideoUrl(tour.name)}
                        autoPlay
                        muted
                        loop
                        className="card-img-top"
                      />
                    ) : (
                      <Card.Img
                        variant="top"
                        src={imagesMap[tour.name] || 'path/to/default/image.jpg'}
                        alt={tour.name}
                      />
                    )}
                    <Card.Body>
                      <Card.Title>{tour.name}</Card.Title>
                      <Card.Text>
                        {tour.description}
                        <br />
                        Places To Visit: {tour.place_to_visit.join(', ')}
                      </Card.Text>
                      <Card.Text>Price: ${tour.price}</Card.Text>
                      <Link to={`/tour/${tour.id}`}>
                        <Button variant="primary">View Details</Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </>
      )}
    </div>
  );
  
};

export default Tours;
