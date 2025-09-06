-- Easy Demo Data Setup for Shia Community Pakistan
-- This script creates demo data that works with your actual user account

-- Step 1: Find your actual user ID
-- Replace 'your_actual_user_id_here' with your real user ID from auth.users table
-- You can find this in Supabase Dashboard > Authentication > Users

-- Quick way to find your user ID:
-- SELECT id, email FROM auth.users WHERE email = 'your_email@example.com';

-- Step 2: Insert demo posts using your actual user ID
-- Replace 'YOUR_USER_ID' with your actual UUID from the query above

INSERT INTO public.posts (author_id, content, image_url, created_at) VALUES 
-- Religious Question Post
(
  'YOUR_USER_ID', -- Replace this with your actual user ID
  'Assalamu Alaikum brothers and sisters! I have a question about the significance of Ghadeer-e-Khumm. Can someone explain why this event is so important in Shia belief? 

#GhadeerEKhumm #ShiaBeliefs #IslamicHistory',
  'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&h=400&fit=crop',
  NOW() - INTERVAL '2 hours'
),
-- Community Event Post
(
  'YOUR_USER_ID', -- Replace this with your actual user ID
  'Organizing a community iftar this Friday at our local Imam Bargah! 

🕕 Time: 6:30 PM
📍 Location: Main Hall  
🍽️ Free dinner for all
👥 Special program for children

Need volunteers for preparation. Please comment if you can help!

#CommunityIftar #Volunteers #Unity',
  'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=600&h=400&fit=crop',
  NOW() - INTERVAL '4 hours'
),
-- Religious Reflection
(
  'YOUR_USER_ID', -- Replace this with your actual user ID
  'SubhanAllah! Just finished reciting Dua Kumayl. The depth of Imam Ali''s (AS) words never ceases to amaze me. 

"My God, You are the shelter of the shelterless and the helper of the helpless."

These words bring so much comfort during difficult times. 🤲

#DuaKumayl #ImamAli #Spirituality #Peace',
  null,
  NOW() - INTERVAL '6 hours'
),
-- Educational Content
(
  'YOUR_USER_ID', -- Replace this with your actual user ID
  'Today I want to share wisdom from Imam Jafar Sadiq (AS):

"Knowledge is not what is memorized, but what benefits."

This reminds us that true Islamic education isn''t just about memorizing texts, but applying teachings in our daily lives to become better Muslims and human beings.

#ImamJafarSadiq #Knowledge #Education #IslamicWisdom #Practice',
  'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop',
  NOW() - INTERVAL '8 hours'
),
-- Majlis Announcement
(
  'YOUR_USER_ID', -- Replace this with your actual user ID
  'Majlis announcement for this weekend! 

🕌 Topic: "The Patience of Lady Zahra (AS)"
🗓️ Date: Saturday, 7:00 PM
🎤 Speaker: Local Alim

All families welcome! Light refreshments after majlis.

#Majlis #LadyFatima #Community #Patience #Weekend',
  'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&h=400&fit=crop',
  NOW() - INTERVAL '12 hours'
),
-- Discussion Question
(
  'YOUR_USER_ID', -- Replace this with your actual user ID
  'Question for our community: How do you explain the concept of Wilayat to someone new to Shia Islam? 

Looking for simple, clear explanations that can help in dawah work. Please share your approaches and experiences.

#Wilayat #Dawah #Explanation #Community #Discussion #Learning',
  null,
  NOW() - INTERVAL '1 day'
),
-- Community Service
(
  'YOUR_USER_ID', -- Replace this with your actual user ID
  'Alhamdulillah! Our monthly charity drive was successful! 

Distributed:
✅ 100 food packages
✅ Clothes for children  
✅ Books for students
✅ Medicine for elderly

Thanks to all donors and volunteers! Next drive: First Saturday of next month.

#Charity #CommunityService #Alhamdulillah #Volunteers #SocialWork #Help',
  'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&h=400&fit=crop',
  NOW() - INTERVAL '2 days'
),
-- Weekly Hadith
(
  'YOUR_USER_ID', -- Replace this with your actual user ID
  'Weekly Hadith from Prophet Muhammad (PBUH): 

"The believers are like one body; when one part is in pain, the rest of the body feels it."

This teaches us about community support and brotherhood. How can we better support each other?

#Hadith #Community #Brotherhood #ProphetMuhammad #Unity #Support',
  'https://images.unsplash.com/photo-1589998059171-988d887df646?w=600&h=400&fit=crop',
  NOW() - INTERVAL '3 days'
);

-- Instructions:
-- 1. Go to Supabase Dashboard > Authentication > Users
-- 2. Find your user ID (the UUID)
-- 3. Replace all 'YOUR_USER_ID' in this script with your actual UUID
-- 4. Run this script in Supabase SQL Editor
-- 5. Refresh your homepage to see the demo posts!