import { useState, useEffect } from 'react';
import { postsService } from '@/lib/database';
import Post from './Post';

const PostFeed = ({ posts = [], refreshTrigger = 0 }) => {
  const [feedPosts, setFeedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load posts from database
  useEffect(() => {
    loadPosts();
  }, [refreshTrigger]);

  const loadPosts = async () => {
    setLoading(true);
    setError('');
    
    try {
      const dbPosts = await postsService.getAll(20, 0);
      setFeedPosts(dbPosts || []);
    } catch (error) {
      console.error('Error loading posts:', error);
      setError('Failed to load posts');
      // Fallback to sample data if database fails
      setFeedPosts(samplePosts);
    } finally {
      setLoading(false);
    }
  };

  // Sample data for fallback/development
  const samplePosts = [
    {
      id: 1,
      author: {
        name: 'Ali Hassan',
        username: 'alihassan',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        verified: true,
        online: true
      },
      content: 'Alhamdulillahi Rabbil Alameen! May Allah bless our community with unity and peace. Today marks another blessed day in our journey of faith. 🤲',
      image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&h=400&fit=crop',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      likes: 24,
      comments: 8,
      isLiked: false,
      isBookmarked: false
    },
    {
      id: 2,
      author: {
        name: 'Fatima Zahra',
        username: 'fatimazahra',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616c0763d4e?w=40&h=40&fit=crop&crop=face',
        verified: false,
        online: true
      },
      content: 'Attending the Majlis tonight at Imam Bargah. The topic is "The Path of Righteousness in Modern Times". All brothers and sisters are welcome to join us. InshAllah it will be very beneficial for our spiritual growth.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      likes: 15,
      comments: 5,
      isLiked: true,
      isBookmarked: true
    },
    {
      id: 3,
      author: {
        name: 'Muhammad Raza',
        username: 'mraza',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
        verified: false,
        online: false
      },
      content: 'SubhanAllah! Just finished reading Dua Kumayl. The depth and beauty of Imam Ali\'s (AS) words never cease to amaze me. May Allah grant us the wisdom to understand and implement these teachings in our daily lives.',
      image: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=600&h=300&fit=crop',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      likes: 42,
      comments: 12,
      isLiked: false,
      isBookmarked: false
    },
    {
      id: 4,
      author: {
        name: 'Zainab Hussain',
        username: 'zainabhussain',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
        verified: true,
        online: true
      },
      content: 'Organizing a community iftar this Friday at the local mosque. We need volunteers to help with food preparation and serving. This is a great opportunity to earn sawab and bring our community together. Please DM me if you can help.',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      likes: 31,
      comments: 18,
      isLiked: true,
      isBookmarked: false
    },
    {
      id: 5,
      author: {
        name: 'Ahmed Kazmi',
        username: 'ahmedkazmi',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        verified: false,
        online: false
      },
      content: 'Reflection of the day: "The best form of worship is to help those in need." - Imam Ali (AS)\n\nLet us remember to always extend our hand to help our brothers and sisters, regardless of their background. This is the true essence of our faith.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      likes: 67,
      comments: 23,
      isLiked: false,
      isBookmarked: true
    }
  ];

  // Use passed posts if available, otherwise use loaded posts
  const postsToDisplay = posts.length > 0 ? posts : feedPosts;

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-card border border-border rounded-lg p-6 animate-pulse">
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-muted rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-1/4"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
          <span className="text-accent text-2xl">⚠️</span>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Failed to load posts
        </h3>
        <p className="text-muted-foreground mb-4">
          {error}
        </p>
        <button 
          onClick={loadPosts}
          className="text-primary hover:text-primary-dark font-medium"
        >
          Try again
        </button>
      </div>
    );
  }

  if (postsToDisplay.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
          <span className="text-2xl">📝</span>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No posts yet
        </h3>
        <p className="text-muted-foreground">
          Be the first to share something with the community!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {postsToDisplay.map((post) => (
        <Post 
          key={post.id} 
          {...post}
          author={{
            name: `${post.author?.first_name || ''} ${post.author?.last_name || ''}`.trim(),
            username: post.author?.username || 'unknown',
            avatar: post.author?.avatar_url || '',
            verified: post.author?.verified || false,
            online: true // TODO: Implement online status
          }}
          image={post.image_url}
          timestamp={post.created_at}
        />
      ))}
    </div>
  );
};

export default PostFeed;