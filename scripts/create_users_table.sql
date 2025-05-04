-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  telegram_id TEXT NOT NULL UNIQUE,
  username TEXT,
  first_name TEXT,
  last_name TEXT,
  photo_url TEXT,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Comment on table and columns
COMMENT ON TABLE public.users IS 'User profiles from Telegram';
COMMENT ON COLUMN public.users.id IS 'Primary UUID identifier';
COMMENT ON COLUMN public.users.telegram_id IS 'Telegram user ID';
COMMENT ON COLUMN public.users.username IS 'Telegram username';
COMMENT ON COLUMN public.users.first_name IS 'User first name from Telegram';
COMMENT ON COLUMN public.users.last_name IS 'User last name from Telegram';
COMMENT ON COLUMN public.users.photo_url IS 'URL to user profile photo';
COMMENT ON COLUMN public.users.last_login IS 'Timestamp of last login';

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
-- Policy for selecting users
CREATE POLICY users_select_policy
  ON public.users
  FOR SELECT
  USING (true); -- Anyone can view user profiles

-- Policy for inserting users (authenticated only, Telegram auth is handled separately)
CREATE POLICY users_insert_policy
  ON public.users
  FOR INSERT
  WITH CHECK (true); -- We handle auth checks in the application code

-- Policy for updating users
CREATE POLICY users_update_policy
  ON public.users
  FOR UPDATE
  USING (true) -- Can see row
  WITH CHECK (true); -- We handle auth checks in the application code

-- Create index on telegram_id for faster lookups
CREATE INDEX IF NOT EXISTS users_telegram_id_idx ON public.users (telegram_id);

-- Enable realtime for this table
BEGIN;
  -- Drop the publication if it exists
  DROP PUBLICATION IF EXISTS supabase_realtime;
  
  -- Create the publication for realtime
  CREATE PUBLICATION supabase_realtime;
END;

-- Add the users table to the publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.users;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger for updating timestamps
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON public.users
FOR EACH ROW
EXECUTE FUNCTION public.trigger_set_timestamp(); 