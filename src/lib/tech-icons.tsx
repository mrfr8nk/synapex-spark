// Maps tech names to simple-icons CDN slugs for colorful brand icons
const techSlugs: Record<string, string> = {
  javascript: "javascript",
  typescript: "typescript",
  react: "react",
  "react native": "react",
  nextjs: "nextdotjs",
  "next.js": "nextdotjs",
  node: "nodedotjs",
  "node.js": "nodedotjs",
  nodejs: "nodedotjs",
  python: "python",
  django: "django",
  flask: "flask",
  fastapi: "fastapi",
  go: "go",
  rust: "rust",
  java: "openjdk",
  kotlin: "kotlin",
  swift: "swift",
  php: "php",
  ruby: "ruby",
  rails: "rubyonrails",
  html: "html5",
  css: "css3",
  tailwind: "tailwindcss",
  tailwindcss: "tailwindcss",
  sass: "sass",
  vue: "vuedotjs",
  angular: "angular",
  svelte: "svelte",
  vite: "vite",
  webpack: "webpack",
  postgres: "postgresql",
  postgresql: "postgresql",
  mysql: "mysql",
  mongodb: "mongodb",
  redis: "redis",
  sqlite: "sqlite",
  supabase: "supabase",
  firebase: "firebase",
  prisma: "prisma",
  graphql: "graphql",
  docker: "docker",
  kubernetes: "kubernetes",
  aws: "amazonwebservices",
  gcp: "googlecloud",
  azure: "microsoftazure",
  vercel: "vercel",
  netlify: "netlify",
  cloudflare: "cloudflare",
  git: "git",
  github: "github",
  gitlab: "gitlab",
  linux: "linux",
  ubuntu: "ubuntu",
  bash: "gnubash",
  nginx: "nginx",
  whatsapp: "whatsapp",
  telegram: "telegram",
  twilio: "twilio",
  stripe: "stripe",
  openai: "openai",
  framer: "framer",
  figma: "figma",
  expo: "expo",
  flutter: "flutter",
  dart: "dart",
  redux: "redux",
  jest: "jest",
  vitest: "vitest",
};

export const TechIcon = ({ name, className = "w-3.5 h-3.5" }: { name: string; className?: string }) => {
  const slug = techSlugs[name.toLowerCase().trim()];
  if (!slug) return null;
  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}`}
      alt={name}
      className={className}
      loading="lazy"
      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
    />
  );
};
