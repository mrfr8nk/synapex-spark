import { motion } from "framer-motion";
import { Hammer, BookOpen, ArrowRight } from "lucide-react";

const CurrentlyBuildingSection = () => (
  <section className="section-padding relative">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <p className="text-primary font-medium text-sm tracking-wider uppercase mb-2">Right Now</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold">
          Currently <span className="text-gradient">Building</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 glow-border"
        >
          <Hammer className="w-8 h-8 text-primary mb-4" />
          <h3 className="font-display font-bold text-lg mb-3">🔨 What I'm Building</h3>
          <ul className="space-y-2 text-muted-foreground text-sm">
            <li>• Synapex MVP platform</li>
            <li>• Advanced WhatsApp bot framework</li>
            <li>• Personal developer toolkit</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8"
        >
          <BookOpen className="w-8 h-8 text-accent mb-4" />
          <h3 className="font-display font-bold text-lg mb-3">📚 What I'm Learning</h3>
          <ul className="space-y-2 text-muted-foreground text-sm">
            <li>• Advanced system design patterns</li>
            <li>• DevOps & CI/CD pipelines</li>
            <li>• AI/ML integration in products</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8"
        >
          <ArrowRight className="w-8 h-8 text-primary mb-4" />
          <h3 className="font-display font-bold text-lg mb-3">🎯 What's Next</h3>
          <ul className="space-y-2 text-muted-foreground text-sm">
            <li>• Launch Synapex beta</li>
            <li>• Open-source my bot framework</li>
            <li>• Grow the developer community</li>
          </ul>
        </motion.div>
      </div>
    </div>
  </section>
);

export default CurrentlyBuildingSection;
