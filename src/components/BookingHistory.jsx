import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingHistory = ({ userId }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`/api/bookings?userId=${userId}`);
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    fetchBookings();
  }, [userId]);

  return (
    <div>
      <h2>Your Booking History</h2>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking.id}>
            <h3>{booking.tourName}</h3>
            <p>Booking Date: {booking.date}</p>
          </div>
        ))
      ) : (
        <p>No bookings found</p>
      )}
    </div>
  );
};

export default BookingHistory;
