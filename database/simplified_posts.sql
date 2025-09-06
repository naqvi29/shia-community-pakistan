-- Simplified posts query for troubleshooting
-- Run this in Supabase SQL Editor to test posts table

-- Check if posts exist
SELECT COUNT(*) as post_count FROM posts;

-- View all posts with basic info
SELECT 
  id,
  content,
  image_url,
  created_at,
  author_id
FROM posts 
ORDER BY created_at DESC 
LIMIT 5;

-- Check if users table exists and has data
SELECT COUNT(*) as user_count FROM users;

-- Simple posts with user names (if relationship works)
SELECT 
  p.id,
  p.content,
  p.image_url,
  p.created_at,
  u.first_name,
  u.last_name,
  u.username,
  u.avatar_url
FROM posts p
LEFT JOIN users u ON p.author_id = u.id
ORDER BY p.created_at DESC
LIMIT 10;