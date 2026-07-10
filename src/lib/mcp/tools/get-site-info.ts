import { defineTool } from "@lovable.dev/mcp-js";
import { SITE } from "@/lib/site";

export default defineTool({
  name: "get_site_info",
  title: "Get site info",
  description: "Return GSHRM Payroll company info: name, tagline, description, phone, email, address, social links.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(SITE, null, 2) }],
    structuredContent: SITE,
  }),
});
