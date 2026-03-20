"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, Trophy, Rocket, MapPin, Zap, ArrowRight, Plus, X, ChevronRight, Check, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface EventsClientProps {
  initialEvents: any[];
  isAdmin: boolean;
  userId: string | null;
}

const EVENT_TYPES = [
  { value: "hackathon", label: "Hackathon", icon: Rocket },
  { value: "workshop", label: "Workshop", icon: Zap },
  { value: "meetup", label: "Meetup", icon: Users },
];

export function EventsClient({ initialEvents, isAdmin, userId }: EventsClientProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventType: "hackathon",
    startDate: "",
    endDate: "",
    location: "",
    maxTeamSize: "",
    prizeInfo: "",
  });

  const handleCreate = async () => {
    if (!userId) return;
    setSubmitting(true);
    
    const { createEvent } = await import("@/lib/actions/events");
    const result = await createEvent({
      title: formData.title,
      description: formData.description,
      eventType: formData.eventType,
      startDate: formData.startDate,
      endDate: formData.endDate,
      location: formData.location,
      maxTeamSize: formData.maxTeamSize ? parseInt(formData.maxTeamSize) : undefined,
      prizeInfo: formData.prizeInfo,
    });

    if (result.success) {
      setShowCreateForm(false);
      setStep(1);
      setFormData({ title: "", description: "", eventType: "hackathon", startDate: "", endDate: "", location: "", maxTeamSize: "", prizeInfo: "" });
      window.location.reload();
    } else {
      alert(result.error);
    }
    setSubmitting(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "text-primary bg-primary/10 border-primary/20";
      case "active": return "text-green-400 bg-green-500/10 border-green-500/20";
      case "completed": return "text-white/40 bg-white/5 border-white/10";
      default: return "text-white/40 bg-white/5 border-white/10";
    }
  };

  const STYLES = {
    label: "text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] mb-2 block",
    input: "bg-white/5 border-white/10 text-white focus-visible:ring-primary/50",
  };

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-white font-mono">
            <span className="text-primary mr-2">{">"}</span>
            Event Portal
          </h1>
          <p className="text-white/40 font-mono text-sm max-w-2xl">
            Hackathons, workshops, and meetups by Bytes.io. Browse upcoming events 
            or submit your own if you&apos;re an admin.
          </p>
        </div>

        {isAdmin && (
          <Button 
            onClick={() => setShowCreateForm(true)}
            className="bg-primary text-black font-bold hover:shadow-[0_0_20px_rgba(0,209,255,0.4)] transition-all flex items-center gap-2"
          >
            <Plus size={18} />
            Create Event
          </Button>
        )}
      </header>

      {/* Events List */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {initialEvents.map((event: any, index: number) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-primary/20 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Rocket size={60} />
            </div>

            <div className="relative z-10 space-y-4">
              <div className="flex items-start justify-between">
                <Badge className={cn("text-[10px] uppercase tracking-widest border", getStatusColor(event.status))}>
                  {event.status}
                </Badge>
                <Badge variant="outline" className="border-white/10 bg-white/5 text-white/40 text-[10px]">
                  {event.eventType}
                </Badge>
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{event.title}</h3>
              
              {event.description && (
                <p className="text-white/40 text-sm font-mono line-clamp-2">{event.description}</p>
              )}

              <div className="grid grid-cols-2 gap-4 text-sm font-mono pt-2">
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

              <div className="border-t border-white/5 pt-4 mt-4">
                <div className="text-[10px] text-white/20 font-mono">
                  Created by @{event.createdBy?.username || "admin"}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {initialEvents.length === 0 && (
          <div className="col-span-full py-20 text-center border border-dashed border-white/5 rounded-3xl bg-white/[0.01]">
            <Terminal className="mx-auto text-white/10 mb-4" size={40} />
            <p className="text-white/40 font-mono">No events scheduled yet.</p>
            {isAdmin && <p className="text-white/20 font-mono text-xs mt-2">Click &quot;Create Event&quot; to add the first one.</p>}
          </div>
        )}
      </section>

      {/* Multi-Step Create Event Modal */}
      <AnimatePresence>
        {showCreateForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => { setShowCreateForm(false); setStep(1); }}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-zinc-900 border border-white/10 p-8 rounded-3xl shadow-2xl"
            >
              {/* Step Indicator */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Rocket className="text-primary" size={20} />
                  Create Event
                </h2>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4].map((s) => (
                    <div key={s} className={cn(
                      "w-8 h-1 rounded-full transition-colors",
                      s <= step ? "bg-primary" : "bg-white/10"
                    )} />
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {/* Step 1: Basic Info */}
                {step === 1 && (
                  <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <div className="text-xs font-mono text-primary uppercase tracking-widest">Step 1 — Basic Info</div>
                    <div className="space-y-4">
                      <div>
                        <label className={STYLES.label}>Event Title</label>
                        <Input placeholder="e.g. ByteHack 2026" className={STYLES.input} value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                      </div>
                      <div>
                        <label className={STYLES.label}>Description</label>
                        <textarea 
                          placeholder="What's this event about?" 
                          className={`${STYLES.input} w-full rounded-md border px-3 py-2 min-h-[100px] bg-white/5 border-white/10 text-white focus:ring-1 focus:ring-primary/50 focus:outline-none`}
                          value={formData.description} 
                          onChange={(e) => setFormData({...formData, description: e.target.value})} 
                        />
                      </div>
                      <div>
                        <label className={STYLES.label}>Event Type</label>
                        <div className="flex gap-2">
                          {EVENT_TYPES.map(t => (
                            <button key={t.value} onClick={() => setFormData({...formData, eventType: t.value})}
                              className={cn(
                                "flex-1 p-3 rounded-xl border font-mono text-xs transition-all flex items-center justify-center gap-2",
                                formData.eventType === t.value ? "bg-primary border-primary text-black font-bold" : "bg-white/5 border-white/10 text-white/40 hover:border-white/20"
                              )}
                            >
                              <t.icon size={14} /> {t.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button onClick={() => setStep(2)} disabled={!formData.title} className="w-full h-12 bg-primary text-black font-bold rounded-2xl flex items-center justify-center gap-2">
                      Next <ChevronRight size={16} />
                    </Button>
                  </motion.div>
                )}

                {/* Step 2: Schedule & Location */}
                {step === 2 && (
                  <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <div className="text-xs font-mono text-primary uppercase tracking-widest">Step 2 — Schedule & Location</div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className={STYLES.label}>Start Date</label>
                          <Input type="datetime-local" className={STYLES.input} value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} />
                        </div>
                        <div>
                          <label className={STYLES.label}>End Date</label>
                          <Input type="datetime-local" className={STYLES.input} value={formData.endDate} onChange={(e) => setFormData({...formData, endDate: e.target.value})} />
                        </div>
                      </div>
                      <div>
                        <label className={STYLES.label}>Location (optional)</label>
                        <Input placeholder="e.g. Innovation Lab" className={STYLES.input} value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={() => setStep(1)} className="flex-1 h-12 border-white/10 text-white rounded-2xl">Back</Button>
                      <Button onClick={() => setStep(3)} disabled={!formData.startDate || !formData.endDate} className="flex-[2] h-12 bg-primary text-black font-bold rounded-2xl flex items-center justify-center gap-2">
                        Next <ChevronRight size={16} />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Details */}
                {step === 3 && (
                  <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <div className="text-xs font-mono text-primary uppercase tracking-widest">Step 3 — Event Details</div>
                    <div className="space-y-4">
                      <div>
                        <label className={STYLES.label}>Max Team Size (optional)</label>
                        <Input type="number" placeholder="e.g. 4" className={STYLES.input} value={formData.maxTeamSize} onChange={(e) => setFormData({...formData, maxTeamSize: e.target.value})} />
                      </div>
                      <div>
                        <label className={STYLES.label}>Prize Info (optional)</label>
                        <Input placeholder="e.g. $5,000 + Internship Track" className={STYLES.input} value={formData.prizeInfo} onChange={(e) => setFormData({...formData, prizeInfo: e.target.value})} />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={() => setStep(2)} className="flex-1 h-12 border-white/10 text-white rounded-2xl">Back</Button>
                      <Button onClick={() => setStep(4)} className="flex-[2] h-12 bg-primary text-black font-bold rounded-2xl flex items-center justify-center gap-2">
                        Review <ChevronRight size={16} />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Review & Publish */}
                {step === 4 && (
                  <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <div className="text-xs font-mono text-primary uppercase tracking-widest">Step 4 — Review & Publish</div>
                    <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] space-y-3">
                      <div className="flex justify-between"><span className="text-white/40 text-xs font-mono">Title</span><span className="text-white font-bold">{formData.title}</span></div>
                      <div className="flex justify-between"><span className="text-white/40 text-xs font-mono">Type</span><span className="text-white capitalize">{formData.eventType}</span></div>
                      <div className="flex justify-between"><span className="text-white/40 text-xs font-mono">Start</span><span className="text-white">{formData.startDate ? new Date(formData.startDate).toLocaleString() : "—"}</span></div>
                      <div className="flex justify-between"><span className="text-white/40 text-xs font-mono">End</span><span className="text-white">{formData.endDate ? new Date(formData.endDate).toLocaleString() : "—"}</span></div>
                      {formData.location && <div className="flex justify-between"><span className="text-white/40 text-xs font-mono">Location</span><span className="text-white">{formData.location}</span></div>}
                      {formData.maxTeamSize && <div className="flex justify-between"><span className="text-white/40 text-xs font-mono">Team Size</span><span className="text-white">{formData.maxTeamSize}</span></div>}
                      {formData.prizeInfo && <div className="flex justify-between"><span className="text-white/40 text-xs font-mono">Prizes</span><span className="text-primary font-bold">{formData.prizeInfo}</span></div>}
                      {formData.description && (
                        <div className="pt-2 border-t border-white/5">
                          <span className="text-white/40 text-xs font-mono block mb-1">Description</span>
                          <span className="text-white/60 text-sm">{formData.description}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={() => setStep(3)} className="flex-1 h-12 border-white/10 text-white rounded-2xl">Back</Button>
                      <Button onClick={handleCreate} disabled={submitting} className="flex-[2] h-12 bg-primary text-black font-bold rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,209,255,0.3)]">
                        {submitting ? "Publishing..." : "Publish Event"} <Check size={16} />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
