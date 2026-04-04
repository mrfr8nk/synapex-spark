import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, FileText, Mail, ChevronRight } from "lucide-react";

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
    <section className="relative min-h-screen flex items-center section-padding pt-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/6 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-sm font-medium mb-6 tracking-wide"
          >
            {getGreeting()} — welcome to my corner of the internet
          </motion.p>

          <h1 className="font-display text-5xl sm:text-6xl md:text-8xl font-bold leading-[1.05] mb-6 tracking-tight">
            I'm{" "}
            <span className="text-gradient">Darrell</span>
            <br />
            Mucheri<span className="text-primary">.</span>
          </h1>

          <div className="h-9 mb-8 flex items-center justify-center">
            <span className="font-display text-xl md:text-2xl text-muted-foreground font-medium">
              {displayed}
              <span className="text-primary animate-pulse ml-0.5">|</span>
            </span>
          </div>

          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Started coding at 13. Now building systems, tools, and a
            developer ecosystem that solves real problems.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all"
            >
              View Projects
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-border text-foreground font-semibold text-sm hover:border-primary/40 hover:bg-primary/5 transition-all"
            >
              <Mail className="w-4 h-4" />
              Contact Me
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-secondary text-secondary-foreground font-semibold text-sm hover:bg-secondary/80 transition-all"
            >
              <FileText className="w-4 h-4" />
              Download CV
            </a>
          </div>

          {/* Stats bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-8 md:gap-12 px-8 py-5 rounded-2xl bg-card/60 backdrop-blur border border-border/50"
          >
            {[
              { value: "5+", label: "Years Coding" },
              { value: "10+", label: "Projects Shipped" },
              { value: "1", label: "Startup Founded" },
            ].map((s, i) => (
              <div key={s.label} className="flex items-center gap-4">
                {i > 0 && <div className="w-px h-8 bg-border hidden md:block" />}
                <div className="text-center">
                  <p className="font-display text-2xl font-bold text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
