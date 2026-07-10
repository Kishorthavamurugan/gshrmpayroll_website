import { createFileRoute } from "@tanstack/react-router";
import { makeCompareRoute } from "@/components/site/CompareTemplate";
export const Route = createFileRoute("/gshrm-vs-zoho-payroll")(makeCompareRoute("zoho-payroll"));
