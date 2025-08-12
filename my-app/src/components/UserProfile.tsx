import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../services/Api';

interface UserProfileData {
  id?: number;
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  bio?: string;
}

const UserProfile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfileData>({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const data = await getUserProfile();
      setProfile(data);
      setError(null);
    } catch (err) {
      setError('Failed to load profile');
      console.error('Error loading profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedProfile = await updateUserProfile(profile);
      setProfile(updatedProfile);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError('Failed to update profile');
      console.error('Error updating profile:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return <div className="text-center py-5 text-gray-600">Loading profile...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">User Profile</h2>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="username" className="mb-1 font-semibold text-gray-700">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={profile.username || ''}
            onChange={handleChange}
            disabled={!isEditing}
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-600"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 font-semibold text-gray-700">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={profile.email || ''}
            onChange={handleChange}
            disabled={!isEditing}
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-600"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="first_name" className="mb-1 font-semibold text-gray-700">
            First Name:
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={profile.first_name || ''}
            onChange={handleChange}
            disabled={!isEditing}
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-600"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="last_name" className="mb-1 font-semibold text-gray-700">
            Last Name:
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={profile.last_name || ''}
            onChange={handleChange}
            disabled={!isEditing}
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-600"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone" className="mb-1 font-semibold text-gray-700">
            Phone:
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={profile.phone || ''}
            onChange={handleChange}
            disabled={!isEditing}
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-600"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="bio" className="mb-1 font-semibold text-gray-700">
            Bio:
          </label>
          <textarea
            id="bio"
            name="bio"
            value={profile.bio || ''}
            onChange={handleChange}
            disabled={!isEditing}
            rows={4}
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-600"
          />
        </div>

        {isEditing && (
          <button 
            type="submit" 
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded transition-colors mt-4"
          >
            Save Changes
          </button>
        )}
      </form>

    </div>
  );
};

export default UserProfile;