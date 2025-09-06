import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

export const storageService = {
  async uploadAvatar(file, userId) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // First, try to upload the file
      const { data, error } = await supabase.storage
        .from('user-uploads')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Upload error:', error);
        throw new Error(`Failed to upload avatar: ${error.message}`);
      }

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('user-uploads')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Avatar upload error:', error);
      throw error;
    }
  },

  async uploadCoverPhoto(file, userId) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `cover-${userId}-${Date.now()}.${fileExt}`;
      const filePath = `covers/${fileName}`;

      // Upload the file
      const { data, error } = await supabase.storage
        .from('user-uploads')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Cover upload error:', error);
        throw new Error(`Failed to upload cover photo: ${error.message}`);
      }

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('user-uploads')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Cover photo upload error:', error);
      throw error;
    }
  },

  async deleteFile(filePath) {
    try {
      const { error } = await supabase.storage
        .from('user-uploads')
        .remove([filePath]);

      if (error) {
        console.error('Delete error:', error);
        throw new Error(`Failed to delete file: ${error.message}`);
      }
      
      return true;
    } catch (error) {
      console.error('File deletion error:', error);
      throw error;
    }
  }
};