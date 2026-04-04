import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/50 py-10 px-6 md:px-12">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <span className="font-display font-bold text-foreground tracking-tight">
        D<span className="text-primary">.</span>M
      </span>

      <p className="text-muted-foreground text-xs">
        © {new Date().getFullYear()} Darrell Mucheri. Building the future, one commit at a time.
      </p>

      <div className="flex gap-3">
        {[
          { icon: Github, href: "#", label: "GitHub" },
          { icon: Twitter, href: "#", label: "Twitter" },
          { icon: Linkedin, href: "#", label: "LinkedIn" },
        ].map((s) => (
          <a
            key={s.label}
            href={s.href}
            aria-label={s.label}
            className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
          >
            <s.icon className="w-4 h-4" />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
