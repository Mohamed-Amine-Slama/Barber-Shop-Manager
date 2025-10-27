# Setup Instructions

## Supabase Configuration

This application requires Supabase for authentication and database functionality.

### Steps:

1. **Create a Supabase Project**
   - Go to [https://supabase.com](https://supabase.com)
   - Create a new project
   - Wait for the project to be provisioned

2. **Get Your Credentials**
   - Go to Project Settings > API
   - Copy the `Project URL` and `anon/public` key

3. **Create `.env` File**
   - Create a file named `.env` in the root directory
   - Add the following:
   ```
   VITE_SUPABASE_URL=your_project_url_here
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```

4. **Set Up Database**
   - Go to SQL Editor in Supabase
   - Run the SQL script from `backend/schema.sql`

5. **Create Admin User**
   - Run: `node backend/createAdmin.js`
   - Or use the Supabase dashboard to create a user and set their role to 'admin'

6. **Restart Dev Server**
   - Stop the current dev server (Ctrl+C)
   - Run: `npm run dev`

## Without Supabase

If you don't configure Supabase, the app will run in mock mode with limited functionality. Authentication will not work properly.

................................................
