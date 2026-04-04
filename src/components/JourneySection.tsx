import { motion } from "framer-motion";
import { Sparkles, Code, Bot, Layers, Server, Rocket } from "lucide-react";

const milestones = [
  {
    year: "2019",
    title: "The Spark",
    desc: "Started coding at 13, driven by curiosity. Built my first HTML page and fell in love with creating things from nothing.",
    icon: Sparkles,
    highlight: true,
  },
  {
    year: "2020",
    title: "Learning the Ropes",
    desc: "Dove into JavaScript, Python, and web development. Spent countless hours building small projects and learning through doing.",
    icon: Code,
  },
  {
    year: "2021",
    title: "First Real Project",
    desc: "Built my first WhatsApp bot for a local business. Realized I could build systems that actually help people.",
    icon: Bot,
  },
  {
    year: "2022",
    title: "Going Deeper",
    desc: "Learned React, TypeScript, and backend development. Started building full-stack applications with real databases.",
    icon: Layers,
  },
  {
    year: "2023",
    title: "Real-World Impact",
    desc: "Deployed a school management system used by real students and teachers. Built automation tools saving teams hours weekly.",
    icon: Server,
  },
  {
    year: "2024",
    title: "The Vision",
    desc: "Founded Synapex — a platform to help junior devs grow by building real projects. Started thinking like a founder, not just a coder.",
    icon: Rocket,
    highlight: true,
  },
];

const JourneySection = () => (
  <section id="journey" className="section-padding relative">
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-3">My Story</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
          The <span className="text-gradient">Journey</span>
        </h2>
        <p className="text-muted-foreground max-w-lg">
          From a curious 13-year-old to building real systems and founding a startup.
        </p>
      </motion.div>

      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-border to-border" />

        <div className="space-y-6">
          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative pl-14"
            >
              <div
                className={`absolute left-2 top-4 w-7 h-7 rounded-lg flex items-center justify-center ${
                  m.highlight
                    ? "bg-primary/20 border border-primary/40"
                    : "bg-secondary border border-border"
                }`}
              >
                <m.icon className={`w-3.5 h-3.5 ${m.highlight ? "text-primary" : "text-muted-foreground"}`} />
              </div>

              <div className={`glass-card p-5 ${m.highlight ? "glow-border" : ""}`}>
                <span className="text-xs font-bold text-primary tracking-wide">{m.year}</span>
                <h3 className="font-display font-bold mt-1 mb-1.5">{m.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default JourneySection;
