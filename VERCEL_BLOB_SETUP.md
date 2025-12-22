# Vercel Blob Storage Setup

## What Changed

Your media upload system now uses **Vercel Blob Storage** instead of local filesystem. This ensures file uploads work on Vercel's serverless platform.

## Setup Instructions

### 1. Create Vercel Blob Store

1. Go to your Vercel Dashboard: https://vercel.com/dashboard
2. Select your project
3. Navigate to **Storage** tab
4. Click **Create Database** → Select **Blob**
5. Choose your store name (e.g., "media-uploads")
6. Click **Create**

### 2. Get Your Token

1. After creating the store, you'll see your connection token
2. Copy the `BLOB_READ_WRITE_TOKEN` value
3. It looks like: `vercel_blob_rw_xxxxxxxxxxxxxx`

### 3. Add to Environment Variables

#### For Local Development:
Add to your `.env` file:
```bash
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_xxxxxxxxxxxxxx"
```

#### For Vercel Deployment:
1. Go to your project settings on Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add new variable:
   - **Name**: `BLOB_READ_WRITE_TOKEN`
   - **Value**: Your token from step 2
   - **Environments**: Production, Preview, Development (select all)
4. Click **Save**

### 4. Redeploy

After adding the environment variable:
- Vercel will automatically redeploy
- Or manually trigger: `git push` or click "Redeploy" in Vercel dashboard

## Features

✅ **Persistent Storage**: Files are stored in Vercel's CDN, not lost on redeployments
✅ **Fast Delivery**: Files served from global CDN for optimal performance  
✅ **Automatic Cleanup**: Deleted files are removed from both database and blob storage
✅ **Sync Function**: Admin can sync blob storage with database records

## Free Tier Limits

- **Storage**: 500 MB free
- **Bandwidth**: Unlimited on free tier
- **Pricing after free tier**: $0.15/GB storage

## API Endpoints Updated

- ✅ `POST /api/media` - Upload to Vercel Blob
- ✅ `DELETE /api/media/[id]` - Delete from Vercel Blob
- ✅ `POST /api/media/batch-delete` - Batch delete from Vercel Blob
- ✅ `GET /api/media/scan` - Sync blob storage with database

## Troubleshooting

### Upload fails with "BLOB_READ_WRITE_TOKEN not found"
- Make sure you've added the token to environment variables
- Redeploy your application after adding the variable

### Images not loading
- Check that the token has `read-write` permissions, not just read
- Verify the blob store is in the same Vercel team/account as your project

### Old local images
- Existing images in `public/uploads` won't be accessible on Vercel
- Re-upload them through the admin media library to migrate to blob storage
