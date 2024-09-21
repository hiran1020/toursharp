import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AutocompleteSearch = ({ onSearchSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (searchTerm.length > 2) {
      axios.get(`/api/tours?search=${searchTerm}`)
        .then((response) => setSuggestions(response.data))
        .catch((error) => console.error('Error fetching autocomplete:', error));
    }
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectSuggestion = (tour) => {
    onSearchSelect(tour);
    setSearchTerm('');
  };

  return (
    <div className="autocomplete-search">
      <input
        type="text"
        value={searchTerm}
        placeholder="Search tours..."
        onChange={handleSearchChange}
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((tour) => (
            <li key={tour.id} onClick={() => handleSelectSuggestion(tour)}>
              {tour.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteSearch;
