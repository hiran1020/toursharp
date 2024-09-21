import React from 'react';
import Recommendations from '../components/Recommendations';

const Dashboard = () => {
  const userId = 1; // Replace with actual userId

  return (
    <div>
      <h1>Dashboard</h1>
      <Recommendations userId={userId} />
    </div>
  );
};

export default Dashboard;
