import { motion } from "framer-motion";
import { MessageSquare, GraduationCap, Cog, Lightbulb, ArrowUpRight } from "lucide-react";

const areas = [
  {
    icon: MessageSquare,
    title: "WhatsApp Bots",
    purpose: "Automate business communication, handle orders, support, and notifications through WhatsApp.",
    tech: ["Node.js", "WhatsApp Business API", "Baileys", "MongoDB"],
    impact: "Helping businesses serve customers 24/7 without hiring extra staff.",
    color: "primary" as const,
  },
  {
    icon: GraduationCap,
    title: "School Systems",
    purpose: "Full school management: grading, attendance, timetables, parent portals, and admin dashboards.",
    tech: ["React", "TypeScript", "Supabase", "PostgreSQL"],
    impact: "Replacing paper-based systems with real-time, accessible digital platforms.",
    color: "accent" as const,
  },
  {
    icon: Cog,
    title: "Automation Tools",
    purpose: "Custom workflow engines that connect APIs, schedule tasks, and eliminate repetitive work.",
    tech: ["Python", "FastAPI", "Redis", "Docker", "Cron"],
    impact: "Teams save 15+ hours per week by automating what used to be manual processes.",
    color: "primary" as const,
  },
];

const WhatIBuildSection = () => (
  <section id="about" className="section-padding relative">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-3">Expertise</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
          What I <span className="text-gradient">Build</span>
        </h2>
        <p className="text-muted-foreground max-w-lg">
          Real systems for real problems — not tutorial clones.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {areas.map((area, i) => (
          <motion.div
            key={area.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="group glass-card p-7 hover-glow relative overflow-hidden"
          >
            {/* Subtle top accent line */}
            <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${area.color === 'accent' ? 'from-transparent via-accent to-transparent' : 'from-transparent via-primary to-transparent'} opacity-50`} />
            
            <div className={`w-11 h-11 rounded-xl ${area.color === 'accent' ? 'bg-accent/10' : 'bg-primary/10'} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
              <area.icon className={`w-5 h-5 ${area.color === 'accent' ? 'text-accent' : 'text-primary'}`} />
            </div>
            
            <h3 className="font-display text-lg font-bold mb-2">{area.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5">{area.purpose}</p>
            
            <div className="flex flex-wrap gap-1.5 mb-5">
              {area.tech.map((t) => (
                <span key={t} className="badge badge-primary">{t}</span>
              ))}
            </div>
            
            <div className="flex items-start gap-2 pt-4 border-t border-border/50">
              <Lightbulb className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
              <p className="text-accent text-xs font-medium leading-relaxed">{area.impact}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhatIBuildSection;
