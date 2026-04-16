import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BlogPost = () => {
  const { slug } = useParams();
  const { data: post, isLoading } = useQuery({
    queryKey: ["blog_post", slug],
    queryFn: async () => {
      const { data, error } = await supabase.from("blog_posts").select("*").eq("slug", slug!).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <article className="max-w-3xl mx-auto px-6 md:px-12 py-32">
        <Link to="/#blog" className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-3 h-3" /> back
        </Link>
        {isLoading ? (
          <p className="text-muted-foreground text-sm font-mono">loading...</p>
        ) : !post ? (
          <p className="text-muted-foreground">Post not found.</p>
        ) : (
          <>
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-4">
              <Calendar className="w-3 h-3" />
              {new Date(post.published_at).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{post.title}</h1>
            {post.excerpt && <p className="text-lg text-muted-foreground mb-8">{post.excerpt}</p>}
            {post.cover_image_url && (
              <img src={post.cover_image_url} alt={post.title} className="w-full rounded-lg border border-border mb-10" />
            )}
            <div className="prose prose-invert max-w-none whitespace-pre-wrap text-foreground/90 leading-relaxed">{post.content}</div>
            {(post.tags || []).length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-10 pt-6 border-t border-border">
                {post.tags!.map((t: string) => (
                  <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded bg-secondary text-muted-foreground">#{t}</span>
                ))}
              </div>
            )}
          </>
        )}
      </article>
      <Footer />
    </div>
  );
};

export default BlogPost;
