'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usersService, postsService } from '@/lib/database';
import { storageService } from '@/lib/database/storage';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Avatar from '@/components/ui/Avatar';
import Icon from '@/components/ui/Icon';
import Card from '@/components/ui/Card';
import PostFeed from '@/components/posts/PostFeed';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('posts');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [userStats, setUserStats] = useState({ posts: 0, followers: 0, following: 0, likes: 0 });
  const [userPosts, setUserPosts] = useState([]);
  const [error, setError] = useState('');
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  
  const { user, profile, updateProfile, fetchProfile } = useAuth();
  
  const [editData, setEditData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    bio: '',
    city: '',
    website: ''
  });

  // Handle initial profile loading when user is available
  useEffect(() => {
    if (user && !profile) {
      // User is available but profile isn't loaded yet, fetch it
      fetchProfile(user.id).then(() => {
        setLoading(false);
      });
    } else if (user && profile) {
      // Both user and profile are available, initialize data
      setEditData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        username: profile.username || '',
        bio: profile.bio || '',
        city: profile.city || '',
        website: profile.website || ''
      });
      loadUserData();
    } else if (!user) {
      // No user, keep loading
      setLoading(true);
    }
  }, [user, profile, fetchProfile]);

  // Separate effect to ensure profile is loaded after a delay if needed
  useEffect(() => {
    if (user && !profile && !loading) {
      const timer = setTimeout(() => {
        if (user && !profile) {
          setLoading(true);
          fetchProfile(user.id).then(() => {
            setLoading(false);
          });
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [user, profile, loading, fetchProfile]);

  const loadUserData = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      // Load user stats and posts in parallel
      const [stats, posts] = await Promise.all([
        usersService.getUserStats(user.id),
        postsService.getByUserId(user.id)
      ]);
      
      setUserStats(stats);
      setUserPosts(posts);
    } catch (error) {
      console.error('Error loading user data:', error);
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    if (!user?.id) return;
    
    setUpdating(true);
    setError('');
    
    try {
      await updateProfile(editData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !user?.id) return;

    // Validate file
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setError('Image size must be less than 5MB');
      return;
    }

    setUploadingAvatar(true);
    setError('');

    try {
      // For development, convert to base64 data URL
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const avatarUrl = e.target.result;
          await updateProfile({ avatar_url: avatarUrl });
        } catch (error) {
          console.error('Error updating avatar:', error);
          setError('Failed to update avatar');
        } finally {
          setUploadingAvatar(false);
        }
      };
      reader.onerror = () => {
        setError('Failed to read image file');
        setUploadingAvatar(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading avatar:', error);
      setError('Failed to upload avatar');
      setUploadingAvatar(false);
    }
  };

  const handleCoverUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !user?.id) return;

    // Validate file
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit for cover photos
      setError('Image size must be less than 10MB');
      return;
    }

    setUploadingCover(true);
    setError('');

    try {
      // For development, convert to base64 data URL
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const coverUrl = e.target.result;
          await updateProfile({ cover_url: coverUrl });
        } catch (error) {
          console.error('Error updating cover photo:', error);
          setError('Failed to update cover photo');
        } finally {
          setUploadingCover(false);
        }
      };
      reader.onerror = () => {
        setError('Failed to read image file');
        setUploadingCover(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading cover photo:', error);
      setError('Failed to upload cover photo');
      setUploadingCover(false);
    }
  };

  const pakistanCities = [
    'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 
    'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala', 'Hyderabad', 'Bahawalpur',
    'Sargodha', 'Sukkur', 'Larkana', 'Mardan', 'Mingora', 'Chiniot', 'Kamoke',
    'Gujrat', 'Kasur', 'Rahim Yar Khan', 'Sahiwal', 'Okara', 'Wah Cantonment'
  ];

  const tabs = [
    { id: 'posts', label: 'Posts', count: userStats.posts },
    { id: 'media', label: 'Media', count: 0 }, // TODO: Implement media count
    { id: 'likes', label: 'Likes', count: userStats.likes }
  ];

  // Handle loading and authentication states
  if (loading || !user) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-muted-foreground">Loading profile...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!profile) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                <Icon name="user" size={24} className="text-muted-foreground" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">Setting up your profile</h2>
                <p className="text-muted-foreground">Please wait while we load your profile data.</p>
                <Button 
                  variant="primary" 
                  className="mt-4"
                  onClick={() => {
                    if (user?.id) {
                      setLoading(true);
                      fetchProfile(user.id);
                    }
                  }}
                >
                  Retry Loading
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Error Display */}
        {error && (
          <div className="mb-4 bg-accent/10 border border-accent/20 text-accent px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Profile Header */}
        <Card className="mb-6 overflow-visible">
          <Card.Content className="p-0 relative">
            {/* Cover Photo */}
            <div className="h-48 relative overflow-hidden">
              {profile.cover_url ? (
                <img 
                  src={profile.cover_url} 
                  alt="Cover photo" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-primary/20 via-gold/10 to-primary/30">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20"></div>
                </div>
              )}
              
              {/* Edit Cover Button */}
              <label className="absolute top-4 right-4 px-3 py-1 bg-black/20 text-white rounded-md hover:bg-black/30 transition-colors cursor-pointer z-10">
                {uploadingCover ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white inline-block mr-2"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Icon name="image" size={16} className="mr-1" />
                    Edit Cover
                  </>
                )}
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleCoverUpload}
                  className="hidden"
                  disabled={uploadingCover}
                />
              </label>
            </div>

            {/* Profile Picture - Outside of cover photo container */}
            <div className="absolute -bottom-12 left-6 z-50">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-background bg-background shadow-xl">
                  <Avatar
                    src={profile.avatar_url}
                    alt={`${profile.first_name} ${profile.last_name}`}
                    className="w-full h-full"
                    fallback={profile.first_name?.charAt(0) || 'U'}
                  />
                </div>
                <label className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors cursor-pointer shadow-lg z-60">
                  {uploadingAvatar ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Icon name="image" size={16} />
                  )}
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleAvatarUpload}
                    className="hidden"
                    disabled={uploadingAvatar}
                  />
                </label>
              </div>
            </div>

            {/* Profile Info */}
            <div className="pt-16 pb-6 px-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          name="first_name"
                          value={editData.first_name}
                          onChange={handleInputChange}
                          placeholder="First name"
                          className="font-medium"
                        />
                        <Input
                          name="last_name"
                          value={editData.last_name}
                          onChange={handleInputChange}
                          placeholder="Last name"
                          className="font-medium"
                        />
                      </div>
                      <Input
                        name="username"
                        value={editData.username}
                        onChange={handleInputChange}
                        placeholder="Username"
                      />
                      <Textarea
                        name="bio"
                        value={editData.bio}
                        onChange={handleInputChange}
                        placeholder="Tell us about yourself"
                        rows={3}
                      />
                      <select
                        name="city"
                        value={editData.city}
                        onChange={handleInputChange}
                        className="flex h-10 w-full rounded-md border border-border bg-input px-3 py-2 text-sm"
                      >
                        <option value="">Select your city</option>
                        {pakistanCities.map((city) => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                      <Input
                        name="website"
                        value={editData.website}
                        onChange={handleInputChange}
                        placeholder="Website"
                      />
                    </div>
                  ) : (
                    <div>
                      <h1 className="text-2xl font-bold text-foreground">
                        {profile.first_name} {profile.last_name}
                      </h1>
                      <p className="text-muted-foreground">@{profile.username}</p>
                      {profile.bio && (
                        <p className="mt-3 text-foreground leading-relaxed">
                          {profile.bio}
                        </p>
                      )}
                      
                      {/* Profile Details */}
                      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        {profile.city && (
                          <div className="flex items-center space-x-1">
                            <Icon name="user" size={16} />
                            <span>{profile.city}</span>
                          </div>
                        )}
                        {profile.website && (
                          <div className="flex items-center space-x-1">
                            <Icon name="share" size={16} />
                            <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                              {profile.website}
                            </a>
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <Icon name="star" size={16} />
                          <span>Joined {new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 ml-4">
                  {isEditing ? (
                    <>
                      <Button 
                        variant="secondary" 
                        onClick={() => {
                          setIsEditing(false);
                          setError('');
                        }}
                        disabled={updating}
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleSave}
                        disabled={updating}
                      >
                        {updating ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Saving...
                          </>
                        ) : (
                          'Save Changes'
                        )}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="secondary" onClick={() => setIsEditing(true)}>
                        <Icon name="settings" size={16} className="mr-2" />
                        Edit Profile
                      </Button>
                      <Button variant="ghost">
                        <Icon name="share" size={16} />
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="flex space-x-6 pt-4 border-t border-border">
                <div className="text-center">
                  <div className="text-xl font-bold text-foreground">
                    {userStats.posts.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Posts
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-foreground">
                    {userStats.following.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Following
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-foreground">
                    {userStats.followers.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Followers
                  </div>
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Content Tabs */}
        <div className="border-b border-border mb-6">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`}
              >
                {tab.label}
                <span className="ml-1 text-xs text-muted-foreground">({tab.count})</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'posts' && (
            <>
              {userPosts.length > 0 ? (
                <PostFeed posts={userPosts} />
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                    <Icon name="plus" size={24} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No posts yet
                  </h3>
                  <p className="text-muted-foreground">
                    Share your thoughts with the community!
                  </p>
                </div>
              )}
            </>
          )}
          
          {activeTab === 'media' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <Icon name="image" size={24} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No media yet
              </h3>
              <p className="text-muted-foreground">
                Photos and videos you share will appear here
              </p>
            </div>
          )}
          
          {activeTab === 'likes' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <Icon name="heart" size={24} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No liked posts yet
              </h3>
              <p className="text-muted-foreground">
                Posts you like will appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}