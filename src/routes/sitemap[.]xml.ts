import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { ALL_ROUTES } from "@/lib/site";
import { POSTS } from "@/lib/blog-data";

const BASE_URL = "https://gshrmpayroll.lovable.app";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        type Entry = { path: string; changefreq: string; priority: string; lastmod?: string };
        const entries: Entry[] = [
          ...ALL_ROUTES.map((path) => ({ path, changefreq: "weekly", priority: path === "/" ? "1.0" : "0.8" })),
          ...POSTS.map((p) => ({ path: `/blog/${p.slug}`, changefreq: "monthly", priority: "0.7", lastmod: p.date })),
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            `    <changefreq>${e.changefreq}</changefreq>`,
            `    <priority>${e.priority}</priority>`,
            `  </url>`,
          ].filter(Boolean).join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
