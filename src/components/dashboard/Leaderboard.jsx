import React, { useEffect, useState } from 'react';
import { FaTrophy, FaMedal, FaUserCircle, FaCrown } from 'react-icons/fa';
import api from '../../services/api';

const Leaderboard = () => {
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await api.get('leaderboard/');
                setLeaders(response.data);
            } catch (error) {
                console.error("Error fetching leaderboard:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    if (loading) return <div className="p-8 text-center text-gray-500">Loading Leaderboard...</div>;

    // Separate Top 3 from the rest
    const topThree = leaders.slice(0, 3);
    const rest = leaders.slice(3);

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 flex items-center">
                <FaTrophy className="text-yellow-500 mr-3" /> 
                Global Leaderboard
            </h2>

            {/* --- TOP 3 PODIUM --- */}
            {topThree.length > 0 && (
                <div className="flex flex-col md:flex-row justify-center items-end mb-12 gap-4">
                    
                    {/* 2nd Place (Silver) */}
                    {topThree[1] && (
                        <div className="flex flex-col items-center order-2 md:order-1">
                            <div className="w-20 h-20 rounded-full border-4 border-gray-300 bg-gray-200 flex items-center justify-center overflow-hidden -mb-5 z-10 shadow-lg">
                                <FaUserCircle className="text-5xl text-gray-400" />
                            </div>
                            <div className="bg-linear-to-b from-gray-300 to-gray-400 w-24 h-32 rounded-t-xl flex flex-col items-center justify-end p-4 shadow-xl">
                                <span className="font-bold text-white text-3xl">2</span>
                                <span className="text-xs text-white font-bold opacity-80 mt-1">Silver</span>
                            </div>
                            <p className="mt-2 font-bold text-gray-700 dark:text-gray-300 text-sm">{topThree[1].username}</p>
                            <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-[#512da8] font-bold">{topThree[1].score} pts</span>
                        </div>
                    )}

                    {/* 1st Place (Gold) */}
                    {topThree[0] && (
                        <div className="flex flex-col items-center order-1 md:order-2 scale-110">
                            <FaCrown className="text-yellow-400 text-3xl mb-1 animate-bounce" />
                            <div className="w-24 h-24 rounded-full border-4 border-yellow-400 bg-yellow-100 flex items-center justify-center overflow-hidden -mb-6.25 z-10 shadow-lg">
                                <FaUserCircle className="text-6xl text-yellow-600/50" />
                            </div>
                            <div className="bg-linear-to-b from-yellow-400 to-orange-500 w-28 h-40 rounded-t-xl flex flex-col items-center justify-end p-4 shadow-2xl relative">
                                <span className="font-bold text-white text-4xl">1</span>
                                <span className="text-xs text-white font-bold opacity-80 mt-1">Champion</span>
                            </div>
                            <p className="mt-2 font-bold text-gray-800 dark:text-white text-lg">{topThree[0].username}</p>
                            <span className="text-sm bg-[#512da8] text-white px-3 py-1 rounded-full font-bold shadow-md">{topThree[0].score} pts</span>
                        </div>
                    )}

                    {/* 3rd Place (Bronze) */}
                    {topThree[2] && (
                        <div className="flex flex-col items-center order-3">
                            <div className="w-20 h-20 rounded-full border-4 border-orange-300 bg-orange-100 flex items-center justify-center overflow-hidden -mb-5 z-10 shadow-lg">
                                <FaUserCircle className="text-5xl text-orange-400/50" />
                            </div>
                            <div className="bg-linear-to-b from-orange-300 to-orange-500 w-24 h-24 rounded-t-xl flex flex-col items-center justify-end p-4 shadow-xl">
                                <span className="font-bold text-white text-3xl">3</span>
                                <span className="text-xs text-white font-bold opacity-80 mt-1">Bronze</span>
                            </div>
                            <p className="mt-2 font-bold text-gray-700 dark:text-gray-300 text-sm">{topThree[2].username}</p>
                            <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-[#512da8] font-bold">{topThree[2].score} pts</span>
                        </div>
                    )}
                </div>
            )}

            {/* --- LIST FOR THE REST (4-10) --- */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
                {rest.length > 0 ? (
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-300 text-xs uppercase">
                            <tr>
                                <th className="px-6 py-4">Rank</th>
                                <th className="px-6 py-4">Player</th>
                                <th className="px-6 py-4 text-right">Score</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {rest.map((player) => (
                                <tr key={player.rank} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                    <td className="px-6 py-4 font-bold text-gray-400">#{player.rank}</td>
                                    <td className="px-6 py-4 flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-[#512da8] flex items-center justify-center mr-3 text-xs font-bold">
                                            {player.username.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="text-gray-700 dark:text-white font-medium">{player.username}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-[#512da8] dark:text-indigo-400">
                                        {player.score}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="p-6 text-center text-gray-400">
                        {leaders.length === 0 ? "No scores yet. Be the first!" : ""}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;