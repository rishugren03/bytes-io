"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Home, 
  Users, 
  Code2, 
  Trophy, 
  Network, 
  Map, 
  Library, 
  ShieldCheck,
  User,
  LogOut,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Registry", href: "/members", icon: Users },
  { name: "Showcase", href: "/projects", icon: Code2 },
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { name: "Skills", href: "/skills", icon: Map },
  { name: "Library", href: "/resources", icon: Library },
  { name: "Events", href: "/hackathons", icon: Network },
  { name: "Mentors", href: "/mentorship", icon: ShieldCheck },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        setProfile(profile);
        
        // If logged in but no username (onboarding not complete)
        if (user && !profile?.username && pathname !== '/onboarding') {
          router.push('/onboarding');
        }
      }
    };

    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchUser();
    });

    return () => subscription.unsubscribe();
  }, [supabase, router, pathname, profile?.username]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    router.push('/');
    router.refresh();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <div className="flex items-center gap-1 p-1 rounded-full border border-white/10 bg-black/50 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 flex items-center gap-2",
                isActive ? "text-white" : "text-white/60 hover:text-white"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-white/10 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <item.icon size={16} />
              <span className="hidden lg:inline">{item.name}</span>
            </Link>
          );
        })}

        <div className="w-[1px] h-6 bg-white/10 mx-2 hidden md:block" />

        {user ? (
          <div className="flex items-center gap-3 pr-2">
            <div className="flex flex-col items-end hidden md:flex">
               <span className="text-[10px] text-white font-bold leading-none">@{profile?.username || 'initialized'}</span>
               <span className="text-[8px] text-primary/60 font-mono flex items-center gap-1 uppercase tracking-widest"><Zap size={8}/> {profile?.power_score || 0}</span>
            </div>
            <div className="relative group/user">
                <div className="w-8 h-8 rounded-full border border-white/10 overflow-hidden cursor-pointer hover:border-primary/50 transition-colors bg-zinc-900">
                   <img 
                     src={user.user_metadata?.avatar_url || profile?.avatar_url || `https://api.dicebear.com/9.x/adventurer/svg?seed=${profile?.username || user.id}`} 
                     alt="User" 
                     className="w-full h-full object-cover" 
                   />
                </div>
             <div className="absolute top-full right-0 mt-4 p-2 rounded-xl border border-white/5 bg-black/90 backdrop-blur-xl opacity-0 invisible group-hover/user:opacity-100 group-hover/user:visible transition-all min-w-[160px] shadow-2xl">
                {profile?.username && (
                   <Link 
                     href={`/profile/${profile.username}`}
                     className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs text-white/60 hover:text-white hover:bg-white/5 w-full transition-colors mb-1"
                   >
                      <User size={14} /> My Profile
                   </Link>
                )}
                <button onClick={handleSignOut} className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs text-red-400 hover:bg-white/5 w-full whitespace-nowrap transition-colors">
                   <LogOut size={14} /> Kill Session
                </button>
             </div>
            </div>
          </div>
        ) : (
          <Link href="/login" className="px-4 pr-5 py-2 text-sm font-bold text-primary hover:text-white transition-colors flex items-center gap-2">
            <User size={16} />
            <span className="hidden md:inline">Sign In</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
