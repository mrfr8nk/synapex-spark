import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Bot, School, Workflow, ChevronDown, Target, Brain, Wrench, Zap, CheckCircle2, TrendingUp, ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "WhatsApp Automation Bot",
    description: "A powerful WhatsApp bot that automates customer interactions, handles orders, and provides 24/7 support for businesses.",
    impact: "Reduced response time by 90% for client businesses",
    tech: ["Node.js", "WhatsApp API", "MongoDB", "Express"],
    icon: Bot,
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
    icon: School,
    caseStudy: {
      problem: "A local school was using paper-based systems, causing delays and errors in grade reporting and attendance tracking.",
      thought: "Digital transformation shouldn't require expensive enterprise software. I could build something tailored and affordable.",
      techReason: "React + TypeScript for type-safe, maintainable frontend. Supabase for real-time database with built-in auth.",
      challenges: "Complex role-based permissions, real-time grade updates, offline capability for poor connectivity.",
      solution: "Implemented granular RLS policies, real-time subscriptions for live updates, and progressive web app features.",
      result: "Currently managing 200+ students, reduced administrative work by 60%, parents access grades in real-time.",
    },
  },
  {
    title: "Workflow Automation Engine",
    description: "Custom automation tool that connects APIs, schedules tasks, and streamlines repetitive workflows for small teams.",
    impact: "Saved 15+ hours per week in manual tasks",
    tech: ["Python", "FastAPI", "Redis", "Docker"],
    icon: Workflow,
    caseStudy: {
      problem: "Teams were spending hours on repetitive tasks: data entry, report generation, email notifications, file organization.",
      thought: "Instead of building one-off scripts, I wanted a reusable engine where anyone could define automation workflows.",
      techReason: "Python for its rich automation library ecosystem. FastAPI for high-performance async API. Redis for job queuing.",
      challenges: "Error handling across chained API calls, managing rate limits, providing clear logs for non-technical users.",
      solution: "Built a visual workflow builder with retry logic, rate limit awareness, and detailed execution logs.",
      result: "3 teams using it actively, saving 15+ hours per week combined. 99.2% task completion rate.",
    },
  },
];

const caseStudyFields = [
  { key: "problem", label: "Problem", icon: Target },
  { key: "thought", label: "Thought Process", icon: Brain },
  { key: "techReason", label: "Tech Choices", icon: Wrench },
  { key: "challenges", label: "Challenges", icon: Zap },
  { key: "solution", label: "Solution", icon: CheckCircle2 },
  { key: "result", label: "Result", icon: TrendingUp },
];

const ProjectsSection = () => {
  const [openCase, setOpenCase] = useState<number | null>(null);

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-3">// projects</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Work
          </h2>
          <div className="w-12 h-px bg-foreground/20" />
        </motion.div>

        <div className="space-y-4">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="border border-border rounded-lg hover:border-foreground/20 transition-colors overflow-hidden">
                <div className="p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center shrink-0">
                      <p.icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="font-bold text-lg">{p.title}</h3>
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{p.description}</p>

                      <p className="text-xs font-mono text-muted-foreground mb-4">{p.impact}</p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {p.tech.map((t) => (
                          <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded bg-secondary text-muted-foreground">{t}</span>
                        ))}
                      </div>

                      <button
                        onClick={() => setOpenCase(openCase === i ? null : i)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {openCase === i ? "hide" : "view"} case study
                        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${openCase === i ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {openCase === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-8 pt-2 border-t border-border">
                        <div className="grid sm:grid-cols-2 gap-6 mt-6">
                          {caseStudyFields.map((field) => (
                            <div key={field.key} className="flex gap-3">
                              <field.icon className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                              <div>
                                <h4 className="font-mono font-medium text-xs uppercase tracking-wider mb-1.5 text-muted-foreground">{field.label}</h4>
                                <p className="text-foreground/80 text-sm leading-relaxed">
                                  {p.caseStudy[field.key as keyof typeof p.caseStudy]}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
