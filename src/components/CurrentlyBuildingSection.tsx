import { motion } from "framer-motion";
import { Hammer, BookOpen, ArrowRight } from "lucide-react";

const cards = [
  {
    icon: Hammer,
    title: "What I'm Building",
    color: "primary" as const,
    items: ["Synapex MVP platform", "Advanced WhatsApp bot framework", "Personal developer toolkit"],
    highlight: true,
  },
  {
    icon: BookOpen,
    title: "What I'm Learning",
    color: "accent" as const,
    items: ["Advanced system design patterns", "DevOps & CI/CD pipelines", "AI/ML integration in products"],
  },
  {
    icon: ArrowRight,
    title: "What's Next",
    color: "primary" as const,
    items: ["Launch Synapex beta", "Open-source my bot framework", "Grow the developer community"],
  },
];

const CurrentlyBuildingSection = () => (
  <section className="section-padding relative">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-3">Right Now</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold">
          Currently <span className="text-gradient">Building</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`glass-card p-7 hover-glow ${card.highlight ? "glow-border" : ""}`}
          >
            <div className={`w-10 h-10 rounded-xl ${card.color === 'accent' ? 'bg-accent/10' : 'bg-primary/10'} flex items-center justify-center mb-5`}>
              <card.icon className={`w-5 h-5 ${card.color === 'accent' ? 'text-accent' : 'text-primary'}`} />
            </div>
            <h3 className="font-display font-bold text-base mb-4">{card.title}</h3>
            <ul className="space-y-3">
              {card.items.map((item) => (
                <li key={item} className="text-muted-foreground text-sm flex items-center gap-2.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${card.color === 'accent' ? 'bg-accent/60' : 'bg-primary/60'}`} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CurrentlyBuildingSection;
