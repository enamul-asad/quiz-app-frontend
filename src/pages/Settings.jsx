import React, { useState, useEffect } from 'react';
import { FaUser, FaLock, FaBell, FaSave, FaTrash, FaMoon } from 'react-icons/fa';
import ProfileUploader from '../components/dashboard/ProfileUploader';
import ThemeToggle from '../components/dashboard/ThemeToggle';
import api from '../services/api'; 
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext';
const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(false);

    // 1. State for Profile Data
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username: ''
    });

    // 2. Fetch User Data on Load
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get('user/profile/');
                setFormData({
                    first_name: response.data.first_name || '',
                    last_name: response.data.last_name || '',
                    email: response.data.email || '',
                    username: response.data.username || ''
                });
            } catch (error) {
                console.error("Failed to load profile", error);
            }
        };
        fetchProfile();
    }, []);

    // 3. Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 4. Save Changes to Backend
    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.put('user/profile/', formData);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile", error);
            alert("Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    // Auth helpers
    const { logout } = useAuth();
    const navigate = useNavigate();

    // --- STATE FOR FORMS ---
    // Profile State
    const [profileData, setProfileData] = useState({
        first_name: '', last_name: '', email: '', username: ''
    });

    // Password State
    const [passwordData, setPasswordData] = useState({
        old_password: '',
        new_password: '',
        confirm_password: ''
    });

    // 1. Handle Profile Inputs
    const handleProfileChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    // 2. Handle Password Inputs
    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    // 3. Submit Password Change
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        
        if (passwordData.new_password !== passwordData.confirm_password) {
            alert("New passwords do not match!");
            return;
        }

        setLoading(true);
        try {
            await api.post('user/change-password/', {
                old_password: passwordData.old_password,
                new_password: passwordData.new_password
            });
            alert("Password updated successfully!");
            setPasswordData({ old_password: '', new_password: '', confirm_password: '' }); // Reset form
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data.error) {
                alert(error.response.data.error); // Show "Wrong old password"
            } else {
                alert("Failed to update password. Ensure it is strong enough.");
            }
        } finally {
            setLoading(false);
        }
    };

    // 4. Handle Account Deletion
    const handleDeleteAccount = async () => {
        if (window.confirm("Are you SURE? This action cannot be undone.")) {
            try {
                // Check the URL matches your Django URL
                await api.delete('user/delete-account/');
                
                alert("Account Deleted Successfully.");
                logout(); 
                navigate('/'); 
            } catch (error) {
                console.error("Delete failed", error);
                // This alert will tell us the exact error from the server
                if (error.response) {
                    alert("Server Error: " + JSON.stringify(error.response.data));
                } else {
                    alert("Network Error: Is the backend server running?");
                }
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Account Settings</h2>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden md:flex min-h-125 transition-colors duration-300">

                {/* Left Side: Navigation Menu */}
                <div className="md:w-1/4 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-4">
                    <div className="space-y-1">
                        <SettingsTab label="Edit Profile" icon={<FaUser />} isActive={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
                        <SettingsTab label="Security" icon={<FaLock />} isActive={activeTab === 'security'} onClick={() => setActiveTab('security')} />
                        <SettingsTab label="Preferences" icon={<FaMoon />} isActive={activeTab === 'preferences'} onClick={() => setActiveTab('preferences')} />
                    </div>
                </div>

                {/* Right Side: Content Area */}
                <div className="md:w-3/4 p-8 dark:text-gray-200">

                    {/* 1. PROFILE SECTION */}
                    {activeTab === 'profile' && (
                        <div className="animate-fade-in">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Public Profile</h3>

                            <ProfileUploader />

                            <form className="space-y-6" onSubmit={handleSave}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                                        <input
                                            type="text"
                                            name="first_name"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg focus:outline-none focus:border-[#512da8]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                                        <input
                                            type="text"
                                            name="last_name"
                                            value={formData.last_name}
                                            onChange={handleChange}
                                            className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg focus:outline-none focus:border-[#512da8]"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg focus:outline-none focus:border-[#512da8]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Username (Read Only)</label>
                                    <input
                                        type="text"
                                        value={formData.username}
                                        disabled
                                        className="w-full p-3 border border-gray-200 bg-gray-100 text-gray-500 dark:border-gray-700 dark:bg-gray-800 rounded-lg cursor-not-allowed"
                                    />
                                </div>

                                <button type="submit" disabled={loading} className="bg-[#512da8] text-white px-6 py-2 rounded-lg hover:bg-indigo-900 transition flex items-center disabled:opacity-50">
                                    <FaSave className="mr-2" /> {loading ? "Saving..." : "Save Changes"}
                                </button>
                            </form>
                        </div>
                    )}

                   {/* 2. SECURITY SECTION - UPDATED */}
                    {activeTab === 'security' && (
                        <div className="animate-fade-in">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Password & Security</h3>

                            <form className="space-y-6 max-w-md" onSubmit={handlePasswordSubmit}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Password</label>
                                    <input 
                                        type="password" 
                                        name="old_password"
                                        value={passwordData.old_password}
                                        onChange={handlePasswordChange}
                                        required
                                        className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg focus:outline-none focus:border-[#512da8]" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
                                    <input 
                                        type="password" 
                                        name="new_password"
                                        value={passwordData.new_password}
                                        onChange={handlePasswordChange}
                                        required
                                        className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg focus:outline-none focus:border-[#512da8]" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm New Password</label>
                                    <input 
                                        type="password" 
                                        name="confirm_password"
                                        value={passwordData.confirm_password}
                                        onChange={handlePasswordChange}
                                        required
                                        className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg focus:outline-none focus:border-[#512da8]" 
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    disabled={loading}
                                    className="bg-[#512da8] text-white px-6 py-2 rounded-lg hover:bg-indigo-900 transition flex items-center disabled:opacity-50"
                                >
                                    <FaLock className="mr-2" /> {loading ? "Updating..." : "Update Password"}
                                </button>
                            </form>

                            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                                <h4 className="text-red-600 font-bold mb-2">Danger Zone</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                                <button 
                                    onClick={handleDeleteAccount}
                                    className="border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition flex items-center"
                                >
                                    <FaTrash className="mr-2" /> Delete Account
                                </button>
                            </div>
                        </div>
                    )}

                    {/* 3. PREFERENCES SECTION */}
                    {activeTab === 'preferences' && (
                        <div className="animate-fade-in">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">App Preferences</h3>
                            <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-700">
                                <div className="flex items-center">
                                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg mr-4">
                                        <FaMoon className="text-gray-600 dark:text-gray-200" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-800 dark:text-white">Dark Mode</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Switch between light and dark themes.</p>
                                    </div>
                                </div>
                                <ThemeToggle />
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

const SettingsTab = ({ label, icon, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors 
        ${isActive
                ? 'bg-[#512da8] text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
    >
        <span className="mr-3 text-lg">{icon}</span>
        {label}
    </button>
);

export default Settings;