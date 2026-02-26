import React from "react";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { Navbar } from "@/components/navbar";
import { Github, Globe, Terminal, Zap, Code2, Rocket, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function ProfilePage({ params }: { params: { username: string } }) {
  const { username } = await params;

  const profile = await prisma.profile.findUnique({
    where: { username },
    include: {
      projects: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!profile) {
    notFound();
  }

  const avatar = profile.avatarUrl || `https://api.dicebear.com/9.x/adventurer/svg?seed=${profile.username}`;

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto space-y-12">
      <Navbar />
      
      {/* Profile Header */}
      <section className="relative overflow-hidden p-8 md:p-12 rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-3xl">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
        
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left relative z-10">
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden border-2 border-primary/20 bg-zinc-900 shadow-2xl">
              <img src={avatar} alt={profile.fullName || profile.username!} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-primary text-black px-4 py-1.5 rounded-full text-xs font-bold font-mono shadow-lg">
              LVL {Math.floor(profile.powerScore / 100)}
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                {profile.fullName || profile.username}
              </h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <div className="flex items-center gap-2 text-primary font-mono text-sm bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                  <Github size={14} />
                  @{profile.username}
                </div>
                {profile.website && (
                  <a href={profile.website} target="_blank" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-mono">
                    <Globe size={14} />
                    {profile.website.replace('https://', '')}
                  </a>
                )}
              </div>
            </div>

            <p className="text-white/60 font-mono text-sm md:text-base max-w-2xl leading-relaxed">
              {profile.bio || "Hardware enthusiast & Software wizard. Building the next generation of decentralized infrastructure at Bytes.io."}
            </p>

            <div className="flex flex-wrap gap-2">
              {profile.techStack.map((tech) => (
                <Badge key={tech} variant="outline" className="bg-white/5 border-white/10 text-white/60 font-mono text-[10px] uppercase tracking-widest px-3">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full md:w-auto">
             <div className="p-6 rounded-3xl border border-white/5 bg-white/[0.03] text-center space-y-1 min-w-[160px]">
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-mono">Power Score</div>
                <div className="text-3xl font-black text-primary flex items-center justify-center gap-2">
                   <Zap className="fill-current" size={24} />
                   {profile.powerScore}
                </div>
             </div>
             <Button className="w-full bg-white text-black font-bold h-12 rounded-2xl">
                Coordinate Session
             </Button>
          </div>
        </div>
      </section>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Stats & Meta */}
        <div className="space-y-8">
          <div className="p-6 rounded-3xl border border-white/5 bg-white/[0.02] space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">
               <Terminal size={14} />
               Terminal Stats
            </h3>
            <div className="space-y-4">
               {[
                 { label: "Commit Velocity", value: "89%", icon: Activity },
                 { label: "LeetCode Rank", value: `#${Math.floor(Math.random() * 5000) + 1}`, icon: Code2 },
                 { label: "Deploy Count", value: profile.projects.length, icon: Rocket }
               ].map((stat, i) => (
                 <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3 text-white/60 text-xs font-mono">
                       <stat.icon size={14} className="text-primary" />
                       {stat.label}
                    </div>
                    <div className="text-white font-bold font-mono">{stat.value}</div>
                 </div>
               ))}
            </div>
          </div>

          <div className="p-6 rounded-3xl border border-white/5 bg-gradient-to-br from-primary/10 to-transparent">
             <h3 className="text-sm font-bold text-white mb-2">Seasonal Contender</h3>
             <p className="text-white/40 text-xs leading-relaxed mb-4">
               Ranked top 5% in Season 4 Engineering Sprint. 
               Eligible for Project Lead roles.
             </p>
             <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-4/5" />
             </div>
          </div>
        </div>

        {/* Right Column: Projects Showcase */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white tracking-tight">Active Deployments</h2>
            <Badge variant="outline" className="border-primary/20 text-primary">{profile.projects.length} Total</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.projects.map((project) => (
              <div key={project.id} className="p-6 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group">
                <div className="flex items-start justify-between mb-4">
                   <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                      <Code2 size={20} />
                   </div>
                   <div className="flex gap-2">
                      {project.repoUrl && (
                        <a href={project.repoUrl} target="_blank" className="p-2 rounded-xl border border-white/10 text-white/40 hover:text-white hover:border-white/20">
                           <Github size={16} />
                        </a>
                      )}
                      {project.demoUrl && (
                        <a href={project.demoUrl} target="_blank" className="p-2 rounded-xl border border-white/10 text-white/40 hover:text-white hover:border-white/20">
                           <ExternalLink size={16} />
                        </a>
                      )}
                   </div>
                </div>
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-white/40 text-sm line-clamp-2 mb-4 font-mono">
                  {project.description || "Deploying automated document verification systems with end-to-end encryption."}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-widest text-primary font-mono">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
            
            {profile.projects.length === 0 && (
              <div className="col-span-full py-20 text-center border border-dashed border-white/5 rounded-3xl">
                <p className="text-white/20 font-mono italic text-sm">No active deployments found for this operator.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

const Activity = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);
