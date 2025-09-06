import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

export const seedDemoData = async (userId) => {
  if (!userId) {
    throw new Error('User ID is required for seeding data');
  }

  const demoPosts = [
    {
      author_id: userId,
      content: `Assalamu Alaikum brothers and sisters! I have a question about the significance of Ghadeer-e-Khumm. Can someone explain why this event is so important in Shia belief? 

#GhadeerEKhumm #ShiaBeliefs #IslamicHistory`,
      image_url: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&h=400&fit=crop',
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    },
    {
      author_id: userId,
      content: `Organizing a community iftar this Friday at our local Imam Bargah! 

🕕 Time: 6:30 PM
📍 Location: Main Hall  
🍽️ Free dinner for all
👥 Special program for children

Need volunteers for preparation. Please comment if you can help!

#CommunityIftar #Volunteers #Unity`,
      image_url: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=600&h=400&fit=crop',
      created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
    },
    {
      author_id: userId,
      content: `SubhanAllah! Just finished reciting Dua Kumayl. The depth of Imam Ali's (AS) words never ceases to amaze me. 

"My God, You are the shelter of the shelterless and the helper of the helpless."

These words bring so much comfort during difficult times. 🤲

#DuaKumayl #ImamAli #Spirituality #Peace`,
      image_url: null,
      created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
    },
    {
      author_id: userId,
      content: `Today I want to share wisdom from Imam Jafar Sadiq (AS):

"Knowledge is not what is memorized, but what benefits."

This reminds us that true Islamic education isn't just about memorizing texts, but applying teachings in our daily lives to become better Muslims and human beings.

#ImamJafarSadiq #Knowledge #Education #IslamicWisdom #Practice`,
      image_url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop',
      created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString()
    },
    {
      author_id: userId,
      content: `Majlis announcement for this weekend! 

🕌 Topic: "The Patience of Lady Zahra (AS)"
🗓️ Date: Saturday, 7:00 PM
🎤 Speaker: Local Alim

All families welcome! Light refreshments after majlis.

#Majlis #LadyFatima #Community #Patience #Weekend`,
      image_url: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&h=400&fit=crop',
      created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
    },
    {
      author_id: userId,
      content: `Question for our community: How do you explain the concept of Wilayat to someone new to Shia Islam? 

Looking for simple, clear explanations that can help in dawah work. Please share your approaches and experiences.

#Wilayat #Dawah #Explanation #Community #Discussion #Learning`,
      image_url: null,
      created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    },
    {
      author_id: userId,
      content: `Alhamdulillah! Our monthly charity drive was successful! 

Distributed:
✅ 100 food packages
✅ Clothes for children  
✅ Books for students
✅ Medicine for elderly

Thanks to all donors and volunteers! Next drive: First Saturday of next month.

#Charity #CommunityService #Alhamdulillah #Volunteers #SocialWork`,
      image_url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&h=400&fit=crop',
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      author_id: userId,
      content: `Weekly Hadith from Prophet Muhammad (PBUH): 

"The believers are like one body; when one part is in pain, the rest of the body feels it."

This teaches us about community support and brotherhood. How can we better support each other?

#Hadith #Community #Brotherhood #ProphetMuhammad #Unity #Support`,
      image_url: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=600&h=400&fit=crop',
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];

  try {
    console.log('Seeding demo posts...');
    
    // Insert all demo posts
    const { data, error } = await supabase
      .from('posts')
      .insert(demoPosts)
      .select();

    if (error) {
      console.error('Error seeding demo data:', error);
      throw error;
    }

    console.log('Demo posts created successfully:', data);
    return data;
  } catch (error) {
    console.error('Failed to seed demo data:', error);
    throw error;
  }
};

export const clearDemoPosts = async (userId) => {
  if (!userId) {
    throw new Error('User ID is required');
  }

  try {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('author_id', userId);

    if (error) throw error;
    
    console.log('Demo posts cleared successfully');
    return true;
  } catch (error) {
    console.error('Failed to clear demo posts:', error);
    throw error;
  }
};