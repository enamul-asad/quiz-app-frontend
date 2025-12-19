import React, { useState, useEffect } from 'react';
import { FaClock, FaCheckCircle, FaExclamationTriangle, FaListAlt, FaShieldAlt } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

const QuizPage = () => {
    const { id } = useParams(); // Get Quiz ID from URL
    const navigate = useNavigate();

    // --- STATE ---
    const [quizData, setQuizData] = useState(null); // Stores Title, Time, Questions
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({}); // { questionId: optionId }

    // Result State
    const [result, setResult] = useState(null); // Stores server response (score, review)
    const [isReviewing, setIsReviewing] = useState(false);

    // UI State
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const [tabWarnings, setTabWarnings] = useState(0);

    // --- 1. FETCH QUIZ ON LOAD ---
    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await api.get(`quizzes/${id}/`);
                setQuizData(response.data);
                setTimeLeft(response.data.time_minutes * 60); // Convert mins to seconds
                setLoading(false);
            } catch (err) {
                console.error("Error fetching quiz:", err);
                setError("Failed to load quiz. Please try again.");
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [id]);

    // --- 2. ANTI-CHEAT & TIMER ---
    useEffect(() => {
        if (!quizData || result) return; // Don't run if loading or finished

        // Tab Switching Logic
        const handleVisibilityChange = () => {
            if (document.hidden) {
                const newWarnings = tabWarnings + 1;
                setTabWarnings(newWarnings);
                alert(`WARNING: Tab switching is monitored! (${newWarnings}/3)`);
                if (newWarnings >= 3) handleSubmitQuiz(); // Force submit
            }
        };

        // Disable Right Click
        const handleContextMenu = (e) => e.preventDefault();

        document.addEventListener('visibilitychange', handleVisibilityChange);
        document.addEventListener('contextmenu', handleContextMenu);

        // Timer Logic
        const timerId = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timerId);
                    handleSubmitQuiz(); // Time's up!
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            document.removeEventListener('contextmenu', handleContextMenu);
            clearInterval(timerId);
        };
    }, [quizData, result, tabWarnings]);

    // --- 3. HANDLERS ---

    const handleAnswerClick = (optionId) => {
        const currentQ = quizData.questions[currentQuestionIndex];
        setUserAnswers({ ...userAnswers, [currentQ.id]: optionId });
    };

    const jumpToQuestion = (index) => {
        setCurrentQuestionIndex(index);
    };

    const handleSubmitQuiz = async () => {
        // Guard clause: Prevent double submissions
        if (loading && quizData) return; 

        try {
            setLoading(true); // Disable button & show spinner
            const payload = { answers: userAnswers };
            const response = await api.post(`quizzes/${id}/submit/`, payload);
            setResult(response.data); // Save the Score & Review Data
        } catch (err) {
            console.error("Submission failed:", err);
            alert("Failed to submit quiz. Check your connection.");
            setLoading(false); // Re-enable button on error
        }
    };

    // --- RENDER HELPERS ---

    if (loading && !quizData) return <div className="min-h-screen flex items-center justify-center text-[#512da8]">Loading Quiz...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;

    // --- VIEW 1: REVIEW SCREEN (Uses Server Data) ---
    if (result && isReviewing) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 select-none font-montserrat">
                <div className="max-w-4xl mx-auto">
                    <button onClick={() => setIsReviewing(false)} className="mb-6 text-[#512da8] font-bold hover:underline">
                        &larr; Back to Score
                    </button>
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Detailed Review</h2>

                    <div className="space-y-6">
                        {result.review_data.map((q, idx) => (
                            <div key={q.question_id} className={`bg-white dark:bg-gray-800 p-6 rounded-xl border-l-4 shadow-sm ${q.is_correct ? 'border-green-500' : 'border-red-500'}`}>
                                <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-3">{idx + 1}. {q.question_text}</h3>
                                <div className="space-y-2">
                                    {q.options.map(opt => {
                                        let style = "p-3 rounded-lg border text-sm font-medium flex justify-between ";
                                        if (opt.id === q.correct_option_id) style += "bg-green-100 border-green-500 text-green-700 dark:bg-green-900/30 dark:text-green-400";
                                        else if (opt.id === q.user_selected_id) style += "bg-red-100 border-red-500 text-red-700 dark:bg-red-900/30 dark:text-red-400";
                                        else style += "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400";

                                        return (
                                            <div key={opt.id} className={style}>
                                                <span>{opt.text}</span>
                                                {opt.id === q.correct_option_id && <span>✓ Correct</span>}
                                                {opt.id === q.user_selected_id && opt.id !== q.correct_option_id && <span>✗ Your Answer</span>}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // --- VIEW 2: SCORE SCREEN ---
    if (result) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 select-none font-montserrat">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl text-center max-w-md w-full animate-scale-up">
                    {tabWarnings > 0 && (
                        <div className="bg-red-100 text-red-600 text-xs font-bold p-2 rounded mb-4 flex items-center justify-center">
                            <FaExclamationTriangle className="mr-2" /> Flagged: {tabWarnings} Tab Switches
                        </div>
                    )}

                    <div className="mb-6 relative inline-block">
                        <svg className="w-32 h-32 transform -rotate-90">
                            <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-200 dark:text-gray-700" />
                            <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={377} strokeDashoffset={377 - (377 * result.percentage) / 100} className="text-[#512da8] transition-all duration-1000 ease-out" />
                        </svg>
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
                            <span className="text-3xl font-bold text-gray-800 dark:text-white">{Math.round(result.percentage)}%</span>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{result.percentage >= 70 ? "Excellent!" : "Completed"}</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-8">You scored {result.score} out of {result.total}</p>

                    <div className="space-y-3">
                        <button onClick={() => setIsReviewing(true)} className="w-full py-3 bg-purple-100 text-[#512da8] font-bold rounded-xl hover:bg-purple-200 transition flex items-center justify-center">
                            <FaListAlt className="mr-2" /> Review Answers
                        </button>
                        <div className="flex space-x-3">
                            <button onClick={() => navigate('/dashboard')} className="flex-1 py-3 bg-[#512da8] text-white font-bold rounded-xl hover:bg-indigo-900 transition shadow-lg">Back Home</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // --- VIEW 3: ACTIVE QUIZ ---
    const currentQ = quizData.questions[currentQuestionIndex];
    const answeredCount = Object.keys(userAnswers).length;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8 select-none font-montserrat">
            {/* Header */}
            <div className="max-w-6xl mx-auto flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-xl font-bold text-gray-800 dark:text-white">{quizData.title}</h1>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Time Limit: {quizData.time_minutes} mins</span>
                </div>
                <div className={`flex items-center px-4 py-2 rounded-lg font-mono font-bold text-lg shadow-sm ${timeLeft < 60 ? 'bg-red-100 text-red-600' : 'bg-white dark:bg-gray-800 text-[#512da8] dark:text-indigo-400'}`}>
                    <FaClock className="mr-2" />
                    {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
                </div>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Question Area */}
                <div className="lg:col-span-3">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100 dark:border-gray-700 min-h-100 relative overflow-hidden">
                        <div className="absolute top-0 left-0 h-1.5 bg-gray-100 w-full">
                            <div className="h-full bg-[#512da8] transition-all duration-500" style={{ width: `${((currentQuestionIndex + 1) / quizData.questions.length) * 100}%` }}></div>
                        </div>

                        <div className="mb-6 mt-2">
                            <span className="text-[#512da8] dark:text-indigo-400 font-bold text-sm uppercase tracking-wider">Question {currentQuestionIndex + 1}</span>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mt-2 leading-relaxed">{currentQ.text}</h3>
                        </div>

                        <div className="space-y-3">
                            {currentQ.options.map((option) => {
                                const isSelected = userAnswers[currentQ.id] === option.id;
                                return (
                                    <button
                                        key={option.id}
                                        onClick={() => handleAnswerClick(option.id)}
                                        className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group
                                        ${isSelected
                                                ? 'border-[#512da8] bg-indigo-50 dark:bg-indigo-900/30 dark:border-indigo-500'
                                                : 'border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-800'
                                            }`}
                                    >
                                        <span className="flex items-center dark:text-gray-200">
                                            <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 text-sm font-bold transition-colors ${isSelected ? 'bg-[#512da8] text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>
                                                {String.fromCharCode(65 + currentQ.options.indexOf(option))}
                                            </span>
                                            {option.text}
                                        </span>
                                        {isSelected && <FaCheckCircle className="text-[#512da8] dark:text-indigo-400" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="mt-6 flex justify-between">
                        <button disabled={currentQuestionIndex === 0} onClick={() => setCurrentQuestionIndex(prev => prev - 1)} className="px-6 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-50 hover:bg-gray-300 transition">Previous</button>
                        
                        {currentQuestionIndex === quizData.questions.length - 1 ? (
                            // --- SUBMIT BUTTON WITH LOADING STATE ---
                            <button 
                                onClick={handleSubmitQuiz} 
                                disabled={loading} 
                                className={`px-6 py-2 rounded-lg text-white font-bold transition shadow-lg 
                                    ${loading 
                                        ? 'bg-green-400 cursor-not-allowed shadow-none' 
                                        : 'bg-green-600 hover:bg-green-700 shadow-green-500/30'
                                    }`}
                            >
                                {loading ? (
                                    <div className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </div>
                                ) : (
                                    "Submit Quiz"
                                )}
                            </button>
                        ) : (
                            <button onClick={() => setCurrentQuestionIndex(prev => prev + 1)} className="px-6 py-2 rounded-lg bg-[#512da8] text-white hover:bg-indigo-800 transition shadow-lg shadow-indigo-500/30">Next Question</button>
                        )}
                    </div>

                    <div className="mt-4 flex items-center justify-center text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 py-2 rounded-lg border border-gray-200 dark:border-gray-700">
                        <FaShieldAlt className="mr-2 text-[#512da8]" />
                        <span>Anti-cheat protection enabled: Tab switching is monitored.</span>
                    </div>
                </div>

                {/* Right Side Navigator */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 sticky top-6">
                        <h3 className="font-bold text-gray-800 dark:text-white mb-4">Quiz Progress</h3>
                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-6 space-x-2">
                            <div className="flex flex-col items-center"><span className="font-bold text-gray-800 dark:text-white">{answeredCount}</span><span>Done</span></div>
                            <div className="flex flex-col items-center"><span className="font-bold text-gray-800 dark:text-white">{quizData.questions.length - answeredCount}</span><span>Left</span></div>
                            <div className="flex flex-col items-center"><span className="font-bold text-gray-800 dark:text-white">{quizData.questions.length}</span><span>Total</span></div>
                        </div>
                        <div className="grid grid-cols-5 gap-2">
                            {quizData.questions.map((q, index) => {
                                const isAnswered = userAnswers[q.id] !== undefined;
                                const isCurrent = currentQuestionIndex === index;
                                let bubbleClass = "h-10 w-10 rounded-lg flex items-center justify-center text-sm font-bold transition-all border-2 ";
                                if (isCurrent) bubbleClass += "border-[#512da8] text-[#512da8] bg-white ring-2 ring-indigo-100 dark:ring-indigo-900 dark:bg-gray-800 dark:text-indigo-400 dark:border-indigo-400";
                                else if (isAnswered) bubbleClass += "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800";
                                else bubbleClass += "bg-gray-100 text-gray-400 border-transparent hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-500 dark:hover:bg-gray-600";
                                return <button key={q.id} onClick={() => jumpToQuestion(index)} className={bubbleClass}>{index + 1}</button>;
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizPage;