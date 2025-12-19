import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import QuizCard from './QuizCard'; 
import { FaLayerGroup } from 'react-icons/fa'; // Generic Icon
import api from '../../services/api'; // Import API helper

const QuizSection = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Data from Backend
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await api.get('quizzes/');
        // We only want to show the first 3 quizzes on the dashboard home
        setQuizzes(response.data.slice(0, 3)); 
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch quizzes", error);
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  // 2. Loading State (Skeleton UI)
  if (loading) {
    return (
      <div className="mb-8">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {[1, 2, 3].map(i => (
              <div key={i} className="bg-white dark:bg-gray-800 h-48 rounded-xl shadow-sm animate-pulse"></div>
           ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Attempt a Quiz
        </h3>
        
        <Link 
            to="/dashboard/quizzes" 
            className="text-sm text-[#512da8] font-semibold cursor-pointer hover:underline dark:text-indigo-400"
        >
            View All
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.length > 0 ? (
            quizzes.map((quiz) => (
            <QuizCard 
                key={quiz.id}
                id={quiz.id}
                title={quiz.title}
                questions={`${quiz.questions_count || 0} Questions`}
                time={`${quiz.time_minutes} Mins`}
                difficulty={quiz.difficulty || "Medium"}
                icon={<FaLayerGroup className="text-[#512da8]" />} // Default icon
            />
            ))
        ) : (
            <div className="col-span-3 text-center py-10 text-gray-400 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                <p>No quizzes available yet.</p>
                <p className="text-xs mt-2">Check back later or ask admin to create one.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default QuizSection;