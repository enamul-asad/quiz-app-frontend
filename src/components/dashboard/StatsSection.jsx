import React, { useEffect, useState } from 'react';
import { FaTrophy, FaPlay, FaCheckCircle } from 'react-icons/fa';
import api from '../../services/api'; // Import your API helper

const StatsSection = () => {
  // 1. Initialize State
  const [stats, setStats] = useState({
    total_quizzes: 0,
    average_score: 0,
    passed_quizzes: 0
  });
  const [loading, setLoading] = useState(true);

  // 2. Fetch Data
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('user/stats/');
        setStats(response.data);
      } catch (error) {
        console.error("Error loading stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Quizzes Card */}
      <StatCard 
        title="Total Quizzes" 
        value={loading ? "..." : stats.total_quizzes} 
        icon={<FaPlay />} 
        color="bg-blue-500" 
      />
      
      {/* Average Score Card */}
      <StatCard 
        title="Average Score" 
        value={loading ? "..." : `${stats.average_score}%`} 
        icon={<FaTrophy />} 
        color="bg-yellow-500" 
      />
      
      {/* Passed Quizzes Card */}
      <StatCard 
        title="Passed" 
        value={loading ? "..." : stats.passed_quizzes} 
        icon={<FaCheckCircle />} 
        color="bg-green-500" 
      />
    </div>
  );
};

// Helper Component (No changes needed here)
const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-black/30 p-6 flex items-center transition-colors border border-gray-100 dark:border-gray-700">
      
      <div className={`p-4 rounded-full text-white ${color} mr-4 shadow-sm`}>
        <span className="text-xl">{icon}</span>
      </div>

      <div>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
          {title}
        </p>
        <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-1">
          {value}
        </h4>
      </div>
    </div>
  );
};

export default StatsSection;