import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';

const PEXELS_API_KEY = 'ESSQhHb1zCBXURnhwpYfkKwpXUaM08Dfn5EDHl0NikF1W9Odpo823gIU';


const TourDetails = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    // Fetch the tour details from the local JSON file
    fetch('/api/tours.json')
      .then(response => response.json())
      .then(data => {
        const selectedTour = data.find(t => t.id === parseInt(id));
        setTour(selectedTour);
        fetchTourImages(selectedTour?.name); // Use the tour's name to fetch images
      });
  }, [id]);

  // Function to fetch multiple tour images from Pexels based on the tour name
  const fetchTourImages = async (tourName) => {
    if (!tourName) return;

    try {
      const query = tourName.split(" in ").pop(); // Extract the place name, i.e., "Swiss Alps", "Bali", etc.
      const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=15`, {
        headers: {
          Authorization: PEXELS_API_KEY
        }
      });
      const data = await response.json();
      console.log('Pexels API Response:', data);

      if (data.photos && data.photos.length > 0) {
        const fetchedImages = data.photos.map(photo => photo.src.landscape); 
        console.log('Fetched Images:', fetchedImages); 
        setImages(fetchedImages);
      } else {
        console.error('No images found for the query:', query);
      }
    } catch (error) {
      console.error("Error fetching images from Pexels:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching images
    }
  };

  // Wait for images to load before rendering
  if (loading) return <p>Loading images...</p>;

  if (!tour) return <p>Tour not found.</p>;

  return (
    <div className="container mt-5">
      <h1>{tour.name}</h1>
        {/* Centered Bootstrap Carousel */}
        {images.length > 0 ? (
          <div id="tourImagesCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="2500">
            <div className="carousel-inner">
              {images.map((image, index) => (
                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                  <img src={image} className="d-block mx-auto" alt={tour.name} style={{ width: '800px', height: '500px' }} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <img src="/placeholder.jpg" alt={tour.name} className="img-fluid mx-auto d-block" style={{ width: '500px', height: '500px' }} />
        )}



      <p>{tour.description}</p>
      <p><strong>Price:</strong> ${tour.price}</p>
      <h3>Itinerary:</h3>
      <ul>
        {tour.itinerary.map(item => (
          <li key={item.day}>Day {item.day}: {item.activity}</li>
        ))}
      </ul>

      <CheckoutForm />
    </div>
  );
};

export default TourDetails;