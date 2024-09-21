import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import 'bootstrap/dist/css/bootstrap.min.css';

// Sample locations for demonstration
const locations = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose"
];

const Filters = ({ onFilterChange }) => {
  const [price, setPrice] = useState([0, 10000]);
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handlePriceChange = (e, type) => {
    const value = parseInt(e.target.value);
    const newPrice = [...price];

    if (type === 'min') {
      newPrice[0] = Math.min(value, newPrice[1]); // Ensure min doesn't exceed max
    } else {
      newPrice[1] = Math.max(value, newPrice[0]); // Ensure max doesn't go below min
    }

    setPrice(newPrice);
    onFilterChange({ price: newPrice, location, duration });
  };

  const handleLocationChange = (event, { newValue }) => {
    setLocation(newValue);
  };

  const handleDurationChange = (e) => {
    const newDuration = e.target.value;
    setDuration(newDuration);
    onFilterChange({ price, location, duration: newDuration });
  };

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : locations.filter(loc =>
      loc.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) => suggestion;

  const renderSuggestion = (suggestion) => (
    <div className="p-2">{suggestion}</div>
  );

  const inputProps = {
    placeholder: "Enter location",
    value: location,
    onChange: handleLocationChange,
    className: "form-control"
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFilterChange({ price, location, duration });
    }, 300); // Debounce time

    return () => clearTimeout(timeoutId);
  }, [price, location, duration, onFilterChange]); // Added onFilterChange here

  return (
    <div className="mb-4 p-3 border rounded bg-light">
      <h5>Filters</h5>

      <div className="mb-3">
        <label className="form-label">Price Range: </label>
        <input
          type="range"
          className="form-range"
          min="0"
          max="10000"
          value={price[0]}
          onChange={(e) => handlePriceChange(e, 'min')}
        />
        <input
          type="range"
          className="form-range mt-2"
          min="0"
          max="10000"
          value={price[1]}
          onChange={(e) => handlePriceChange(e, 'max')}
        />
        <div className="d-flex justify-content-between">
          <span>Min: ${price[0]}</span>
          <span>Max: ${price[1]}</span>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Location: </label>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          theme={{
            container: 'position-relative',
            suggestionsContainer: 'position-absolute w-100 bg-white border border-light rounded',
            suggestion: 'p-2',
            suggestionsList: 'list-unstyled',
          }}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Duration: </label>
        <input
          type="text"
          className="form-control"
          value={duration}
          placeholder="Enter duration (e.g., 3 days)"
          onChange={handleDurationChange}
        />
      </div>
    </div>
  );
};

export default Filters;
