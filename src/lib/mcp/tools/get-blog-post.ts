import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { POSTS } from "@/lib/blog-data";

export default defineTool({
  name: "get_blog_post",
  title: "Get blog post",
  description: "Return the full content of a single GSHRM Payroll blog post by slug.",
  inputSchema: {
    slug: z.string().min(1).describe("Blog post slug, e.g. 'what-is-payroll-software'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const post = POSTS.find((p) => p.slug === slug);
    if (!post) {
      return {
        content: [{ type: "text", text: `No blog post found with slug '${slug}'.` }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(post, null, 2) }],
      structuredContent: post,
    };
  },
});
