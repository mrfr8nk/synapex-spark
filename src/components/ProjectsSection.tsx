import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink, ChevronRight } from "lucide-react";

const projects = [
  {
    title: "WhatsApp Automation Bot",
    description: "A powerful WhatsApp bot that automates customer interactions, handles orders, and provides 24/7 support for businesses.",
    impact: "Reduced response time by 90% for client businesses",
    tech: ["Node.js", "WhatsApp API", "MongoDB", "Express"],
    image: "🤖",
    color: "from-primary/20 to-primary/5",
    caseStudy: {
      problem: "Small businesses couldn't afford 24/7 customer support, losing potential sales and customer satisfaction.",
      thought: "I realized WhatsApp was already the primary communication tool in many markets. Building on top of it would eliminate adoption friction.",
      techReason: "Node.js for its event-driven architecture perfect for real-time messaging. MongoDB for flexible message storage schemas.",
      challenges: "Handling message queuing during high traffic, managing session states across conversations.",
      solution: "Built a stateful conversation engine with queue management and auto-scaling message handlers.",
      result: "Deployed for 3 businesses, handling 500+ conversations daily with 90% reduction in response time.",
    },
  },
  {
    title: "School Management System",
    description: "End-to-end school management platform with student tracking, grading, attendance, and parent communication portals.",
    impact: "Used by a real school to manage 200+ students",
    tech: ["React", "TypeScript", "Supabase", "Tailwind CSS"],
    image: "🏫",
    color: "from-accent/20 to-accent/5",
    caseStudy: {
      problem: "A local school was using paper-based systems, causing delays and errors in grade reporting and attendance tracking.",
      thought: "Digital transformation shouldn't require expensive enterprise software. I could build something tailored and affordable.",
      techReason: "React + TypeScript for type-safe, maintainable frontend. Supabase for real-time database with built-in auth — perfect for multi-role access.",
      challenges: "Complex role-based permissions (admin, teacher, parent, student), real-time grade updates, offline capability for poor connectivity.",
      solution: "Implemented granular RLS policies, real-time subscriptions for live updates, and progressive web app features.",
      result: "Currently managing 200+ students, reduced administrative work by 60%, parents access grades in real-time.",
    },
  },
  {
    title: "Workflow Automation Engine",
    description: "Custom automation tool that connects APIs, schedules tasks, and streamlines repetitive workflows for small teams.",
    impact: "Saved 15+ hours per week in manual tasks",
    tech: ["Python", "FastAPI", "Redis", "Docker"],
    image: "⚙️",
    color: "from-primary/15 to-accent/10",
    caseStudy: {
      problem: "Teams were spending hours on repetitive tasks: data entry, report generation, email notifications, file organization.",
      thought: "Instead of building one-off scripts, I wanted a reusable engine where anyone could define automation workflows.",
      techReason: "Python for its rich automation library ecosystem. FastAPI for high-performance async API. Redis for job queuing and scheduling.",
      challenges: "Error handling across chained API calls, managing rate limits, providing clear logs for non-technical users.",
      solution: "Built a visual workflow builder with retry logic, rate limit awareness, and detailed execution logs.",
      result: "3 teams using it actively, saving 15+ hours per week combined. 99.2% task completion rate.",
    },
  },
];

const ProjectsSection = () => {
  const [openCase, setOpenCase] = useState<number | null>(null);

  return (
    <section id="projects" className="section-padding relative">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-primary font-medium text-sm tracking-wider uppercase mb-2">Portfolio</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl">
            Real systems built to solve real problems — not tutorial clones.
          </p>
        </motion.div>

        <div className="grid gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={`glass-card hover-glow p-8 md:p-10 bg-gradient-to-br ${p.color}`}>
                <div className="grid md:grid-cols-[1fr_auto] gap-6 items-start">
                  <div>
                    <div className="text-4xl mb-4">{p.image}</div>
                    <h3 className="font-display text-2xl font-bold mb-3">{p.title}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{p.description}</p>
                    <p className="text-primary text-sm font-semibold mb-4">📊 {p.impact}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {p.tech.map((t) => (
                        <span key={t} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => setOpenCase(openCase === i ? null : i)}
                      className="flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      {openCase === i ? "Close" : "View Case Study"}
                      <ChevronRight className={`w-4 h-4 transition-transform ${openCase === i ? "rotate-90" : ""}`} />
                    </button>
                  </div>
                  <ExternalLink className="w-5 h-5 text-muted-foreground hidden md:block" />
                </div>

                {/* Case Study */}
                {openCase === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-8 pt-8 border-t border-border/50 grid md:grid-cols-2 gap-6"
                  >
                    {[
                      { title: "🎯 Problem", content: p.caseStudy.problem },
                      { title: "💭 Thought Process", content: p.caseStudy.thought },
                      { title: "🔧 Tech Choices", content: p.caseStudy.techReason },
                      { title: "⚡ Challenges", content: p.caseStudy.challenges },
                      { title: "✅ Solution", content: p.caseStudy.solution },
                      { title: "📈 Result", content: p.caseStudy.result },
                    ].map((item) => (
                      <div key={item.title}>
                        <h4 className="font-display font-semibold text-sm mb-2">{item.title}</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.content}</p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
