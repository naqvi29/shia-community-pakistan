import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

export const usersService = {
  async getProfile(userId) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  async getProfileByUsername(username) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  async updateProfile(userId, updates) {
    const { data, error } = await supabase
      .from('users')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
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
  },

  async searchUsers(query, limit = 10) {
    const { data, error } = await supabase
      .from('users')
      .select('id, first_name, last_name, username, avatar_url, verified, city')
      .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,username.ilike.%${query}%`)
      .limit(limit);

    if (error) throw error;
    return data;
  },

  async getUserStats(userId) {
    const [postsResult, followersResult, followingResult] = await Promise.all([
      supabase.from('posts').select('id', { count: 'exact' }).eq('author_id', userId),
      supabase.from('follows').select('id', { count: 'exact' }).eq('following_id', userId),
      supabase.from('follows').select('id', { count: 'exact' }).eq('follower_id', userId)
    ]);

    if (postsResult.error || followersResult.error || followingResult.error) {
      throw postsResult.error || followersResult.error || followingResult.error;
    }

    return {
      posts: postsResult.count || 0,
      followers: followersResult.count || 0,
      following: followingResult.count || 0
    };
  },

  async followUser(targetUserId) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('follows')
      .insert({
        follower_id: user.id,
        following_id: targetUserId
      });

    if (error) throw error;
    return data;
  },

  async unfollowUser(targetUserId) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('follows')
      .delete()
      .eq('follower_id', user.id)
      .eq('following_id', targetUserId);

    if (error) throw error;
    return true;
  },

  async isFollowing(targetUserId) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data, error } = await supabase
      .from('follows')
      .select('id')
      .eq('follower_id', user.id)
      .eq('following_id', targetUserId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return !!data;
  },

  async getFollowers(userId, limit = 20, offset = 0) {
    const { data, error } = await supabase
      .from('follows')
      .select(`
        created_at,
        follower:users!follows_follower_id_fkey (
          id,
          first_name,
          last_name,
          username,
          avatar_url,
          verified,
          city
        )
      `)
      .eq('following_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data.map(item => ({ ...item.follower, followed_at: item.created_at }));
  },

  async getFollowing(userId, limit = 20, offset = 0) {
    const { data, error } = await supabase
      .from('follows')
      .select(`
        created_at,
        following:users!follows_following_id_fkey (
          id,
          first_name,
          last_name,
          username,
          avatar_url,
          verified,
          city
        )
      `)
      .eq('follower_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data.map(item => ({ ...item.following, followed_at: item.created_at }));
  }
};