-- Demo Data for Shia Community Pakistan Platform
-- Run this SQL in your Supabase SQL Editor to populate the database with demo content

-- First, create some demo users (these will be created manually in your app or via this script)
-- Note: You'll need to adjust the UUIDs to match actual auth.users entries

-- Insert demo users (replace UUIDs with actual user IDs from auth.users)
INSERT INTO public.users (
  id,
  first_name,
  last_name,
  username,
  email,
  avatar_url,
  bio,
  city,
  verified,
  created_at
) VALUES 
-- User 1: Ali Hassan (Community Leader)
(
  '11111111-1111-1111-1111-111111111111',
  'Ali',
  'Hassan',
  'alihassan',
  'ali.hassan@example.com',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  'Islamic scholar and community organizer. Passionate about spreading the teachings of Ahlul Bayt (AS). 🕌',
  'Karachi',
  true,
  NOW() - INTERVAL '6 months'
),
-- User 2: Fatima Zahra (Active Community Member)
(
  '22222222-2222-2222-2222-222222222222',
  'Fatima',
  'Zahra',
  'fatimazehra',
  'fatima.zahra@example.com',
  'https://images.unsplash.com/photo-1494790108755-2616c0763d4e?w=100&h=100&fit=crop&crop=face',
  'Mother, educator, and advocate for women''s rights in Islam. Love organizing community events. 📚',
  'Lahore',
  false,
  NOW() - INTERVAL '4 months'
),
-- User 3: Muhammad Hussain (Youth Leader)
(
  '33333333-3333-3333-3333-333333333333',
  'Muhammad',
  'Hussain',
  'mhussain',
  'muhammad.hussain@example.com',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
  'Youth coordinator and tech enthusiast. Bridging tradition with modern technology. 💻',
  'Islamabad',
  false,
  NOW() - INTERVAL '3 months'
),
-- User 4: Zainab Ali (Religious Studies Scholar)
(
  '44444444-4444-4444-4444-444444444444',
  'Zainab',
  'Ali',
  'zainabali',
  'zainab.ali@example.com',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
  'PhD in Islamic Studies. Researching the role of women in early Islamic history. 🎓',
  'Multan',
  true,
  NOW() - INTERVAL '8 months'
),
-- User 5: Ahmed Raza (Community Elder)
(
  '55555555-5555-5555-5555-555555555555',
  'Ahmed',
  'Raza',
  'ahmedraza',
  'ahmed.raza@example.com',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  'Imam at local mosque. 30+ years of community service. Always available for spiritual guidance. 🤲',
  'Faisalabad',
  true,
  NOW() - INTERVAL '10 months'
);

