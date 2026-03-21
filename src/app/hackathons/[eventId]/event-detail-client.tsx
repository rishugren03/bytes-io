"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Plus, Trash2, X, Check, ChevronRight,
  Calendar, MapPin, Users, Trophy, Rocket, Terminal, Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Problem {
  id: string;
  problemNumber: number;
  title: string;
  description: string | null;
  difficulty: string;
  submissions: number;
}

interface EventDetailProps {
  event: {
    id: string;
    title: string;
    description: string | null;
    eventType: string;
    startDate: Date;
    endDate: Date;
    location: string | null;
    maxTeamSize: number | null;
    prizeInfo: string | null;
    status: string;
    createdBy: { username: string | null; fullName: string | null; avatarUrl: string | null };
    problems: Problem[];
  };
  isAdmin: boolean;
  userId: string | null;
}

export function EventDetailClient({ event, isAdmin, userId }: EventDetailProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "medium",
  });

  const getDifficultyStyle = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "text-green-400 bg-green-500/10 border-green-500/20";
      case "medium": return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
      case "hard": return "text-red-400 bg-red-500/10 border-red-500/20";
      default: return "text-white/40 bg-white/5 border-white/10";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "text-primary bg-primary/10 border-primary/20";
      case "active": return "text-green-400 bg-green-500/10 border-green-500/20";
      case "completed": return "text-white/40 bg-white/5 border-white/10";
      default: return "text-white/40 bg-white/5 border-white/10";
    }
  };

  const handleAddProblem = async () => {
    setSubmitting(true);
    const { createProblem } = await import("@/lib/actions/problems");
    const result = await createProblem({
      eventId: event.id,
      title: formData.title,
      description: formData.description || undefined,
      difficulty: formData.difficulty,
    });

    if (result.success) {
      setShowAddForm(false);
      setFormData({ title: "", description: "", difficulty: "medium" });
      window.location.reload();
    } else {
      alert(result.error);
    }
    setSubmitting(false);
  };

  const handleDelete = async (problemId: string) => {
    if (!confirm("Delete this problem statement?")) return;
    const { deleteProblem } = await import("@/lib/actions/problems");
    const result = await deleteProblem(problemId, event.id);
    if (result.success) {
      window.location.reload();
    } else {
      alert(result.error);
    }
  };

  const STYLES = {
    label: "text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] mb-2 block",
    input: "bg-white/5 border-white/10 text-white focus-visible:ring-primary/50",
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Back Button */}
      <Link
        href="/hackathons"
        className="inline-flex items-center gap-2 text-white/40 hover:text-primary font-mono text-sm transition-colors group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Events
      </Link>

      {/* Event Header */}
      <motion.header
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Rocket size={80} />
        </div>
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <Badge className={cn("text-[10px] uppercase tracking-widest border", getStatusColor(event.status))}>
              {event.status}
            </Badge>
            <Badge variant="outline" className="border-white/10 bg-white/5 text-white/40 text-[10px]">
              {event.eventType}
            </Badge>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white font-mono">
            <span className="text-primary mr-2">{">"}</span>
            {event.title}
          </h1>

          {event.description && (
            <p className="text-white/40 font-mono text-sm max-w-3xl">{event.description}</p>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-mono pt-2">
            <div className="space-y-1">
              <span className="text-white/20 uppercase text-[10px] tracking-widest">Start</span>
              <div className="text-white flex items-center gap-2">
                <Calendar size={14} className="text-primary" />
                {new Date(event.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-white/20 uppercase text-[10px] tracking-widest">End</span>
              <div className="text-white flex items-center gap-2">
                <Calendar size={14} className="text-primary" />
                {new Date(event.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </div>
            </div>
            {event.location && (
              <div className="space-y-1">
                <span className="text-white/20 uppercase text-[10px] tracking-widest">Location</span>
                <div className="text-white flex items-center gap-2">
                  <MapPin size={14} className="text-primary" />
                  {event.location}
                </div>
              </div>
            )}
            {event.prizeInfo && (
              <div className="space-y-1">
                <span className="text-white/20 uppercase text-[10px] tracking-widest">Prizes</span>
                <div className="text-primary font-bold">{event.prizeInfo}</div>
              </div>
            )}
          </div>
        </div>
      </motion.header>

      {/* Problem Statements Section */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white font-mono">
              <span className="text-primary mr-2">$</span>
              Problem Statements
            </h2>
            <p className="text-white/30 font-mono text-xs mt-1">
              {event.problems.length} problem{event.problems.length !== 1 ? "s" : ""} listed
            </p>
          </div>
          {isAdmin && (
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-primary text-black font-bold hover:shadow-[0_0_20px_rgba(0,209,255,0.4)] transition-all flex items-center gap-2"
            >
              <Plus size={18} />
              Add Problem
            </Button>
          )}
        </div>

        {/* Problem Statements Table */}
        {event.problems.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-white/5 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                    <th className="text-left py-4 px-6 text-[10px] font-mono text-white/30 uppercase tracking-widest">#</th>
                    <th className="text-left py-4 px-6 text-[10px] font-mono text-white/30 uppercase tracking-widest">Problem Title</th>
                    <th className="text-left py-4 px-6 text-[10px] font-mono text-white/30 uppercase tracking-widest">Difficulty</th>
                    <th className="text-left py-4 px-6 text-[10px] font-mono text-white/30 uppercase tracking-widest">Submissions</th>
                    {isAdmin && (
                      <th className="text-right py-4 px-6 text-[10px] font-mono text-white/30 uppercase tracking-widest">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {event.problems.map((problem, index) => (
                    <motion.tr
                      key={problem.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="py-4 px-6">
                        <span className="text-primary font-mono font-bold text-sm">
                          {String(problem.problemNumber).padStart(2, "0")}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <div className="text-white font-medium group-hover:text-primary transition-colors">
                            {problem.title}
                          </div>
                          {problem.description && (
                            <div className="text-white/30 text-xs font-mono mt-1 line-clamp-1">
                              {problem.description}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <Badge className={cn("text-[10px] uppercase tracking-widest border", getDifficultyStyle(problem.difficulty))}>
                          {problem.difficulty}
                        </Badge>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 font-mono text-sm">
                          <Send size={12} className="text-white/20" />
                          <span className="text-white/60">{problem.submissions}</span>
                          {isAdmin && (
                            <button
                              onClick={async () => {
                                const { addSubmission } = await import("@/lib/actions/problems");
                                const result = await addSubmission(problem.id, event.id);
                                if (result.success) {
                                  window.location.reload();
                                } else {
                                  alert(result.error);
                                }
                              }}
                              className="ml-1 text-primary/40 hover:text-primary hover:bg-primary/10 transition-colors p-1 rounded-md"
                              title="Add submission"
                            >
                              <Plus size={14} />
                            </button>
                          )}
                        </div>
                      </td>
                      {isAdmin && (
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => handleDelete(problem.id)}
                            className="text-white/20 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-500/10"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      )}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : (
          <div className="py-16 text-center border border-dashed border-white/5 rounded-3xl bg-white/[0.01]">
            <Terminal className="mx-auto text-white/10 mb-4" size={40} />
            <p className="text-white/40 font-mono">No problem statements added yet.</p>
            {isAdmin && <p className="text-white/20 font-mono text-xs mt-2">Click &quot;Add Problem&quot; to create one.</p>}
          </div>
        )}
      </section>

      {/* Add Problem Modal */}
      <AnimatePresence>
        {showAddForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowAddForm(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-zinc-900 border border-white/10 p-8 rounded-3xl shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Plus className="text-primary" size={18} />
                  Add Problem Statement
                </h3>
                <button onClick={() => setShowAddForm(false)} className="text-white/20 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={STYLES.label}>Problem Title</label>
                  <Input
                    placeholder="e.g. Build a REST API"
                    className={STYLES.input}
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className={STYLES.label}>Description (optional)</label>
                  <textarea
                    placeholder="Describe the problem..."
                    className={`${STYLES.input} w-full rounded-md border px-3 py-2 min-h-[80px] bg-white/5 border-white/10 text-white focus:ring-1 focus:ring-primary/50 focus:outline-none`}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div>
                  <label className={STYLES.label}>Difficulty</label>
                  <div className="flex gap-2">
                    {(["easy", "medium", "hard"] as const).map((d) => (
                      <button
                        key={d}
                        onClick={() => setFormData({ ...formData, difficulty: d })}
                        className={cn(
                          "flex-1 p-3 rounded-xl border font-mono text-xs transition-all capitalize",
                          formData.difficulty === d
                            ? getDifficultyStyle(d) + " font-bold"
                            : "bg-white/5 border-white/10 text-white/40 hover:border-white/20"
                        )}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 h-12 border-white/10 text-white rounded-2xl"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddProblem}
                  disabled={!formData.title || submitting}
                  className="flex-[2] h-12 bg-primary text-black font-bold rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,209,255,0.3)]"
                >
                  {submitting ? "Adding..." : "Add Problem"} <Check size={16} />
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
