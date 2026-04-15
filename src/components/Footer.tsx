import { Github, Twitter, Linkedin, ArrowUpRight } from "lucide-react";

const footerLinks = [
  {
    title: "Navigate",
    links: [
      { label: "About", href: "#about" },
      { label: "Projects", href: "#projects" },
      { label: "Journey", href: "#journey" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Projects",
    links: [
      { label: "WhatsApp Bot", href: "#projects" },
      { label: "School System", href: "#projects" },
      { label: "Automation Engine", href: "#projects" },
    ],
  },
  {
    title: "Startup",
    links: [
      { label: "Synapex", href: "#synapex" },
      { label: "Mission", href: "#synapex" },
      { label: "Progress", href: "#synapex" },
    ],
  },
];

const socials = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "X" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

const Footer = () => (
  <footer className="border-t border-border">
    <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <p className="font-mono font-bold text-sm mb-3">
            d.m<span className="text-muted-foreground">/</span>
          </p>
          <p className="text-muted-foreground text-xs leading-relaxed max-w-[200px]">
            Building the future, one commit at a time.
          </p>
        </div>

        {/* Link columns */}
        {footerLinks.map((col) => (
          <div key={col.title}>
            <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-4">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
        <p className="text-muted-foreground text-xs">
          © {new Date().getFullYear()} Darrell Mucheri
        </p>

        <div className="flex gap-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="w-8 h-8 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors"
            >
              <s.icon className="w-3.5 h-3.5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
