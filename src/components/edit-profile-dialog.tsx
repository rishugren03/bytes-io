"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/lib/actions/profile";
import { Edit2, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EditProfileDialog({
  profile
}: {
  profile: {
    bio: string | null;
    techStack: string[];
    fullName: string | null;
  }
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [formData, setFormData] = useState({
    fullName: profile.fullName || "",
    bio: profile.bio || "",
    techStack: profile.techStack || [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await updateProfile({
      fullName: formData.fullName,
      bio: formData.bio,
      techStack: formData.techStack,
    });

    setIsLoading(false);
    if (result.success) {
      setIsOpen(false);
      router.refresh();
    } else {
      alert("Failed to update profile");
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="w-full mt-2 rounded-2xl bg-white/5 border-white/10 hover:bg-white/10 gap-2 cursor-pointer"
      >
        <Edit2 size={16} /> Edit Profile
      </Button>

      {mounted && isOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-950 border border-white/10 rounded-3xl p-6 w-full max-w-lg shadow-2xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/20" />
            
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white tracking-tight">Edit Profile</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-white/60">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 font-mono text-sm transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-white/60">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 font-mono text-sm transition-colors min-h-[100px] resize-y"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-white/60">Tech Stack</label>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(["Next.js", "Rust", "Python", "Go", "Solana", "AI/ML", ...formData.techStack])).map(tech => (
                      <button
                        type="button"
                        key={tech}
                        onClick={() => {
                          const exists = formData.techStack.includes(tech);
                          setFormData({
                            ...formData,
                            techStack: exists ? formData.techStack.filter((t: string) => t !== tech) : [...formData.techStack, tech]
                          })
                        }}
                        className={`px-4 py-2 rounded-xl border font-mono text-xs transition-all cursor-pointer ${formData.techStack.includes(tech)
                            ? "bg-primary border-primary text-black font-bold"
                            : "bg-white/5 border-white/10 text-white/40 hover:border-white/20 hover:text-white"
                          }`}
                      >
                        {tech}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="customTechInput"
                      className="flex-1 px-4 py-2 border border-white/10 rounded-xl bg-white/5 text-white/80 font-mono text-xs placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="Add custom tech..."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const input = e.currentTarget;
                          const tech = input.value.trim();
                          if (tech && !formData.techStack.includes(tech)) {
                            setFormData({
                              ...formData,
                              techStack: [...formData.techStack, tech]
                            });
                            input.value = '';
                          }
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="px-4 py-2 border border-white/10 rounded-xl bg-white/5 text-white/80 font-mono text-xs hover:text-white hover:bg-white/10 cursor-pointer"
                      onClick={() => {
                        const input = document.getElementById('customTechInput') as HTMLInputElement;
                        const tech = input?.value.trim();
                        if (tech && !formData.techStack.includes(tech)) {
                          setFormData({
                            ...formData,
                            techStack: [...formData.techStack, tech]
                          });
                          input.value = '';
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 rounded-xl bg-transparent border-white/10 hover:bg-white/5 hover:text-white cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 rounded-xl bg-primary text-black hover:bg-primary/90 cursor-pointer"
                >
                  {isLoading ? <Loader2 size={16} className="animate-spin" /> : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