-- Insert demo posts with Shia-specific content
INSERT INTO public.posts (
  id,
  author_id,
  content,
  image_url,
  created_at
) VALUES 
-- Post 1: Religious Question
(
  uuid_generate_v4(),
  '11111111-1111-1111-1111-111111111111',
  'Assalamu Alaikum brothers and sisters! I have a question about the significance of Ghadeer-e-Khumm. Can someone explain why this event is so important in Shia belief? I''ve been reading about it and would love to hear different perspectives from our community. 

#GhadeerEKhumm #ShiaBeliefs #IslamicHistory',
  'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&h=400&fit=crop',
  NOW() - INTERVAL '2 hours'
),
-- Post 2: Community Event
(
  uuid_generate_v4(),
  '22222222-2222-2222-2222-222222222222',
  'Exciting news! We''re organizing a community iftar this Friday at Imam Bargah-e-Hussainia, Lahore. 

🕕 Time: 6:30 PM
📍 Location: Main Hall
🍽️ Free dinner for all attendees
👥 Special program for children

We need volunteers for food preparation and arrangement. Please comment below if you can help. This is a beautiful opportunity to strengthen our community bonds and earn sawab together. JazakAllahu Khair! 

#CommunityIftar #Lahore #Volunteers #Unity',
  'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=600&h=400&fit=crop',
  NOW() - INTERVAL '4 hours'
),
-- Post 3: Religious Reflection
(
  uuid_generate_v4(),
  '33333333-3333-3333-3333-333333333333',
  'SubhanAllah! Just finished reciting Ziyarat-e-Ashura and I''m deeply moved by the sacrifice of Imam Hussain (AS) and his companions. 

Their unwavering commitment to truth and justice in the face of tyranny is a lesson for all of us. In today''s world, how can we apply the principles of Karbala in our daily lives?

May Allah grant us the courage to stand for what is right, just as they did. 🤲

#Karbala #ImamHussain #Sacrifice #Justice #Inspiration',
  null,
  NOW() - INTERVAL '6 hours'
),
-- Post 4: Educational Post
(
  uuid_generate_v4(),
  '44444444-4444-4444-4444-444444444444',
  'Today I want to share some beautiful wisdom from Imam Ali (AS):

"Knowledge is the treasure that never decreases when shared, but increases."

This reminds us that Islamic knowledge grows when we share it with others. Whether it''s teaching Quran to children, explaining Islamic history, or helping someone understand their faith better - every act of sharing knowledge is a form of worship.

What Islamic knowledge have you shared recently? Let''s encourage each other to be teachers and students simultaneously.

#ImamAli #Knowledge #Education #IslamicWisdom #Teaching',
  'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop',
  NOW() - INTERVAL '8 hours'
),
-- Post 5: Majlis Announcement
(
  uuid_generate_v4(),
  '55555555-5555-5555-5555-555555555555',
  'Majlis announcement for this weekend! 

🕌 Topic: "The Patience of Lady Fatima (AS) - Lessons for Modern Times"
🗓️ Date: Saturday, 7:00 PM
📍 Venue: Jamia Masjid Al-Sadiq, Faisalabad
🎤 Speaker: Allama Muhammad Ali Naqvi

Special focus on how Bibi Fatima''s (AS) patience and resilience can guide us through modern challenges. Light refreshments will be served after the majlis.

All brothers, sisters, and families are warmly invited. Please share with others who might benefit from attending.

#Majlis #LadyFatima #Patience #Resilience #Faisalabad #Community',
  'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&h=400&fit=crop',
  NOW() - INTERVAL '12 hours'
),
-- Post 6: Discussion Question
(
  uuid_generate_v4(),
  '11111111-1111-1111-1111-111111111111',
  'Question for discussion: What are the key differences between Sunni and Shia understanding of Imamat? 

I''m preparing for an interfaith dialogue next week and want to present our perspective clearly and respectfully. Any recommended books or resources?

Looking for scholarly sources that explain:
- The concept of divinely appointed Imamat
- The role of the 12 Imams (AS)
- How Imamat guides the ummah

Please share your knowledge and recommended readings. 📖

#Imamat #TwelveImams #InterfaithDialogue #IslamicScholarship #Learning',
  null,
  NOW() - INTERVAL '18 hours'
),
-- Post 7: Muharram Preparation
(
  uuid_generate_v4(),
  '22222222-2222-2222-2222-222222222222',
  'Muharram is approaching and our community is preparing for azadari programs. 

We''re looking for volunteers to help with:
🖤 Decoration and setup
📢 Audio/visual arrangements  
🍵 Serving chai and refreshments
👶 Childcare during majalis
🚗 Transportation for elderly community members

The tragedy of Karbala teaches us about sacrifice, unity, and helping one another. Let''s embody these values by serving our community during this sacred month.

Who can volunteer? Please comment below with your availability.

#Muharram #Azadari #Volunteers #Karbala #CommunityService #Unity',
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
  NOW() - INTERVAL '1 day'
),
-- Post 8: Prayer Time Discussion
(
  uuid_generate_v4(),
  '33333333-3333-3333-3333-333333333333',
  'Brothers and sisters, I have a question about prayer timings during travel. 

If someone is traveling from Karachi to Lahore and the journey spans multiple prayer times, what''s the proper way to handle Maghrib and Isha prayers? Should we:

1. Pray according to departure city times?
2. Adjust based on current location?
3. Combine prayers (jam'' bayn salatayn)?

I know different Maraji have different opinions on this. What guidance do you follow? Please mention your source/Marja as well.

JazakAllahu Khair for your help! 🤲

#Prayer #Travel #Fiqh #Maraji #IslamicJurisprudence #Guidance',
  null,
  NOW() - INTERVAL '1 day 6 hours'
),
-- Post 9: Community Achievement
(
  uuid_generate_v4(),
  '44444444-4444-4444-4444-444444444444',
  'Alhamdulillah! Amazing news to share with our community! 🎉

Our sister Fatima Batool from Multan has been accepted into Al-Azhar University for her PhD in Islamic Studies, with a focus on women''s rights in early Islamic period.

She will be researching the role of Lady Khadija (AS) and Lady Fatima (AS) in establishing social justice principles. This is such an honor for our community!

Please keep her in your duas as she embarks on this incredible journey of knowledge and research.

May Allah bless her studies and make her research beneficial for the entire ummah! 📚✨

#Education #PhD #AlAzhar #WomensRights #IslamicStudies #ProudCommunity #Duas',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
  NOW() - INTERVAL '2 days'
),
-- Post 10: Weekly Hadith
(
  uuid_generate_v4(),
  '55555555-5555-5555-5555-555555555555',
  'Weekly Hadith Reflection 🌟

Prophet Muhammad (PBUH) said: "The believers in their mutual kindness, compassion, and sympathy are just one body; when one limb suffers, the whole body responds to it with wakefulness and fever."

This beautiful hadith reminds us that as a community, we must:
- Feel each other''s pain and joy
- Support those in need
- Celebrate each other''s achievements  
- Be there during difficult times

How can we better embody this teaching in our daily interactions? Share your thoughts and experiences.

#Hadith #Community #Compassion #Unity #ProphetMuhammad #Brotherhood #Reflection',
  'https://images.unsplash.com/photo-1589998059171-988d887df646?w=600&h=400&fit=crop',
  NOW() - INTERVAL '3 days'
),
-- Post 11: Dua Request
(
  uuid_generate_v4(),
  '22222222-2222-2222-2222-222222222222',
  'Assalamu Alaikum everyone. I hope you''re all in the best of health and Iman.

I''m requesting your duas for my mother who is going through a difficult health condition. The doctors are optimistic, but as believers, we know that Allah is the ultimate healer.

Please remember her in your prayers, especially during your Tahajjud and after your daily prayers. I truly believe in the power of collective duas from our community.

May Allah reward all of you for your kind prayers and keep all our families healthy and blessed.

#Duas #Health #Community #Prayers #Tahajjud #Healing #Family',
  null,
  NOW() - INTERVAL '4 days'
),
-- Post 12: Book Recommendation
(
  uuid_generate_v4(),
  '44444444-4444-4444-4444-444444444444',
  'Book Recommendation: "Peshawar Nights" 📖

I just finished reading this incredible book about the famous debates in Peshawar. It beautifully presents the logical arguments for Shia beliefs through scholarly discussions.

What I loved most:
✅ Clear, respectful presentation of evidence
✅ Detailed references from Quran and authentic Hadith
✅ Addresses common misconceptions
✅ Great for both beginners and advanced readers

Has anyone else read this? What are your favorite Islamic books that strengthen your faith and knowledge?

#BookRecommendation #PeshawarNights #IslamicLiterature #Faith #Knowledge #Reading #ShiaBeliefs',
  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=400&fit=crop',
  NOW() - INTERVAL '5 days'
),
-- Post 13: Ziyarat Experience
(
  uuid_generate_v4(),
  '11111111-1111-1111-1111-111111111111',
  'Just returned from Ziyarat and my heart is overflowing with emotions. 💫

Visiting the shrines of our Imams (AS) was life-changing. The spiritual atmosphere, the duas of fellow pilgrims, the sense of connection with our beloved Ahlul Bayt (AS) - it''s indescribable.

Standing in Haram-e-Imam Ali (AS) and reciting Ziyarat-e-Jamia Kabira gave me such peace and strength. I feel spiritually renewed and more committed to following the path of our Imams.

For those planning Ziyarat, prepare your hearts before your journey. The physical trip is just the beginning - the real journey is spiritual.

May Allah grant all of us the opportunity for Ziyarat soon! 🤲

#Ziyarat #ImamAli #SpiritualJourney #Najaf #Pilgrimage #Blessed #AhlulBayt',
  'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&h=400&fit=crop',
  NOW() - INTERVAL '6 days'
),
-- Post 14: Youth Question
(
  uuid_generate_v4(),
  '33333333-3333-3333-3333-333333333333',
  'Need advice from the community! 🤔

I''m a university student and sometimes find it challenging to maintain my religious practices while dealing with academic pressure and social situations. 

How do other young professionals/students balance:
- Regular prayers during busy schedules
- Fasting during exam periods  
- Explaining our beliefs to curious friends
- Finding halal food options on campus
- Maintaining Islamic values in modern environment

Any practical tips from your experience? Your advice could help many young community members facing similar challenges.

#YouthIssues #UniversityLife #IslamicPractices #ModernChallenges #Advice #StudentLife #Balance',
  null,
  NOW() - INTERVAL '7 days'
),
-- Post 15: Community Service
(
  uuid_generate_v4(),
  '55555555-5555-5555-5555-555555555555',
  'Update on our monthly food drive! 🍲

Alhamdulillah, last month we distributed:
✅ 200 food packages to needy families
✅ 150 iftar meals during Ramadan
✅ 50 warm blankets for winter
✅ Educational supplies for 75 children

The response from our community has been overwhelming! Special thanks to all volunteers and donors.

Next distribution: First Saturday of next month
Location: Community Center, main hall
Time: 10 AM - 2 PM

Remember, helping those in need is one of the most beloved acts to Allah. Every contribution, big or small, makes a difference.

#CommunityService #FoodDrive #Charity #Volunteers #SocialWork #Helping #Sawab',
  'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&h=400&fit=crop',
  NOW() - INTERVAL '8 days'
);

