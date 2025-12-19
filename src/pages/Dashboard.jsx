import React, { useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import StatsSection from '../components/dashboard/StatsSection';
import QuizSection from '../components/dashboard/QuizSection';
import HistorySection from '../components/dashboard/HistorySection';


const Dashboard = () => {
    return (
        <>
            <StatsSection />
            <QuizSection />
            <HistorySection />
        </>
    );
};

export default Dashboard;