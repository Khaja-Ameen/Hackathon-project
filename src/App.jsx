import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';

// Import Layout
import Sidebar from './components/Sidebar';

// Import Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Activity from './pages/Activity';
import Goals from './pages/Goals';
import Mindfulness from './pages/Mindfulness';
import MoodTracker from './pages/MoodTracker';
import Profile from './pages/Profile';
import Resources from './pages/Resources';
import SleepLog from './pages/SleepLog';
import Settings from './pages/Settings';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = React.useContext(AuthContext);
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/activity" element={<ProtectedRoute><Activity /></ProtectedRoute>} />
          <Route path="/goals" element={<ProtectedRoute><Goals /></ProtectedRoute>} />
          <Route path="/mindfulness" element={<ProtectedRoute><Mindfulness /></ProtectedRoute>} />
          <Route path="/mood-tracker" element={<ProtectedRoute><MoodTracker /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/resources" element={<ProtectedRoute><Resources /></ProtectedRoute>} />
          <Route path="/sleep-log" element={<ProtectedRoute><SleepLog /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;