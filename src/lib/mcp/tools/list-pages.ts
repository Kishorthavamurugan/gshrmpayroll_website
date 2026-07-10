import { defineTool } from "@lovable.dev/mcp-js";
import { ALL_ROUTES, NAV } from "@/lib/site";

export default defineTool({
  name: "list_pages",
  title: "List pages",
  description: "List all public pages on the GSHRM Payroll site, grouped by section (products, industries, comparisons, resources) plus a flat list of all routes.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const data = { routes: ALL_ROUTES, sections: NAV };
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: data,
    };
  },
});
