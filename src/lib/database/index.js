// Export all database services
export { postsService } from './posts';
export { commentsService } from './comments';
export { usersService } from './users';
export { storageService } from './storage';

// Re-export Supabase client for direct access when needed
export { createClient } from '@/lib/supabase/client';