import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';

import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Predict from '../pages/Predict';
import History from '../pages/History';
import PredictionDetails from '../pages/PredictionDetails';
import Analytics from '../pages/Analytics';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/predict" element={<ProtectedRoute><Predict /></ProtectedRoute>} />
      <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
      <Route path="/history/:id" element={<ProtectedRoute><PredictionDetails /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
