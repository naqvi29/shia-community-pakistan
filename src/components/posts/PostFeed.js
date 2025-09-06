import Post from './Post';

const PostFeed = ({ posts = [] }) => {
  // Sample data for demonstration
  const samplePosts = [
    {
      id: 1,
      author: {
        name: 'Ali Hassan',
        username: 'alihassan',
        avatar: '/api/placeholder/40/40',
        verified: true,
        online: true
      },
      content: 'Alhamdulillahi Rabbil Alameen! May Allah bless our community with unity and peace. Today marks another blessed day in our journey of faith. 🤲',
      image: '/api/placeholder/600/400',
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
        avatar: '/api/placeholder/40/40',
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
        avatar: '/api/placeholder/40/40',
        verified: false,
        online: false
      },
      content: 'SubhanAllah! Just finished reading Dua Kumayl. The depth and beauty of Imam Ali\'s (AS) words never cease to amaze me. May Allah grant us the wisdom to understand and implement these teachings in our daily lives.',
      image: '/api/placeholder/600/300',
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
        avatar: '/api/placeholder/40/40',
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
        avatar: '/api/placeholder/40/40',
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

  const postsToDisplay = posts.length > 0 ? posts : samplePosts;

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
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
};

export default PostFeed;