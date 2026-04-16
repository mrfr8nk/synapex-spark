import { motion } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";
import { useBlogPosts } from "@/hooks/use-site-data";
import { Link } from "react-router-dom";

const BlogSection = () => {
  const { data: posts } = useBlogPosts({ onlyPublished: true });
  if (!posts?.length) return null;

  return (
    <section id="blog" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-3">// writing</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Blog</h2>
          <div className="w-12 h-px bg-foreground/20" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {posts.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <Link to={`/blog/${p.slug}`} className="group block border border-border rounded-lg overflow-hidden hover:border-foreground/20 transition-colors h-full">
                {p.cover_image_url && (
                  <div className="aspect-[16/9] overflow-hidden bg-secondary">
                    <img src={p.cover_image_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-3">
                    <Calendar className="w-3 h-3" />
                    {new Date(p.published_at).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                  </div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-bold text-lg leading-tight">{p.title}</h3>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground shrink-0 mt-1 group-hover:text-foreground transition-colors" />
                  </div>
                  {p.excerpt && <p className="text-muted-foreground text-sm leading-relaxed mb-3">{p.excerpt}</p>}
                  {(p.tags || []).length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags!.map((t) => (
                        <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded bg-secondary text-muted-foreground">#{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
