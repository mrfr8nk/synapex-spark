import { motion } from "framer-motion";
import { Rocket, Users, Code, Target, CheckCircle2, Hammer, Crosshair } from "lucide-react";

const pillars = [
  { icon: Code, title: "Real Projects", desc: "Learn by building production-grade software, not tutorial apps." },
  { icon: Users, title: "Collaboration", desc: "Work in teams, do code reviews, and build together like real dev teams." },
  { icon: Target, title: "Problem Solving", desc: "Tackle real-world problems that businesses and communities face." },
  { icon: Rocket, title: "Career Growth", desc: "Build a portfolio that proves you can ship, not just follow along." },
];

const progress = [
  { icon: CheckCircle2, status: "Done", items: ["Core concept validated", "MVP designed", "Community started"], color: "text-green-400" },
  { icon: Hammer, status: "Building", items: ["Platform development", "Project matching engine", "Mentor network"], color: "text-accent" },
  { icon: Crosshair, status: "Next", items: ["Beta launch", "First cohort of builders", "Partnership outreach"], color: "text-primary" },
];

const SynapexSection = () => (
  <section id="synapex" className="section-padding relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/3 to-transparent" />
    <div className="max-w-6xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6">
          <Rocket className="w-3.5 h-3.5 text-accent" />
          <span className="text-accent text-xs font-semibold tracking-wide uppercase">My Startup</span>
        </div>
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-4 tracking-tight">
          <span className="text-gradient">Synapex</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-xl mx-auto">
          Where junior developers evolve into real builders.
        </p>
      </motion.div>

      {/* Mission */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card glow-border p-8 md:p-12 mb-12 max-w-3xl mx-auto"
      >
        <h3 className="font-display text-base font-semibold text-primary mb-4 tracking-wide uppercase">The Mission</h3>
        <p className="text-muted-foreground leading-relaxed text-lg">
          Synapex is a platform where tech-savvy juniors evolve into senior developers by building real projects, 
          collaborating, and solving real problems. No more tutorial hell — just real growth through real work.
        </p>
      </motion.div>

      {/* Pillars */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass-card p-6 hover-glow group"
          >
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
              <p.icon className="w-5 h-5 text-accent" />
            </div>
            <h4 className="font-display font-bold text-sm mb-1.5">{p.title}</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card p-7 md:p-10"
      >
        <h3 className="font-display font-bold text-base mb-8 tracking-wide uppercase text-muted-foreground">Current Progress</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {progress.map((col) => (
            <div key={col.status}>
              <div className="flex items-center gap-2 mb-4">
                <col.icon className={`w-4 h-4 ${col.color}`} />
                <span className={`font-display font-bold text-sm ${col.color}`}>{col.status}</span>
              </div>
              <ul className="space-y-2.5">
                {col.items.map((item) => (
                  <li key={item} className="text-muted-foreground text-sm flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default SynapexSection;
