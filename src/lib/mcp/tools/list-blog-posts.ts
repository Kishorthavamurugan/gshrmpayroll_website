import { defineTool } from "@lovable.dev/mcp-js";
import { POSTS } from "@/lib/blog-data";

export default defineTool({
  name: "list_blog_posts",
  title: "List blog posts",
  description: "List GSHRM Payroll blog posts with slug, title, excerpt, category, read time, and publish date.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const items = POSTS.map(({ slug, title, excerpt, category, readTime, date }) => ({
      slug,
      title,
      excerpt,
      category,
      readTime,
      date,
      url: `/blog/${slug}`,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { posts: items },
    };
  },
});
