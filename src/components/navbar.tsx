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
  Menu,
  X,
  Zap,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Registry", href: "/members", icon: Users },
  { name: "Showcase", href: "/projects", icon: Code2 },
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  // Close mobile menu on path change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

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
        // Don't redirect pending/approved users who haven't done onboarding
        const restrictedPaths = ['/onboarding', '/pending', '/login'];
        if (user && !profile?.username && !restrictedPaths.some(p => pathname.startsWith(p))) {
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
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
        <div className="flex items-center gap-1 p-1 rounded-full border border-white/10 bg-black/50 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1">
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
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center px-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white/60 hover:text-white transition-colors"
            >
              <Menu size={20} />
            </button>
            <Link href="/" className="px-2 font-bold text-white tracking-tight">
              Bytes.io
            </Link>
          </div>

          <div className="w-[1px] h-6 bg-white/10 mx-2 hidden md:block" />

          {user ? (
            <div className="flex items-center gap-3 pr-2 ml-auto md:ml-0">
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-[10px] text-white font-bold leading-none">@{profile?.username || 'initialized'}</span>
                <span className="text-[8px] text-primary/60 font-mono flex items-center gap-1 uppercase tracking-widest"><Zap size={8} /> {profile?.power_score || 0}</span>
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
                  {profile?.role === 'admin' && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs text-primary/80 hover:text-primary hover:bg-primary/5 w-full transition-colors mb-1"
                    >
                      <Shield size={14} /> Admin Panel
                    </Link>
                  )}
                  <button onClick={handleSignOut} className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs text-red-400 hover:bg-white/5 w-full whitespace-nowrap transition-colors">
                    <LogOut size={14} /> Kill Session
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <Link href={`/login?next=${pathname}`} className="px-4 pr-5 py-2 text-sm font-bold text-primary hover:text-white transition-colors flex items-center gap-2 ml-auto md:ml-0">
              <User size={16} />
              <span className="hidden sm:inline">Sign In</span>
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[60] bg-black/80 flex flex-col p-8 pt-24 overflow-y-auto"
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-8 right-8 p-3 rounded-full border border-white/10 bg-white/5 text-white"
            >
              <X size={24} />
            </button>

            <div className="space-y-6">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-4 text-3xl font-bold tracking-tight py-2 transition-colors",
                      pathname === item.href ? "text-primary" : "text-white/40 hover:text-white"
                    )}
                  >
                    <item.icon size={28} />
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto pt-10 border-t border-white/10">
              {profile ? (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-primary/20 overflow-hidden">
                    <img
                      src={user.user_metadata?.avatar_url || profile?.avatar_url || `https://api.dicebear.com/9.x/adventurer/svg?seed=${profile?.username || user.id}`}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">@{profile.username}</h4>
                    <p className="text-primary/60 text-xs font-mono uppercase tracking-widest">{profile.power_score} Power Score</p>
                  </div>
                </div>
              ) : (
                <Link
                  href={`/login?next=${pathname}`}
                  className="w-full py-4 rounded-2xl bg-white text-black font-bold text-center block"
                >
                  Get Started
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
