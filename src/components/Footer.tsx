import { Github, Twitter, Linkedin } from "lucide-react";
import dmLogo from "@/assets/dm-logo.png";

const Footer = () => (
  <footer className="border-t border-border/50 py-12 px-6 md:px-12">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-3">
        <img src={dmLogo} alt="DM" width={28} height={28} className="rounded-lg" loading="lazy" />
        <span className="font-display font-semibold text-foreground">
          Darrell Mucheri
        </span>
      </div>

      <p className="text-muted-foreground text-sm">
        © {new Date().getFullYear()} Darrell Mucheri. Building the future, one line at a time.
      </p>

      <div className="flex gap-4">
        {[
          { icon: Github, href: "#", label: "GitHub" },
          { icon: Twitter, href: "#", label: "Twitter" },
          { icon: Linkedin, href: "#", label: "LinkedIn" },
        ].map((s) => (
          <a
            key={s.label}
            href={s.href}
            aria-label={s.label}
            className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-colors"
          >
            <s.icon className="w-4 h-4" />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
