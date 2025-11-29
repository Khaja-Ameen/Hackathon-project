import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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

// Layout Component
const MainLayout = ({ children }) => {
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
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Protected Routes (with Sidebar) */}
        <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
        <Route path="/activity" element={<MainLayout><Activity /></MainLayout>} />
        <Route path="/goals" element={<MainLayout><Goals /></MainLayout>} />
        <Route path="/mindfulness" element={<MainLayout><Mindfulness /></MainLayout>} />
        <Route path="/mood-tracker" element={<MainLayout><MoodTracker /></MainLayout>} />
        <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
        <Route path="/resources" element={<MainLayout><Resources /></MainLayout>} />
        <Route path="/sleep-log" element={<MainLayout><SleepLog /></MainLayout>} />
        <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
      </Routes>
    </Router>
  );
}

export default App;