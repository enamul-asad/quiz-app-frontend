import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth'; 
import DashboardLayout from './layout/DashboardLayout'; 
import Dashboard from './pages/Dashboard';
import Leaderboard from './components/dashboard/Leaderboard';
import HistorySection from './components/dashboard/HistorySection';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Settings from './pages/Settings';
import AllQuizzes from './pages/AllQuizzes';
import QuizPage from './pages/QuizPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Auth />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Dashboard Routes (Layout with Sidebar) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="quizzes" element={<AllQuizzes />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="history" element={<HistorySection />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route
          path="/quiz/:id"
          element={
            <ProtectedRoute>
              <QuizPage />
            </ProtectedRoute>
          }
        />

        {/* Catch-all: Redirect unknown pages to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;