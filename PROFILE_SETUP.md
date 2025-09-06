# Profile Setup Guide

This guide helps you set up the complete profile functionality with image uploads.

## Database Updates Required

### 1. Add Cover Photo Support
Run this SQL in your Supabase SQL Editor:

```sql
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS cover_url TEXT;
```

## Current Image Upload Method

The profile component currently uses **base64 data URLs** for image storage, which:

✅ **Works immediately** without any Supabase Storage setup
✅ **No bucket configuration** required  
✅ **Images stored directly** in the database
✅ **Perfect for development** and testing

### Limitations:
- Images stored as text in database (larger storage usage)
- Not ideal for production with many users
- 5MB limit for avatars, 10MB for cover photos

## Production Image Upload (Optional)

For production deployment, you can upgrade to Supabase Storage:

### 1. Create Storage Bucket
In Supabase Dashboard → Storage:
1. Create new bucket: `user-uploads`
2. Set bucket to **Public**
3. Configure RLS policies if needed

### 2. Update Storage Service
The `storageService` is already configured to use the `user-uploads` bucket.

### 3. Switch Upload Method
In `src/app/profile/page.js`, you can replace the current base64 method with the storage service by uncommenting the storage service calls.

## Current Features Working

### ✅ Profile Picture Upload
- Click camera icon on avatar
- Select image file (JPG, PNG, etc.)
- Image converts to base64 and saves to database
- Updates immediately in UI

### ✅ Cover Photo Upload  
- Click "Edit Cover" button
- Select cover image
- Image converts to base64 and saves to database
- Updates immediately in UI

### ✅ Profile Editing
- Click "Edit Profile" button
- Edit name, username, bio, city, website
- Save changes to database
- Updates immediately in UI

### ✅ Real Statistics
- Post count from user's actual posts
- Followers/Following from database relationships
- All data comes from Supabase

## File Size Limits

### Current Limits (Base64):
- **Avatar**: 5MB maximum
- **Cover Photo**: 10MB maximum
- **Supported Formats**: JPG, PNG, GIF, WebP

### Validation:
- File type checking (images only)
- File size validation
- Error messages for invalid files
- Loading states during upload

## Troubleshooting

### Profile Picture Issues:
1. **Image not showing**: Check browser console for errors
2. **Upload fails**: Verify file is under 5MB and is an image
3. **Position issues**: Fixed with z-index and proper CSS positioning

### Database Issues:
1. **Cover photo not saving**: Run the SQL update to add `cover_url` column
2. **Profile updates fail**: Check user authentication and database permissions

## Development vs Production

### Development (Current):
```javascript
// Images stored as base64 data URLs
const avatarUrl = e.target.result; // base64 string
await updateProfile({ avatar_url: avatarUrl });
```

### Production (Upgrade):
```javascript
// Images stored in Supabase Storage
const avatarUrl = await storageService.uploadAvatar(file, user.id);
await updateProfile({ avatar_url: avatarUrl });
```

## Ready to Use

The profile page is fully functional with:
- ✅ Image upload working
- ✅ Profile editing working
- ✅ Statistics from database
- ✅ Responsive design
- ✅ Error handling
- ✅ Loading states

No additional setup required for basic functionality!