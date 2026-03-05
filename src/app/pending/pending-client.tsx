"use client";

import { motion } from "framer-motion";
import { Clock, CheckCircle, XCircle, LogOut, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

interface PendingPageClientProps {
    status: "pending" | "rejected";
    username: string | null;
    avatarUrl: string | null;
}

export function PendingPageClient({ status, username, avatarUrl }: PendingPageClientProps) {
    const router = useRouter();
    const supabase = createClient();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/login");
        router.refresh();
    };

    const isRejected = status === "rejected";

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-8 text-center">
            {/* Animated icon */}
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`w-24 h-24 rounded-3xl flex items-center justify-center mb-8 ${isRejected
                    ? "bg-red-500/10 border border-red-500/20"
                    : "bg-primary/10 border border-primary/20"
                    }`}
            >
                {isRejected ? (
                    <XCircle className="text-red-400" size={44} />
                ) : (
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    >
                        <Clock className="text-primary" size={44} />
                    </motion.div>
                )}
            </motion.div>

            {/* Headline */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.7 }}
                className="space-y-4 mb-8"
            >
                <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tighter">
                    {isRejected ? (
                        <>
                            Request{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400 italic">
                                Declined.
                            </span>
                        </>
                    ) : (
                        <>
                            Request{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-300 italic">
                                Pending.
                            </span>
                        </>
                    )}
                </h1>

                {username && (
                    <div className="flex items-center justify-center gap-3">
                        {avatarUrl && (
                            <img
                                src={avatarUrl}
                                alt={username}
                                className="w-8 h-8 rounded-full border border-white/10"
                            />
                        )}
                        <span className="font-mono text-white/50 text-sm">@{username}</span>
                    </div>
                )}
            </motion.div>

            {/* Status box */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className={`max-w-md w-full p-6 rounded-2xl border mb-8 ${isRejected
                    ? "border-red-500/10 bg-red-500/[0.03]"
                    : "border-primary/10 bg-primary/[0.03]"
                    }`}
            >
                {isRejected ? (
                    <>
                        <div className="flex items-center gap-2 text-red-400 mb-3">
                            <XCircle size={16} />
                            <span className="text-xs font-bold uppercase tracking-widest">
                                Access Denied
                            </span>
                        </div>
                        <p className="text-white/40 text-sm font-mono leading-relaxed">
                            Your membership request was not approved. This could be due to eligibility requirements. Please contact an admin if you believe this was a mistake.
                        </p>
                    </>
                ) : (
                    <>
                        <div className="flex items-center gap-2 text-primary mb-3">
                            <CheckCircle size={16} />
                            <span className="text-xs font-bold uppercase tracking-widest">
                                Submission Confirmed
                            </span>
                        </div>
                        <p className="text-white/40 text-sm font-mono leading-relaxed">
                            Your registration has been submitted for admin review. You&apos;ll receive access once an admin approves your request. This usually takes less than 24 hours.
                        </p>

                        {/* Animated pending dots */}
                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
                            <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                                Awaiting approval
                            </span>
                            <div className="flex gap-1">
                                {[0, 1, 2].map((i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ opacity: [0.2, 1, 0.2] }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 1.4,
                                            delay: i * 0.2,
                                        }}
                                        className="w-1 h-1 rounded-full bg-primary"
                                    />
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </motion.div>

            {/* Sign out */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <Button
                    variant="ghost"
                    onClick={handleSignOut}
                    className="text-white/30 hover:text-white/60 flex items-center gap-2 font-mono text-xs uppercase tracking-widest"
                >
                    <LogOut size={14} />
                    Sign out
                </Button>
            </motion.div>
        </div>
    );
}
