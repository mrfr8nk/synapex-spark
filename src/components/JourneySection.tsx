import { motion } from "framer-motion";
import { Sparkles, Code, Bot, Layers, Server, Rocket } from "lucide-react";

const milestones = [
  { year: "2019", title: "First Line of Code", desc: "Started programming at 13 — curiosity turned into obsession.", icon: Code, highlight: true },
  { year: "2020", title: "First Real Project", desc: "Built a basic school management tool. Learned the hard way that real users break everything.", icon: Layers },
  { year: "2021", title: "WhatsApp Bots", desc: "Discovered automation. Built bots that handled orders and support for small businesses.", icon: Bot },
  { year: "2022", title: "Full Stack Systems", desc: "Moved into React, TypeScript, and databases. Started building production-grade systems.", icon: Server },
  { year: "2023", title: "Founded Synapex", desc: "Decided to build a platform where junior devs grow through real projects.", icon: Rocket, highlight: true },
  { year: "2024", title: "Scaling Up", desc: "Expanding Synapex, shipping more tools, and pushing deeper into system architecture.", icon: Sparkles },
];

const JourneySection = () => (
  <section id="journey" className="section-padding">
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-3">// journey</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">The Timeline</h2>
        <div className="w-12 h-px bg-foreground/20" />
      </motion.div>

      <div className="relative">
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border" />

        <div className="space-y-8">
          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex gap-6 relative"
            >
              <div className={`w-10 h-10 rounded-md shrink-0 flex items-center justify-center z-10 ${
                m.highlight ? "bg-foreground text-background" : "bg-secondary text-muted-foreground"
              }`}>
                <m.icon className="w-4 h-4" />
              </div>
              <div className="pt-1.5">
                <span className="font-mono text-xs text-muted-foreground">{m.year}</span>
                <h3 className={`font-bold text-sm mt-0.5 mb-1 ${m.highlight ? "text-foreground" : "text-foreground/80"}`}>{m.title}</h3>
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
