-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,
  github_username text,
  leetcode_username text,
  tech_stack text[],
  power_score integer default 0,
  bio text,

  constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

create policy "Users can insert their own profile." on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on public.profiles
  for update using (auth.uid() = id);

-- Create projects table
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  owner_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text,
  repo_url text,
  demo_url text,
  stars integer default 0,
  tags text[],
  status text default 'planning'
);

alter table public.projects enable row level security;

create policy "Projects are viewable by everyone." on public.projects
  for select using (true);

create policy "Users can create their own projects." on public.projects
  for insert with check (auth.uid() = owner_id);

create policy "Owners can update their projects." on public.projects
  for update using (auth.uid() = owner_id);

-- Create a helper function to handle new user signup
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, username)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'user_name');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
