'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { seedDemoData, clearDemoPosts } from '@/lib/database/seedData';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();

  const handleSeedData = async () => {
    if (!user) {
      setError('Please log in first');
      return;
    }

    setLoading(true);
    setMessage('');
    setError('');

    try {
      await seedDemoData(user.id);
      setMessage('✅ Demo posts added successfully! Go to homepage to see them.');
    } catch (error) {
      console.error('Seeding error:', error);
      setError(`Failed to add demo posts: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleClearData = async () => {
    if (!user) {
      setError('Please log in first');
      return;
    }

    setLoading(true);
    setMessage('');
    setError('');

    try {
      await clearDemoPosts(user.id);
      setMessage('✅ Your posts cleared successfully!');
    } catch (error) {
      console.error('Clearing error:', error);
      setError(`Failed to clear posts: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Admin Panel
          </h1>
          <p className="text-muted-foreground">
            Manage demo data for your Shia Community Pakistan platform
          </p>
        </div>

        {message && (
          <div className="mb-4 bg-primary/10 border border-primary/20 text-primary px-4 py-3 rounded-lg">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 bg-accent/10 border border-accent/20 text-accent px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {/* Demo Data Card */}
          <Card>
            <Card.Header>
              <Card.Title>Demo Posts</Card.Title>
              <Card.Description>
                Add or remove demo posts to populate your platform
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-foreground mb-2">Demo Content Includes:</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Religious questions and discussions</li>
                    <li>• Community event announcements</li>
                    <li>• Islamic wisdom and hadith sharing</li>
                    <li>• Majlis and educational content</li>
                    <li>• Community service updates</li>
                    <li>• Shia-specific topics and conversations</li>
                  </ul>
                </div>

                <div className="flex space-x-3">
                  <Button 
                    onClick={handleSeedData}
                    disabled={loading || !user}
                    variant="primary"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Adding Posts...
                      </>
                    ) : (
                      'Add Demo Posts'
                    )}
                  </Button>

                  <Button 
                    onClick={handleClearData}
                    disabled={loading || !user}
                    variant="secondary"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                        Clearing...
                      </>
                    ) : (
                      'Clear My Posts'
                    )}
                  </Button>
                </div>
              </div>
            </Card.Content>
          </Card>

          {/* Instructions Card */}
          <Card>
            <Card.Header>
              <Card.Title>How to Use</Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div>
                  <strong className="text-foreground">1. Add Demo Posts:</strong> Click "Add Demo Posts" to populate your homepage with 8 diverse Shia community posts
                </div>
                <div>
                  <strong className="text-foreground">2. View Posts:</strong> Go to homepage to see the demo content
                </div>
                <div>
                  <strong className="text-foreground">3. Test Features:</strong> Try liking, bookmarking, and commenting on posts
                </div>
                <div>
                  <strong className="text-foreground">4. Clear Data:</strong> Use "Clear My Posts" to remove demo content when ready
                </div>
              </div>
            </Card.Content>
          </Card>

          {/* User Info Card */}
          <Card>
            <Card.Header>
              <Card.Title>Current User</Card.Title>
            </Card.Header>
            <Card.Content>
              {user ? (
                <div className="text-sm">
                  <div className="text-foreground">
                    <strong>User ID:</strong> {user.id}
                  </div>
                  <div className="text-muted-foreground">
                    Demo posts will be created with your user account
                  </div>
                </div>
              ) : (
                <div className="text-accent">
                  Please log in to add demo data
                </div>
              )}
            </Card.Content>
          </Card>
        </div>
      </div>
    </Layout>
  );
}