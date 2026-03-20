"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, CheckCircle, XCircle, Clock, Shield, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { approveUser, rejectUser } from "@/lib/actions/admin";

type Profile = {
    id: string;
    username: string | null;
    fullName: string | null;
    avatarUrl: string | null;
    githubUsername: string | null;
    techStack: string[];
    updatedAt: Date | null;
    status: string;
};

interface AdminClientProps {
    initialPending: Profile[];
}

export function AdminClient({ initialPending }: AdminClientProps) {
    const [pending, setPending] = useState<Profile[]>(initialPending);
    const [processed, setProcessed] = useState<Record<string, "approved" | "rejected">>({});
    const [isPending, startTransition] = useTransition();

    const handleApprove = (userId: string) => {
        startTransition(async () => {
            const result = await approveUser(userId);
            if (result.success) {
                setProcessed((prev) => ({ ...prev, [userId]: "approved" }));
                setTimeout(() => {
                    setPending((prev) => prev.filter((u) => u.id !== userId));
                    setProcessed((prev) => {
                        const next = { ...prev };
                        delete next[userId];
                        return next;
                    });
                }, 1200);
            }
        });
    };

    const handleReject = (userId: string) => {
        startTransition(async () => {
            const result = await rejectUser(userId);
            if (result.success) {
                setProcessed((prev) => ({ ...prev, [userId]: "rejected" }));
                setTimeout(() => {
                    setPending((prev) => prev.filter((u) => u.id !== userId));
                    setProcessed((prev) => {
                        const next = { ...prev };
                        delete next[userId];
                        return next;
                    });
                }, 1200);
            }
        });
    };

    return (
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-20">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Shield className="text-primary" size={20} />
                    </div>
                    <span className="text-[10px] font-mono text-primary/60 uppercase tracking-widest">
                        Admin Console
                    </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tighter">
                    Membership{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 italic">
                        Requests.
                    </span>
                </h1>
                <p className="text-white/30 font-mono text-sm mt-3">
                    Review and manage pending registration requests.
                </p>
            </motion.div>

            {/* Stats row */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
            >
                <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02]">
                    <div className="flex items-center gap-2 mb-1">
                        <Clock size={14} className="text-yellow-400" />
                        <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">Pending</span>
                    </div>
                    <p className="text-3xl font-bold text-white">{pending.length}</p>
                </div>
                <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02]">
                    <div className="flex items-center gap-2 mb-1">
                        <CheckCircle size={14} className="text-green-400" />
                        <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">Approved</span>
                    </div>
                    <p className="text-3xl font-bold text-white">
                        {Object.values(processed).filter((s) => s === "approved").length}
                    </p>
                </div>
                <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02]">
                    <div className="flex items-center gap-2 mb-1">
                        <XCircle size={14} className="text-red-400" />
                        <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">Rejected</span>
                    </div>
                    <p className="text-3xl font-bold text-white">
                        {Object.values(processed).filter((s) => s === "rejected").length}
                    </p>
                </div>
            </motion.div>

            {/* User list */}
            {pending.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20"
                >
                    <div className="w-16 h-16 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Users className="text-primary/40" size={28} />
                    </div>
                    <p className="text-white/30 font-mono text-sm">No pending requests</p>
                    <p className="text-white/15 font-mono text-xs mt-1">All caught up!</p>
                </motion.div>
            ) : (
                <div className="space-y-4">
                    <AnimatePresence>
                        {pending.map((user, index) => {
                            const decision = processed[user.id];
                            return (
                                <motion.div
                                    key={user.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{
                                        opacity: decision ? 0.5 : 1,
                                        y: 0,
                                        scale: decision ? 0.98 : 1,
                                    }}
                                    exit={{ opacity: 0, x: decision === "approved" ? 60 : -60, height: 0 }}
                                    transition={{ delay: index * 0.05, duration: 0.5 }}
                                    className="group relative p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.03] transition-colors overflow-hidden"
                                >
                                    {/* Outcome overlay */}
                                    {decision && (
                                        <div
                                            className={`absolute inset-0 rounded-2xl flex items-center justify-center ${decision === "approved" ? "bg-green-500/10" : "bg-red-500/10"
                                                }`}
                                        >
                                            {decision === "approved" ? (
                                                <CheckCircle className="text-green-400" size={32} />
                                            ) : (
                                                <XCircle className="text-red-400" size={32} />
                                            )}
                                        </div>
                                    )}

                                    <div className="flex items-center gap-4 flex-wrap">
                                        {/* Avatar */}
                                        <div className="flex-shrink-0">
                                            {user.avatarUrl ? (
                                                <img
                                                    src={user.avatarUrl}
                                                    alt={user.username || "User"}
                                                    className="w-12 h-12 rounded-2xl border border-white/10 object-cover"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                                                    <Users size={20} className="text-primary/50" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <p className="text-white font-semibold truncate">
                                                    {user.fullName || user.username || "Unknown User"}
                                                </p>
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-yellow-500/20 bg-yellow-500/5 text-yellow-400 text-[10px] font-mono uppercase tracking-widest">
                                                    <Clock size={10} />
                                                    Pending
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3 mt-1 flex-wrap">
                                                {user.username && (
                                                    <span className="font-mono text-white/40 text-xs">@{user.username}</span>
                                                )}
                                                {user.githubUsername && (
                                                    <a
                                                        href={`https://github.com/${user.githubUsername}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-1 text-white/30 hover:text-primary text-xs font-mono transition-colors"
                                                    >
                                                        <Github size={12} />
                                                        {user.githubUsername}
                                                    </a>
                                                )}
                                            </div>
                                            {user.techStack.length > 0 && (
                                                <div className="flex gap-1 mt-2 flex-wrap">
                                                    {user.techStack.slice(0, 4).map((tech) => (
                                                        <span
                                                            key={tech}
                                                            className="px-2 py-0.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/30 text-[10px] font-mono"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        {!decision && (
                                            <div className="flex gap-2 flex-shrink-0">
                                                <Button
                                                    onClick={() => handleApprove(user.id)}
                                                    disabled={isPending}
                                                    size="sm"
                                                    className="bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 hover:border-green-500/40 font-mono text-xs rounded-xl gap-1.5 transition-all"
                                                >
                                                    <CheckCircle size={14} />
                                                    Approve
                                                </Button>
                                                <Button
                                                    onClick={() => handleReject(user.id)}
                                                    disabled={isPending}
                                                    size="sm"
                                                    variant="ghost"
                                                    className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/40 font-mono text-xs rounded-xl gap-1.5 transition-all"
                                                >
                                                    <XCircle size={14} />
                                                    Reject
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
