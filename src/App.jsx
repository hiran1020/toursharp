import React, { Suspense, lazy } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Loading from './components/Loading';

const Home = lazy(() => import('./pages/Home'));
const Tours = lazy(() => import('./pages/Tours'));
const TourDetails = lazy(() => import('./pages/TourDetails'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));

const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/tour/:id" element={<TourDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
