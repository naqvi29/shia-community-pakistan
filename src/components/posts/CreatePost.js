'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { postsService } from '@/lib/database';
import Button from '../ui/Button';
import Textarea from '../ui/Textarea';
import Avatar from '../ui/Avatar';
import Icon from '../ui/Icon';
import Card from '../ui/Card';

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const { user, profile } = useAuth();

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user || !content.trim()) return;
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const postData = {
        author_id: user.id,
        content: content.trim(),
        image_url: selectedImage // This will be base64 data URL if image is selected
      };
      
      const newPost = await postsService.create(postData);
      
      // Reset form
      setContent('');
      setSelectedImage(null);
      
      // Notify parent component that a new post was created
      if (onPostCreated) {
        onPostCreated(newPost);
      }
      
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Don't render if user is not authenticated
  if (!user) {
    return null;
  }

  return (
    <Card className="mb-6">
      <Card.Content className="pt-6">
        {error && (
          <div className="mb-4 bg-accent/10 border border-accent/20 text-accent px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}
        
        <div className="flex space-x-4">
          <Avatar
            src={profile?.avatar_url}
            alt={`${profile?.first_name} ${profile?.last_name}` || "Your profile"}
            size="medium"
            fallback={profile?.first_name?.charAt(0) || "U"}
          />
          
          <div className="flex-1">
            <form onSubmit={handleSubmit}>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's happening in the community?"
                className="resize-none border-none bg-transparent p-0 text-lg placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
                rows={3}
              />
              
              {/* Image Preview */}
              {selectedImage && (
                <div className="mt-4 relative">
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="max-h-64 w-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                  >
                    <Icon name="close" size={16} />
                  </button>
                </div>
              )}
              
              {/* Post Actions */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Image Upload */}
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                    <div className="flex items-center space-x-2 text-primary hover:text-primary-dark transition-colors">
                      <Icon name="image" size={20} />
                      <span className="text-sm font-medium">Photo</span>
                    </div>
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`text-sm ${
                    content.length > 280 ? 'text-accent' : 'text-muted-foreground'
                  }`}>
                    {content.length}/280
                  </span>
                  
                  <Button
                    type="submit"
                    disabled={!content.trim() || content.length > 280 || isSubmitting}
                    size="small"
                    className="px-6"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Posting...
                      </>
                    ) : (
                      'Post'
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default CreatePost;