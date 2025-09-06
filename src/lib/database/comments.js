import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

export const commentsService = {
  async getForPost(postId) {
    const { data, error } = await supabase
      .from('post_comments')
      .select(`
        *,
        user:users!post_comments_user_id_fkey (
          id,
          first_name,
          last_name,
          username,
          avatar_url
        ),
        replies:post_comments!post_comments_parent_id_fkey (
          *,
          user:users!post_comments_user_id_fkey (
            id,
            first_name,
            last_name,
            username,
            avatar_url
          )
        )
      `)
      .eq('post_id', postId)
      .is('parent_id', null)
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
        user:users!post_comments_user_id_fkey (
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
  },

  async update(commentId, updates) {
    const { data, error } = await supabase
      .from('post_comments')
      .update(updates)
      .eq('id', commentId)
      .select(`
        *,
        user:users!post_comments_user_id_fkey (
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
  },

  async delete(commentId) {
    const { error } = await supabase
      .from('post_comments')
      .delete()
      .eq('id', commentId);

    if (error) throw error;
    return true;
  }
};