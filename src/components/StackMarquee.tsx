const stack = [
  "React", "TypeScript", "Node.js", "Python", "Supabase", "PostgreSQL",
  "MongoDB", "Docker", "FastAPI", "Redis", "Tailwind CSS", "Next.js",
  "WhatsApp API", "Express", "Git", "Linux", "Framer Motion", "Figma",
];

const StackMarquee = () => (
  <section className="py-10 border-y border-border overflow-hidden">
    <div className="relative">
      <div className="marquee whitespace-nowrap">
        {[...stack, ...stack].map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center mx-4 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors cursor-default"
          >
            <span className="text-foreground/20 mr-3">/</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default StackMarquee;
