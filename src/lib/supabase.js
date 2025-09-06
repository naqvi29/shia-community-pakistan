import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  console.log('Please check your .env.local file and ensure the following variables are set:');
  console.log('- NEXT_PUBLIC_SUPABASE_URL');
  console.log('- NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// Database helper functions
export const db = {
  // Users
  users: {
    async getProfile(userId) {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      return data;
    },
    
    async updateProfile(userId, updates) {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    
    async createProfile(userData) {
      const { data, error } = await supabase
        .from('users')
        .insert(userData)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    }
  },

  // Posts
  posts: {
    async getAll(limit = 20, offset = 0) {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          users!posts_author_id_fkey (
            id,
            first_name,
            last_name,
            username,
            avatar_url,
            verified,
            city
          ),
          likes:post_likes(count),
          comments:post_comments(count)
        `)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);
      
      if (error) throw error;
      return data;
    },
    
    async create(postData) {
      const { data, error } = await supabase
        .from('posts')
        .insert(postData)
        .select(`
          *,
          users!posts_author_id_fkey (
            id,
            first_name,
            last_name,
            username,
            avatar_url,
            verified,
            city
          )
        `)
        .single();
      
      if (error) throw error;
      return data;
    },
    
    async delete(postId, userId) {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId)
        .eq('author_id', userId);
      
      if (error) throw error;
      return true;
    }
  },

  // Interactions
  interactions: {
    async toggleLike(postId, userId) {
      const { data: existingLike } = await supabase
        .from('post_likes')
        .select('*')
        .eq('post_id', postId)
        .eq('user_id', userId)
        .single();
      
      if (existingLike) {
        const { error } = await supabase
          .from('post_likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', userId);
        
        if (error) throw error;
        return { liked: false };
      } else {
        const { error } = await supabase
          .from('post_likes')
          .insert({ post_id: postId, user_id: userId });
        
        if (error) throw error;
        return { liked: true };
      }
    },
    
    async toggleBookmark(postId, userId) {
      const { data: existingBookmark } = await supabase
        .from('bookmarks')
        .select('*')
        .eq('post_id', postId)
        .eq('user_id', userId)
        .single();
      
      if (existingBookmark) {
        const { error } = await supabase
          .from('bookmarks')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', userId);
        
        if (error) throw error;
        return { bookmarked: false };
      } else {
        const { error } = await supabase
          .from('bookmarks')
          .insert({ post_id: postId, user_id: userId });
        
        if (error) throw error;
        return { bookmarked: true };
      }
    }
  },

  // Comments
  comments: {
    async getForPost(postId) {
      const { data, error } = await supabase
        .from('post_comments')
        .select(`
          *,
          users!post_comments_user_id_fkey (
            id,
            first_name,
            last_name,
            username,
            avatar_url
          )
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data;
    },
    
    async create(commentData) {
      const { data, error } = await supabase
        .from('post_comments')
        .insert(commentData)
        .select(`
          *,
          users!post_comments_user_id_fkey (
            id,
            first_name,
            last_name,
            username,
            avatar_url
          )
        `)
        .single();
      
      if (error) throw error;
      return data;
    }
  }
};