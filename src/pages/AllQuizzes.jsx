import React, { useState, useEffect } from 'react';
import QuizCard from '../components/dashboard/QuizCard'; 
import { FaSearch, FaLayerGroup } from 'react-icons/fa';
import api from '../services/api'; // Import API helper

const AllQuizzes = () => {
  // 1. State for Data & UI
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // 2. Fetch Quizzes from Backend
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        // GET /api/quizzes/
        const response = await api.get('quizzes/');
        setQuizzes(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load quizzes:", err);
        setError("Unable to load quizzes. Please try again later.");
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  // 3. Filter Logic (Frontend Filter)
  const filteredQuizzes = quizzes.filter((quiz) => 
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (quiz.difficulty && quiz.difficulty.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // 4. Loading State
  if (loading) {
    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">All Quizzes Library</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 h-48 animate-pulse shadow-sm">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        </div>
    );
  }

  // 5. Error State
  if (error) {
    return <div className="text-center text-red-500 py-20">{error}</div>;
  }

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">All Quizzes Library</h2>
      
      {/* Search Bar Section */}
      <div className="mb-8 relative w-full md:w-1/3">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
        </div>
        <input 
            type="text" 
            placeholder="Search by title or difficulty..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="w-full pl-10 p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#512da8] transition-all"
        />
      </div>

      {/* Display Results */}
      {filteredQuizzes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map((quiz) => (
            <QuizCard 
                key={quiz.id}
                id={quiz.id}
                title={quiz.title}
                // Your backend might not have 'difficulty' or 'questions' count yet, 
                // so we add fallbacks or you can update your Quiz Model later.
                questions={`${quiz.questions_count || 0} Questions`} 
                time={`${quiz.time_minutes} Mins`}
                difficulty={quiz.difficulty || "Medium"}
                // For the icon, we can use a default or map strings to icons later
                icon={<FaLayerGroup className="text-[#512da8]" />}
            />
            ))}
        </div>
      ) : (
        // Empty State
        <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No quizzes found matching "{searchTerm}"</p>
            <button 
                onClick={() => setSearchTerm('')} 
                className="mt-4 text-[#512da8] font-semibold hover:underline"
            >
                Clear Search
            </button>
        </div>
      )}
    </div>
  );
};

export default AllQuizzes;