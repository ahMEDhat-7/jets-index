import { useState, useEffect } from 'react';
import { useDesignStore } from '../store/useDesignStore';
import type { Blog } from '../types';
import { FileText, Calendar, X, Loader2 } from 'lucide-react';

export default function BlogPage() {
  const { blogs, isLoading, setIsLoading, fetchBlogsIfNeeded } = useDesignStore();
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function loadBlogs() {
      if (blogs.length > 0) return;
      setIsLoading(true);
      try {
        await fetchBlogsIfNeeded();
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    loadBlogs();
    return () => { cancelled = true; };
  }, [blogs.length, setIsLoading, fetchBlogsIfNeeded]);

  if (isLoading && blogs.length === 0) {
    return (
      <div className="min-h-screen bg-[hsl(var(--background))] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[hsl(var(--muted-foreground))]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      {/* Header */}
      <div className="bg-[hsl(var(--card))] border-b border-[hsl(var(--border))] py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold text-[hsl(var(--card-foreground))]">Latest News</h1>
          <p className="text-[hsl(var(--muted-foreground))] text-sm">Stay updated with military aviation</p>
        </div>
      </div>

      {/* Blog List */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        {blogs.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="w-12 h-12 text-[hsl(var(--muted-foreground))] mx-auto mb-3 opacity-50" />
            <p className="text-[hsl(var(--muted-foreground))]">No blog posts available yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {blogs.map((blog) => (
              <div 
                key={blog.id} 
                onClick={() => setSelectedBlog(blog)} 
                className="group bg-[hsl(var(--card))] rounded-xl p-4 cursor-pointer border border-[hsl(var(--border))] shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {blog.publishedAt && (
                      <span className="flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))]">
                        <Calendar className="w-3 h-3" />
                        {new Date(blog.publishedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <h2 className="font-semibold text-[hsl(var(--card-foreground))] text-base group-hover:opacity-80 transition-opacity">
                    {blog.title}
                  </h2>
                  <p className="text-[hsl(var(--muted-foreground))] text-sm line-clamp-2 mt-1">{blog.summary}</p>
                  <p className="text-[hsl(var(--primary))] text-sm mt-2">Read more →</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Blog Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedBlog(null)}>
          <div className="bg-[hsl(var(--card))] rounded-xl max-w-2xl w-full max-h-[85vh] overflow-auto shadow-xl border border-[hsl(var(--border))]" onClick={e => e.stopPropagation()}>
            {selectedBlog.imageUrl && (
              <img src={selectedBlog.imageUrl} alt={selectedBlog.title} className="w-full h-40 object-cover" />
            )}
            <div className="p-5">
              <button onClick={() => setSelectedBlog(null)} className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                <X className="w-5 h-5 text-[hsl(var(--foreground))]" />
              </button>
              
              {selectedBlog.publishedAt && (
                <p className="text-xs text-[hsl(var(--muted-foreground))] mb-2">
                  {new Date(selectedBlog.publishedAt).toLocaleDateString()}
                </p>
              )}
              
              <h2 className="text-xl font-semibold text-[hsl(var(--card-foreground))] mb-3">{selectedBlog.title}</h2>
              
              <div className="text-[hsl(var(--muted-foreground))] text-sm whitespace-pre-wrap">
                {selectedBlog.content || selectedBlog.summary || 'No content available.'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}