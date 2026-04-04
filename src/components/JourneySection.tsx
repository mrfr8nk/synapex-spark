import { motion } from "framer-motion";

const milestones = [
  {
    year: "2019",
    title: "The Spark",
    desc: "Started coding at 13, driven by curiosity. Built my first HTML page and fell in love with creating things from nothing.",
    highlight: true,
  },
  {
    year: "2020",
    title: "Learning the Ropes",
    desc: "Dove into JavaScript, Python, and web development. Spent countless hours building small projects and learning through doing.",
  },
  {
    year: "2021",
    title: "First Real Project",
    desc: "Built my first WhatsApp bot for a local business. Realized I could build systems that actually help people.",
  },
  {
    year: "2022",
    title: "Going Deeper",
    desc: "Learned React, TypeScript, and backend development. Started building full-stack applications with real databases.",
  },
  {
    year: "2023",
    title: "Real-World Impact",
    desc: "Deployed a school management system used by real students and teachers. Built automation tools saving teams hours weekly.",
  },
  {
    year: "2024",
    title: "The Vision",
    desc: "Founded Synapex — a platform to help junior devs grow by building real projects. Started thinking like a founder, not just a coder.",
    highlight: true,
  },
];

const JourneySection = () => (
  <section id="journey" className="section-padding relative">
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <p className="text-primary font-medium text-sm tracking-wider uppercase mb-2">My Story</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold">
          The <span className="text-gradient">Journey</span>
        </h2>
        <p className="text-muted-foreground mt-4 max-w-xl">
          From a curious 13-year-old to building real systems and founding a startup.
        </p>
      </motion.div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border" />

        <div className="space-y-8">
          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-12"
            >
              {/* Dot */}
              <div
                className={`absolute left-3 top-1.5 w-3 h-3 rounded-full border-2 ${
                  m.highlight
                    ? "bg-primary border-primary shadow-lg shadow-primary/50"
                    : "bg-background border-border"
                }`}
              />

              <div className={`glass-card p-6 ${m.highlight ? "glow-border" : ""}`}>
                <span className="text-xs font-semibold text-primary">{m.year}</span>
                <h3 className="font-display font-bold text-lg mt-1 mb-2">{m.title}</h3>
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
