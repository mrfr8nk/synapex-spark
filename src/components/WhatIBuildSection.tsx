import { motion } from "framer-motion";
import { MessageSquare, GraduationCap, Zap } from "lucide-react";

const areas = [
  {
    icon: MessageSquare,
    title: "WhatsApp Bots",
    purpose: "Automate business communication, handle orders, support, and notifications through WhatsApp.",
    tech: ["Node.js", "WhatsApp Business API", "Baileys", "MongoDB"],
    impact: "Helping businesses serve customers 24/7 without hiring extra staff.",
  },
  {
    icon: GraduationCap,
    title: "School Systems",
    purpose: "Full school management: grading, attendance, timetables, parent portals, and admin dashboards.",
    tech: ["React", "TypeScript", "Supabase", "PostgreSQL"],
    impact: "Replacing paper-based systems with real-time, accessible digital platforms.",
  },
  {
    icon: Zap,
    title: "Automation Tools",
    purpose: "Custom workflow engines that connect APIs, schedule tasks, and eliminate repetitive work.",
    tech: ["Python", "FastAPI", "Redis", "Docker", "Cron"],
    impact: "Teams save 15+ hours per week by automating what used to be manual processes.",
  },
];

const WhatIBuildSection = () => (
  <section id="about" className="section-padding relative">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <p className="text-primary font-medium text-sm tracking-wider uppercase mb-2">Expertise</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold">
          What I <span className="text-gradient">Build</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {areas.map((area, i) => (
          <motion.div
            key={area.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="glass-card hover-glow p-8 group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
              <area.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display text-xl font-bold mb-3">{area.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">{area.purpose}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {area.tech.map((t) => (
                <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                  {t}
                </span>
              ))}
            </div>
            <p className="text-primary text-xs font-medium">💡 {area.impact}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhatIBuildSection;
