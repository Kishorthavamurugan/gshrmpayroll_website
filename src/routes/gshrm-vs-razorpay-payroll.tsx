import { createFileRoute } from "@tanstack/react-router";
import { makeCompareRoute } from "@/components/site/CompareTemplate";
export const Route = createFileRoute("/gshrm-vs-razorpay-payroll")(makeCompareRoute("razorpay-payroll"));
