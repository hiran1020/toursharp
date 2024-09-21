import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="home-container"
  >
    <h1>Explore Adventures</h1>
    <p>Discover exciting tours and activities around the world!</p>

    <div className="button-group">
      <Link to="/tours">
        <motion.button
          className="explore-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Explore Tours
        </motion.button>
      </Link>

      <Link to="/login">
        <motion.button
          className="login-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Login
        </motion.button>
      </Link>
    </div>
  </motion.div>
);

export default Home;
