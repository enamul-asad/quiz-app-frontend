import React, { useState, useRef, useEffect } from 'react';
import { FaCamera } from 'react-icons/fa';
import api from '../../services/api'; // Ensure this points to your axios helper

const ProfileUploader = () => {
  // Default placeholder
  const [image, setImage] = useState("https://placehold.co/150");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // 1. Fetch current avatar on load
  useEffect(() => {
    const fetchAvatar = async () => {
        try {
            const response = await api.get('user/avatar/');
            if (response.data.avatar) {
                setImage(response.data.avatar);
            }
        } catch (error) {
            console.error("Failed to load avatar", error);
        }
    };
    fetchAvatar();
  }, []);

  // 2. Handle File Selection & Upload
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Preview immediately
      const previewUrl = URL.createObjectURL(file);
      setImage(previewUrl);

      // Prepare Upload
      const formData = new FormData();
      formData.append('avatar', file);

      setUploading(true);
      try {
        // Send to Django
        // NOTE: 'Content-Type': 'multipart/form-data' is usually handled automatically by axios when sending FormData
        await api.patch('user/avatar/', formData);
        alert("Profile photo updated!");
      } catch (error) {
        console.error("Upload failed", error);
        alert("Failed to upload image.");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center mb-8">
      <div className="relative group">
        <img 
          src={image} 
          alt="Profile" 
          className={`w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg dark:border-gray-700 transition-opacity ${uploading ? 'opacity-50' : 'opacity-100'}`} 
        />
        
        {/* Loading Spinner Overlay */}
        {uploading && (
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#512da8]"></div>
            </div>
        )}

        {/* Camera Icon Overlay */}
        <button 
          onClick={handleButtonClick}
          className="absolute bottom-0 right-0 bg-[#512da8] text-white p-2 rounded-full hover:bg-indigo-900 transition shadow-md group-hover:scale-110"
          title="Change Photo"
          disabled={uploading}
        >
          <FaCamera size={16} />
        </button>
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImageChange} 
        accept="image/*" 
        className="hidden" 
      />
      
      <p className="text-xs text-gray-500 mt-2 dark:text-gray-400">Allowed *.jpeg, *.jpg, *.png</p>
    </div>
  );
};

export default ProfileUploader;