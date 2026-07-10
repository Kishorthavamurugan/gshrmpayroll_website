import { defineMcp } from "@lovable.dev/mcp-js";
import getSiteInfo from "./tools/get-site-info";
import listPages from "./tools/list-pages";
import listBlogPosts from "./tools/list-blog-posts";
import getBlogPost from "./tools/get-blog-post";

export default defineMcp({
  name: "gshrm-payroll-mcp",
  title: "GSHRM Payroll",
  version: "0.1.0",
  instructions:
    "Tools for the GSHRM Payroll website. Use `get_site_info` for company contact and brand info, `list_pages` to discover site sections and URLs, `list_blog_posts` to browse published articles, and `get_blog_post` to read the full body of a post by slug.",
  tools: [getSiteInfo, listPages, listBlogPosts, getBlogPost],
});
