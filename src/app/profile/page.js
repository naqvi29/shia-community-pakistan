'use client';

import { useState } from 'react';
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
  const [profileData, setProfileData] = useState({
    name: 'Ali Hassan',
    username: 'alihassan',
    email: 'ali.hassan@example.com',
    bio: 'Passionate about Islamic studies and community building. May Allah guide us all on the right path. 🤲',
    location: 'Karachi, Pakistan',
    website: 'https://alihassan.dev',
    joinDate: 'March 2023'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving profile:', profileData);
    setIsEditing(false);
  };

  const userStats = {
    posts: 147,
    following: 342,
    followers: 1205,
    likes: 2847
  };

  const userPosts = [
    {
      id: 1,
      author: {
        name: profileData.name,
        username: profileData.username,
        avatar: '/api/placeholder/40/40',
        verified: true,
        online: true
      },
      content: 'Alhamdulillahi Rabbil Alameen! Just finished reading Sahifa Sajjadiya. The depth of Imam Zain-ul-Abideen\'s (AS) prayers is truly remarkable.',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      likes: 34,
      comments: 8,
      isLiked: true,
      isBookmarked: false
    },
    {
      id: 2,
      author: {
        name: profileData.name,
        username: profileData.username,
        avatar: '/api/placeholder/40/40',
        verified: true,
        online: true
      },
      content: 'Organizing a community book reading session this weekend. We\'ll be discussing "Peak of Eloquence" (Nahjul Balagha). All are welcome!',
      image: '/api/placeholder/600/300',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      likes: 56,
      comments: 15,
      isLiked: false,
      isBookmarked: true
    }
  ];

  const tabs = [
    { id: 'posts', label: 'Posts', count: userStats.posts },
    { id: 'media', label: 'Media', count: 23 },
    { id: 'likes', label: 'Likes', count: userStats.likes }
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <Card className="mb-6">
          <Card.Content className="p-0">
            {/* Cover Photo */}
            <div className="h-48 bg-gradient-to-r from-primary/20 via-gold/10 to-primary/30 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20"></div>
              {/* Profile Picture */}
              <div className="absolute -bottom-12 left-6">
                <div className="relative">
                  <Avatar
                    src="/api/placeholder/120/120"
                    alt={profileData.name}
                    size="xl"
                    className="w-24 h-24 border-4 border-background"
                    fallback={profileData.name.charAt(0)}
                  />
                  <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors">
                    <Icon name="image" size={16} />
                  </button>
                </div>
              </div>
              {/* Edit Cover Button */}
              <button className="absolute top-4 right-4 px-3 py-1 bg-black/20 text-white rounded-md hover:bg-black/30 transition-colors">
                <Icon name="image" size={16} className="mr-1" />
                Edit Cover
              </button>
            </div>

            {/* Profile Info */}
            <div className="pt-16 pb-6 px-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-3">
                      <Input
                        name="name"
                        value={profileData.name}
                        onChange={handleInputChange}
                        className="text-xl font-bold"
                        placeholder="Your name"
                      />
                      <Input
                        name="username"
                        value={profileData.username}
                        onChange={handleInputChange}
                        placeholder="Username"
                      />
                      <Textarea
                        name="bio"
                        value={profileData.bio}
                        onChange={handleInputChange}
                        placeholder="Tell us about yourself"
                        rows={3}
                      />
                      <Input
                        name="location"
                        value={profileData.location}
                        onChange={handleInputChange}
                        placeholder="Location"
                      />
                      <Input
                        name="website"
                        value={profileData.website}
                        onChange={handleInputChange}
                        placeholder="Website"
                      />
                    </div>
                  ) : (
                    <div>
                      <h1 className="text-2xl font-bold text-foreground">
                        {profileData.name}
                      </h1>
                      <p className="text-muted-foreground">@{profileData.username}</p>
                      <p className="mt-3 text-foreground leading-relaxed">
                        {profileData.bio}
                      </p>
                      
                      {/* Profile Details */}
                      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Icon name="user" size={16} />
                          <span>{profileData.location}</span>
                        </div>
                        {profileData.website && (
                          <div className="flex items-center space-x-1">
                            <Icon name="share" size={16} />
                            <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                              {profileData.website}
                            </a>
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <Icon name="star" size={16} />
                          <span>Joined {profileData.joinDate}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 ml-4">
                  {isEditing ? (
                    <>
                      <Button variant="secondary" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSave}>
                        Save Changes
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
                {Object.entries(userStats).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="text-xl font-bold text-foreground">
                      {value.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground capitalize">
                      {key}
                    </div>
                  </div>
                ))}
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
            <PostFeed posts={userPosts} />
          )}
          
          {activeTab === 'media' && (
            <div className="grid grid-cols-3 gap-1">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <Icon name="image" size={24} className="text-muted-foreground" />
                </div>
              ))}
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