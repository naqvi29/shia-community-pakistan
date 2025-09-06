import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

export const storageService = {
  async uploadAvatar(file, userId) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(filePath, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    return publicUrl;
  },

  async uploadCoverPhoto(file, userId) {
    const fileExt = file.name.split('.').pop();
    const fileName = `cover-${userId}-${Date.now()}.${fileExt}`;
    const filePath = `covers/${fileName}`;

    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(filePath, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    return publicUrl;
  },

  async deleteFile(filePath) {
    const { error } = await supabase.storage
      .from('avatars')
      .remove([filePath]);

    if (error) throw error;
    return true;
  }
};