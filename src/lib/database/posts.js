import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

export const postsService = {
  async getAll(limit = 20, offset = 0) {
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
        comments_count:post_comments(count),
        user_liked:post_likes!inner(user_id),
        user_bookmarked:bookmarks!inner(user_id)
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data;
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