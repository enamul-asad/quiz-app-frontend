import React, { useEffect, useState } from 'react';
import api from '../../services/api'; // Import your API helper

const HistorySection = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. Fetch Data on Load
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await api.get('history/');
                setHistory(response.data);
            } catch (error) {
                console.error("Failed to load history", error);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    // 2. Loading State
    if (loading) {
        return (
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 animate-pulse">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
                <div className="space-y-3">
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md dark:shadow-black/30 p-6 animate-fade-in">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Recent Results
            </h3>

            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 uppercase text-xs leading-normal">
                            <th className="py-3 px-6 text-left">Quiz Title</th>
                            <th className="py-3 px-6 text-left">Date</th>
                            <th className="py-3 px-6 text-center">Score</th>
                            <th className="py-3 px-6 text-center">Status</th>
                        </tr>
                    </thead>

                    <tbody className="text-gray-600 dark:text-gray-300 text-sm font-light">
                        {history.length > 0 ? (
                            history.map((item) => (
                                <ResultRow 
                                    key={item.id}
                                    title={item.quiz_title}
                                    // Format Date (e.g., "Oct 24, 2025")
                                    date={new Date(item.date).toLocaleDateString('en-US', {
                                        year: 'numeric', month: 'short', day: 'numeric'
                                    })}
                                    // Show "8/10 (80%)"
                                    score={`${item.score}/${item.total_questions} (${item.percentage}%)`}
                                    status={item.status}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="py-6 text-center text-gray-500">
                                    No quiz attempts yet. Go take a quiz!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Sub-component for individual rows
const ResultRow = ({ title, date, score, status }) => {
    return (
        <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            <td className="py-3 px-6 text-left whitespace-nowrap">
                <span className="font-medium text-gray-800 dark:text-gray-100">
                    {title}
                </span>
            </td>

            <td className="py-3 px-6 text-left">
                <span>{date}</span>
            </td>

            <td className="py-3 px-6 text-center">
                <span className="font-bold">{score}</span>
            </td>

            <td className="py-3 px-6 text-center">
                <span
                    className={`py-1 px-3 rounded-full text-xs font-bold uppercase tracking-wide
            ${status === 'Passed'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 border border-green-200 dark:border-green-800'
                            : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400 border border-red-200 dark:border-red-800'
                        }`}
                >
                    {status}
                </span>
            </td>
        </tr>
    );
};

export default HistorySection;