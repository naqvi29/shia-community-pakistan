-- Add cover photo support to users table
-- Run this SQL in your Supabase SQL Editor if you haven't already

ALTER TABLE public.users ADD COLUMN IF NOT EXISTS cover_url TEXT;