-- Create contact_submissions table
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  project_type TEXT NOT NULL,
  budget TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'new' -- new, contacted, in_progress, completed
);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert submissions (public form)
CREATE POLICY "Allow public insert" ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow service role to read all submissions (for admin access)
CREATE POLICY "Allow service role read" ON contact_submissions
  FOR SELECT
  TO service_role
  USING (true);

-- Create index for faster queries
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);

-- Optional: Create a function to send email notifications
-- This requires additional setup with Supabase Edge Functions
