import { motion } from "framer-motion";
import synapexLogo from "@/assets/synapex-logo.png";
import { Rocket, Users, Code, Target } from "lucide-react";

const pillars = [
  { icon: Code, title: "Real Projects", desc: "Learn by building production-grade software, not tutorial apps." },
  { icon: Users, title: "Collaboration", desc: "Work in teams, do code reviews, and build together like real dev teams." },
  { icon: Target, title: "Problem Solving", desc: "Tackle real-world problems that businesses and communities face." },
  { icon: Rocket, title: "Career Growth", desc: "Build a portfolio that proves you can ship, not just follow along." },
];

const SynapexSection = () => (
  <section id="synapex" className="section-padding relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
    <div className="max-w-7xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <img src={synapexLogo} alt="Synapex" width={80} height={80} className="mx-auto mb-6" loading="lazy" />
        <p className="text-primary font-medium text-sm tracking-wider uppercase mb-2">My Startup</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
          <span className="text-gradient">Synapex</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Where junior developers evolve into real builders.
        </p>
      </motion.div>

      {/* Mission */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card glow-border p-8 md:p-12 mb-12 text-center max-w-3xl mx-auto"
      >
        <h3 className="font-display text-lg font-semibold text-primary mb-4">The Mission</h3>
        <p className="text-muted-foreground leading-relaxed">
          Synapex is a platform where tech-savvy juniors evolve into senior developers by building real projects, 
          collaborating, and solving real problems. No more tutorial hell — just real growth through real work.
        </p>
      </motion.div>

      {/* Pillars */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 text-center hover-glow group"
          >
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
              <p.icon className="w-6 h-6 text-accent" />
            </div>
            <h4 className="font-display font-semibold mb-2">{p.title}</h4>
            <p className="text-muted-foreground text-sm">{p.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 glass-card p-8 md:p-10"
      >
        <h3 className="font-display text-lg font-semibold mb-6">Current Progress</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { status: "✅ Done", items: ["Core concept validated", "MVP designed", "Community started"] },
            { status: "🔨 Building", items: ["Platform development", "Project matching engine", "Mentor network"] },
            { status: "🎯 Next", items: ["Beta launch", "First cohort of builders", "Partnership outreach"] },
          ].map((col) => (
            <div key={col.status}>
              <p className="font-semibold text-sm mb-3">{col.status}</p>
              <ul className="space-y-2">
                {col.items.map((item) => (
                  <li key={item} className="text-muted-foreground text-sm">• {item}</li>
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