-- Add some interactions to make posts feel real
-- Post likes
INSERT INTO public.post_likes (post_id, user_id) 
SELECT p.id, u.id 
FROM posts p 
CROSS JOIN (
  SELECT id FROM users 
  WHERE id IN (
    '11111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222',
    '33333333-3333-3333-3333-333333333333'
  )
) u
WHERE random() > 0.7; -- Randomly like about 30% of post-user combinations

-- Post comments
INSERT INTO public.post_comments (id, post_id, user_id, content, created_at)
VALUES 
(
  uuid_generate_v4(),
  (SELECT id FROM posts WHERE content LIKE '%Ghadeer-e-Khumm%' LIMIT 1),
  '22222222-2222-2222-2222-222222222222',
  'SubhanAllah! Ghadeer-e-Khumm is indeed fundamental to our beliefs. It''s where the Prophet (PBUH) declared Imam Ali (AS) as his successor. I recommend reading "The Event of Ghadeer" by Allama Tabatabai for detailed analysis.',
  NOW() - INTERVAL '1 hour 30 minutes'
),
(
  uuid_generate_v4(),
  (SELECT id FROM posts WHERE content LIKE '%community iftar%' LIMIT 1),
  '33333333-3333-3333-3333-333333333333',
  'Count me in for volunteering! I can help with setup and serving. This sounds like a wonderful initiative. May Allah reward your efforts! 🤲',
  NOW() - INTERVAL '3 hours 15 minutes'
),
(
  uuid_generate_v4(),
  (SELECT id FROM posts WHERE content LIKE '%university student%' LIMIT 1),
  '55555555-5555-5555-5555-555555555555',
  'Excellent question brother! I always advise our youth: make a prayer schedule that works with your class timings. Most universities have prayer rooms. For social situations, be confident about your beliefs - people respect those who stand by their principles.',
  NOW() - INTERVAL '6 hours 45 minutes'
),
(
  uuid_generate_v4(),
  (SELECT id FROM posts WHERE content LIKE '%food drive%' LIMIT 1),
  '44444444-4444-4444-4444-444444444444',
  'MashaAllah! This is exactly what our community needs. I''d like to donate some funds for next month''s drive. Please let me know how I can contribute. May Allah multiply the rewards for all organizers! 💝',
  NOW() - INTERVAL '7 hours 20 minutes'
);