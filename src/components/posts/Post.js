'use client';

import { useState } from 'react';
import Image from 'next/image';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import Card from '../ui/Card';

const Post = ({ 
  id,
  author,
  content,
  image,
  timestamp,
  likes = 0,
  comments = 0,
  isLiked = false,
  isBookmarked = false 
}) => {
  const [liked, setLiked] = useState(isLiked);
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now - time) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <Card hover className="mb-4">
      <Card.Content className="p-0">
        <div className="p-4">
          {/* Post Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <Avatar
                src={author.avatar}
                alt={author.name}
                size="medium"
                fallback={author.name.charAt(0)}
                online={author.online}
              />
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-foreground hover:text-primary cursor-pointer">
                    {author.name}
                  </h3>
                  {author.verified && (
                    <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="star" size={12} className="text-white" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  @{author.username} · {formatTimeAgo(timestamp)}
                </p>
              </div>
            </div>
            
            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
              <Icon name="menu" size={16} />
            </Button>
          </div>

          {/* Post Content */}
          <div className="mb-3">
            <p className="text-foreground leading-relaxed whitespace-pre-line">
              {content}
            </p>
          </div>

          {/* Post Image */}
          {image && (
            <div className="mb-3 rounded-lg overflow-hidden border border-border">
              <Image
                src={image}
                alt="Post image"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}

          {/* Post Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center space-x-6">
              {/* Like Button */}
              <button
                onClick={handleLike}
                className="flex items-center space-x-2 text-muted-foreground hover:text-accent transition-colors group"
              >
                <div className="p-2 rounded-full group-hover:bg-accent/10 transition-colors">
                  <Icon 
                    name={liked ? "heart-filled" : "heart"} 
                    size={18} 
                    className={liked ? "text-accent" : ""}
                  />
                </div>
                <span className="text-sm font-medium">
                  {liked ? likes + 1 : likes}
                </span>
              </button>

              {/* Comment Button */}
              <button
                onClick={() => setShowComments(!showComments)}
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors group"
              >
                <div className="p-2 rounded-full group-hover:bg-primary/10 transition-colors">
                  <Icon name="comment" size={18} />
                </div>
                <span className="text-sm font-medium">{comments}</span>
              </button>

              {/* Share Button */}
              <button className="flex items-center space-x-2 text-muted-foreground hover:text-green-500 transition-colors group">
                <div className="p-2 rounded-full group-hover:bg-green-500/10 transition-colors">
                  <Icon name="share" size={18} />
                </div>
              </button>
            </div>

            {/* Bookmark Button */}
            <button
              onClick={handleBookmark}
              className="text-muted-foreground hover:text-gold transition-colors p-2 rounded-full hover:bg-gold/10"
            >
              <Icon 
                name={bookmarked ? "bookmark-filled" : "bookmark"} 
                size={18} 
                className={bookmarked ? "text-gold" : ""}
              />
            </button>
          </div>

          {/* Comments Section */}
          {showComments && (
            <div className="mt-4 pt-4 border-t border-border">
              <div className="space-y-3">
                <div className="flex space-x-3">
                  <Avatar
                    src="/api/placeholder/32/32"
                    alt="Commenter"
                    size="small"
                    fallback="C"
                  />
                  <div className="flex-1">
                    <div className="bg-muted rounded-lg p-3">
                      <p className="font-semibold text-sm">Fatima Ali</p>
                      <p className="text-sm text-foreground">
                        SubhanAllah! This is very inspiring. JazakAllahu Khair for sharing.
                      </p>
                    </div>
                    <div className="flex items-center space-x-4 mt-1 ml-3">
                      <button className="text-xs text-muted-foreground hover:text-primary">
                        2h ago
                      </button>
                      <button className="text-xs text-muted-foreground hover:text-primary">
                        Like
                      </button>
                      <button className="text-xs text-muted-foreground hover:text-primary">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add Comment */}
              <div className="mt-4 flex space-x-3">
                <Avatar
                  src="/api/placeholder/32/32"
                  alt="You"
                  size="small"
                  fallback="U"
                />
                <div className="flex-1">
                  <textarea
                    placeholder="Add a comment..."
                    className="w-full p-2 text-sm bg-input border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={2}
                  />
                  <div className="flex justify-end mt-2">
                    <Button size="small" variant="primary">
                      Comment
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card.Content>
    </Card>
  );
};

export default Post;