import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const QuizCard = ({ id, title, questions, time, difficulty, icon }) => {
  const navigate = useNavigate(); 

  const handleStartQuiz = () => {
    navigate(`/quiz/${id}`);
  };

  return (
    <div 
      onClick={handleStartQuiz} // <--- MOVED HERE: Now the whole card is clickable
      className="bg-white dark:bg-gray-900 rounded-xl shadow-md dark:shadow-black/30 
                 p-6 hover:shadow-lg transition-shadow 
                 border-l-4 border-[#512da8] group cursor-pointer relative"
    >

      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100 leading-tight">
            {title}
          </h4>
          <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">Programming</span>
        </div>
        <div className="text-3xl bg-gray-50 dark:bg-gray-800 p-2 rounded-lg group-hover:scale-110 transition-transform">
          {/* Fallback if icon is missing */}
          {icon || "📝"} 
        </div>
      </div>

      <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 space-y-2 border-t border-gray-100 dark:border-gray-800 pt-4">
        <div className="flex justify-between">
          <span>Questions:</span>
          {/* Ensure we handle numbers or strings */}
          <span className="font-medium text-gray-700 dark:text-gray-300">{questions}</span>
        </div>
        <div className="flex justify-between">
          <span>Time:</span>
          <span className="font-medium text-gray-700 dark:text-gray-300">{time}</span>
        </div>
        <div className="flex justify-between">
          <span>Difficulty:</span>
          <span
            className={`font-semibold px-2 py-0.5 rounded text-xs
                ${difficulty === 'Hard'
                ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                : difficulty === 'Medium'
                  ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
                  : 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
              }`}
          >
            {difficulty}
          </span>
        </div>
      </div>

      {/* Button is now just visual (pointer-events-none prevents double click issues) */}
      <button
        className="w-full bg-[#512da8] hover:bg-indigo-800 text-white py-2.5 rounded-lg transition-colors font-medium shadow-sm pointer-events-none"
      >
        Start Quiz
      </button>
    </div>
  );
};

export default QuizCard;