import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import profileHero from "@/assets/profile-hero.jpg";

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
};

const taglines = [
  "Full Stack Developer",
  "WhatsApp Bot Builder",
  "Startup Founder",
  "System Architect",
];

const HeroSection = () => {
  const [tagIndex, setTagIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const target = taglines[tagIndex];
    if (typing) {
      if (displayed.length < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 2000);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
        return () => clearTimeout(t);
      } else {
        setTagIndex((i) => (i + 1) % taglines.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, tagIndex]);

  return (
    <section className="relative min-h-screen flex items-center section-padding pt-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-muted-foreground text-sm font-medium mb-4 tracking-wider uppercase">
            {getGreeting()} — Welcome to my world
          </p>

          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-4">
            I'm <span className="text-gradient">Darrell</span>
            <br />
            Mucheri
          </h1>

          <div className="h-8 mb-6">
            <span className="font-display text-xl md:text-2xl text-primary">
              {displayed}
              <span className="animate-pulse">|</span>
            </span>
          </div>

          <p className="text-muted-foreground text-lg max-w-xl mb-8 leading-relaxed">
            Started coding at 13. Now building systems, tools, and a developer ecosystem.
            I turn ideas into real-world software that solves real problems.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold hover-glow hover:scale-105 transition-transform"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-2xl border border-border text-foreground font-semibold hover:border-primary/50 hover-glow transition-all"
            >
              Contact Me
            </a>
            <a
              href="#"
              className="px-6 py-3 rounded-2xl bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 transition-colors"
            >
              Download CV
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-12">
            {[
              { value: "5+", label: "Years Coding" },
              { value: "10+", label: "Projects Built" },
              { value: "1", label: "Startup Founded" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display text-2xl font-bold text-primary">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — Profile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative flex justify-center"
        >
          <div className="relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-primary/40 via-accent/20 to-primary/40 blur-xl animate-glow-pulse" />
            <img
              src={profileHero}
              alt="Darrell Mucheri"
              width={800}
              height={800}
              className="relative rounded-3xl w-80 h-80 md:w-[420px] md:h-[420px] object-cover border-2 border-border/50"
            />
          </div>

          {/* Floating badges */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -right-4 glass-card px-4 py-2 glow-border"
          >
            <span className="text-sm font-medium text-primary">🚀 Building Synapex</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-4 -left-4 glass-card px-4 py-2 glow-border"
          >
            <span className="text-sm font-medium text-accent">⚡ Open to Collaborate</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
