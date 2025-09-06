'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import CreatePost from '@/components/posts/CreatePost';
import PostFeed from '@/components/posts/PostFeed';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { user, loading } = useAuth();

  const handlePostCreated = (newPost) => {
    // Trigger a refresh of the post feed
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Home
          </h1>
          <p className="text-muted-foreground">
            Stay connected with the Shia community across Pakistan
          </p>
        </div>

        {/* Authentication Check */}
        {!loading && !user ? (
          <div className="text-center py-8 mb-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Welcome to Shia Community Pakistan
              </h3>
              <p className="text-muted-foreground mb-4">
                Join our community to share your thoughts and connect with others
              </p>
              <div className="flex justify-center space-x-4">
                <Link href="/login">
                  <Button variant="primary">Sign In</Button>
                </Link>
                <Link href="/register">
                  <Button variant="secondary">Sign Up</Button>
                </Link>
              </div>
            </div>
          </div>
        ) : user ? (
          /* Create Post - Only show if user is authenticated */
          <CreatePost onPostCreated={handlePostCreated} />
        ) : null}

        {/* Post Feed */}
        <PostFeed refreshTrigger={refreshTrigger} />
      </div>

      {/* Right Sidebar - Trending/Suggestions */}
      <aside className="hidden xl:block xl:w-80 xl:ml-8">
        <div className="sticky top-20 space-y-4">
          {/* Community Stats */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-3">Community Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Members</span>
                <span className="font-medium">12,453</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Active Today</span>
                <span className="font-medium">1,234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Posts This Week</span>
                <span className="font-medium">567</span>
              </div>
            </div>
          </div>

          {/* Suggested Users */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-3">Suggested for you</h3>
            <div className="space-y-3">
              {[
                { name: 'Imam Hussain Center', username: 'ihc_pak', verified: true },
                { name: 'Majlis-e-Ulama', username: 'majlis_ulama', verified: true },
                { name: 'Community Events', username: 'events_scp', verified: false }
              ].map((user) => (
                <div key={user.username} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">@{user.username}</p>
                    </div>
                  </div>
                  <button className="text-xs text-primary hover:text-primary-dark font-medium">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </Layout>
  );
}
