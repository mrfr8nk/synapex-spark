import { motion } from "framer-motion";
import { Hammer, BookOpen, ArrowRight } from "lucide-react";

const cards = [
  {
    icon: Hammer,
    title: "Building",
    items: ["Synapex collaboration tools", "New WhatsApp bot features", "Portfolio v2 with admin dashboard"],
  },
  {
    icon: BookOpen,
    title: "Learning",
    items: ["System design patterns", "DevOps & CI/CD pipelines", "Advanced TypeScript"],
  },
  {
    icon: ArrowRight,
    title: "Next",
    items: ["Launch Synapex publicly", "Open-source a WhatsApp bot framework", "Start technical writing"],
  },
];

const CurrentlyBuildingSection = () => (
  <section className="section-padding">
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-3">// now</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Currently</h2>
        <div className="w-12 h-px bg-foreground/20" />
      </motion.div>

      <div className="grid md:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bg-background p-8"
          >
            <card.icon className="w-4 h-4 text-muted-foreground mb-4" />
            <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-4">{card.title}</h3>
            <ul className="space-y-2.5">
              {card.items.map((item) => (
                <li key={item} className="text-sm text-foreground/80 flex items-start gap-2">
                  <span className="text-muted-foreground mt-1.5 text-[6px]">●</span>
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
