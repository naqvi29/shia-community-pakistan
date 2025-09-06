import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

export const postsService = {
  async getAll(limit = 20, offset = 0) {
    try {
      // First, try the complex query with user relationships
      let { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          author:users (
            id,
            first_name,
            last_name,
            username,
            avatar_url,
            verified,
            city
          )
        `)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      // If complex query fails, try simple query
      if (error) {
        console.log('Complex query failed, trying simple query:', error.message);
        
        const { data: simplePosts, error: simpleError } = await supabase
          .from('posts')
          .select('*')
          .order('created_at', { ascending: false })
          .range(offset, offset + limit - 1);
          
        if (simpleError) {
          console.error('Simple query also failed:', simpleError);
          throw simpleError;
        }
        
        // Manually fetch user data for each post
        if (simplePosts && simplePosts.length > 0) {
          const postsWithAuthors = await Promise.all(
            simplePosts.map(async (post) => {
              const { data: author } = await supabase
                .from('users')
                .select('id, first_name, last_name, username, avatar_url, verified, city')
                .eq('id', post.author_id)
                .single();
              
              return {
                ...post,
                author: author || {
                  id: post.author_id,
                  first_name: 'Unknown',
                  last_name: 'User',
                  username: 'unknown',
                  avatar_url: null,
                  verified: false,
                  city: null
                }
              };
            })
          );
          
          console.log('Posts with authors loaded:', postsWithAuthors);
          return postsWithAuthors;
        }
        
        return [];
      }

      console.log('Posts loaded from database:', data);
      return data || [];
    } catch (error) {
      console.error('Error in getAll posts:', error);
      throw error;
    }
  },

  async getById(postId) {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        author:users!posts_author_id_fkey (
          id,
          first_name,
          last_name,
          username,
          avatar_url,
          verified,
          city
        ),
        likes_count:post_likes(count),
        comments_count:post_comments(count)
      `)
      .eq('id', postId)
      .single();

    if (error) throw error;
    return data;
  },

  async getByUserId(userId, limit = 20, offset = 0) {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        author:users!posts_author_id_fkey (
          id,
          first_name,
          last_name,
          username,
          avatar_url,
          verified,
          city
        ),
        likes_count:post_likes(count),
        comments_count:post_comments(count)
      `)
      .eq('author_id', userId)
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
        author:users!posts_author_id_fkey (
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

  async update(postId, updates) {
    const { data, error } = await supabase
      .from('posts')
      .update(updates)
      .eq('id', postId)
      .select(`
        *,
        author:users!posts_author_id_fkey (
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

  async delete(postId) {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId);

    if (error) throw error;
    return true;
  },

  async toggleLike(postId) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data: existingLike } = await supabase
      .from('post_likes')
      .select('*')
      .eq('post_id', postId)
      .eq('user_id', user.id)
      .single();

    if (existingLike) {
      const { error } = await supabase
        .from('post_likes')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', user.id);

      if (error) throw error;
      return { liked: false };
    } else {
      const { error } = await supabase
        .from('post_likes')
        .insert({ post_id: postId, user_id: user.id });

      if (error) throw error;
      return { liked: true };
    }
  },

  async toggleBookmark(postId) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data: existingBookmark } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('post_id', postId)
      .eq('user_id', user.id)
      .single();

    if (existingBookmark) {
      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', user.id);

      if (error) throw error;
      return { bookmarked: false };
    } else {
      const { error } = await supabase
        .from('bookmarks')
        .insert({ post_id: postId, user_id: user.id });

      if (error) throw error;
      return { bookmarked: true };
    }
  }
};