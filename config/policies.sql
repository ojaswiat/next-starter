-- Enable Row Level Security on the profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read their own profile
CREATE POLICY "Users can read their own profile"
ON "public"."profiles" AS PERMISSIVE
FOR SELECT TO public
USING (auth.uid() = id);

-- Create policy to allow users to update their own profile
CREATE POLICY "Users can update their own profile"
ON "public"."profiles" AS PERMISSIVE
FOR UPDATE TO public
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);