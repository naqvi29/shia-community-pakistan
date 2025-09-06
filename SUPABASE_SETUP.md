# Supabase Setup Guide for Shia Community Pakistan

This guide will help you set up Supabase as the backend for your social media platform.

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up for a free account
3. Click "New Project"
4. Choose your organization
5. Set project details:
   - **Name**: `shia-community-pakistan`
   - **Database Password**: Choose a strong password
   - **Region**: Choose closest to Pakistan (e.g., Southeast Asia)
6. Click "Create new project"

## Step 2: Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. In your Supabase project dashboard:
   - Go to **Settings** → **API**
   - Copy the **Project URL** and paste it as `NEXT_PUBLIC_SUPABASE_URL`
   - Copy the **anon public key** and paste it as `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Copy the **service_role key** and paste it as `SUPABASE_SERVICE_ROLE_KEY`

Your `.env.local` should look like:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

## Step 3: Set Up Database Schema

1. In your Supabase project dashboard, go to **SQL Editor**
2. Copy the entire contents of `database/schema.sql`
3. Paste it into the SQL Editor
4. Click "Run" to execute the schema

This will create:
- Users table (extends auth.users)
- Posts, comments, likes, bookmarks tables
- Community features (majalis, communities)
- Follows and notifications tables
- Row Level Security (RLS) policies
- Database functions and triggers

## Step 4: Configure Authentication

1. In Supabase dashboard, go to **Authentication** → **Settings**
2. Configure email settings:
   - **Enable email confirmations** (optional)
   - Set up **SMTP settings** for email delivery (optional for development)

3. Configure URL settings:
   - **Site URL**: `http://localhost:3000` (for development)
   - **Redirect URLs**: Add your deployment URLs when ready

## Step 5: Set Up Storage (for images)

1. Go to **Storage** in your Supabase dashboard
2. Create a new bucket called `avatars`
3. Create another bucket called `post-images`
4. Set both buckets to **public** for easier development
5. Configure RLS policies if needed

## Step 6: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000`
3. Try registering a new account
4. Check if the user appears in your Supabase **Authentication** → **Users** section
5. Check if a profile is created in the **Table Editor** → **users** table

## Step 7: Configure Row Level Security (Optional)

The schema includes basic RLS policies, but you may want to customize them:

1. Go to **Table Editor** in Supabase
2. Select each table and click the **RLS** tab
3. Review and modify policies as needed

## Common Issues & Solutions

### Issue: "Invalid API key"
- **Solution**: Double-check your environment variables in `.env.local`
- Make sure there are no extra spaces or quotes

### Issue: "Schema not found"
- **Solution**: Make sure you ran the `database/schema.sql` in the SQL Editor
- Check if all tables were created in **Table Editor**

### Issue: "User registration fails"
- **Solution**: Check if the `handle_new_user()` function was created
- Verify the trigger `on_auth_user_created` exists

### Issue: "Images not uploading"
- **Solution**: Create the storage buckets (`avatars`, `post-images`)
- Make sure they're set to public access for development

## Production Considerations

When deploying to production:

1. **Update environment variables** with production URLs
2. **Configure proper SMTP** for email delivery
3. **Set up proper domain** in authentication settings
4. **Review RLS policies** for security
5. **Enable database backups**
6. **Monitor usage** to stay within free tier limits

## Free Tier Limits

Supabase free tier includes:
- Up to 500MB database storage
- 1GB file storage
- 50,000 monthly active users
- 2GB bandwidth

Perfect for development and initial launch!

## Next Steps

After setup is complete:
1. Test user registration and login
2. Try creating posts and interactions
3. Test image uploads
4. Customize the database schema as needed
5. Add real-time features using Supabase subscriptions

## Support

If you encounter issues:
1. Check [Supabase Documentation](https://supabase.com/docs)
2. Visit [Supabase Community](https://github.com/supabase/supabase/discussions)
3. Check the project's GitHub issues