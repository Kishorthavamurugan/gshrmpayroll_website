import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState, useTransition, useEffect } from "react";
import {
  Users,
  CheckCircle2,
  Calendar,
  Clock,
  TrendingUp,
  RefreshCw,
  Mail,
  Phone,
  Search,
  Sparkles,
  LogOut,
  Trash2,
  Download,
  FileSpreadsheet,
  FileText,
} from "lucide-react";
import {
  getDemoRequestsList,
  updateDemoRequestStatusFn,
  deleteDemoRequestFn,
  deleteMultipleDemoRequestsFn,
  deleteAllDemoRequestsFn,
} from "@/lib/api/booking.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  beforeLoad: async ({ location }) => {
    if (typeof window !== "undefined") {
      const isAuthenticated = localStorage.getItem("adminToken");
      if (!isAuthenticated) {
        throw new Error("Unauthorized");
      }
    }
  },
  loader: async () => {
    return await getDemoRequestsList();
  },
  errorComponent: ({ error }) => {
    if (error.message === "Unauthorized") {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
            <p className="text-muted-foreground mb-4">Please login first</p>
            <a
              href="/admin-login"
              className="inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              Go to Login
            </a>
          </div>
        </div>
      );
    }
    throw error;
  },
  component: AdminDashboard,
  head: () => ({
    meta: [
      { title: "Admin Portal — GSHRM Payroll" },
      {
        name: "description",
        content: "Manage and track all customer demo requests for GSHRM Payroll.",
      },
    ],
  }),
});

function AdminDashboard() {
  const requests = Route.useLoaderData();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [monthFilter, setMonthFilter] = useState("All");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const adminUsername = typeof window !== "undefined" ? localStorage.getItem("adminUsername") || "Admin" : "Admin";

  // Dynamic Month Extraction
  const uniqueMonths = Array.from(
    new Set(
      requests.map((r) => {
        const date = new Date(r.createdAt);
        return date.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
      })
    )
  );

  // Filter requests
  const filteredRequests = requests.filter((r) => {
    const matchesSearch =
      r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.phone.includes(searchTerm);

    const matchesStatus = statusFilter === "All" || r.status === statusFilter;

    let matchesMonth = true;
    if (monthFilter !== "All") {
      const date = new Date(r.createdAt);
      const rowMonth = date.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
      matchesMonth = rowMonth === monthFilter;
    }

    return matchesSearch && matchesStatus && matchesMonth;
  });

  // Reset selected checkboxes if the filtered requests change
  useEffect(() => {
    setSelectedIds((prev) => prev.filter((id) => filteredRequests.some((r) => r.id === id)));
  }, [searchTerm, statusFilter, monthFilter]);

  // Stats calculation based on FILTERED/REPORT view for month-wise stats!
  const total = filteredRequests.length;
  const pending = filteredRequests.filter((r) => r.status === "Pending").length;
  const contacted = filteredRequests.filter((r) => r.status === "Contacted").length;
  const scheduled = filteredRequests.filter((r) => r.status === "Demo Scheduled").length;
  const completed = filteredRequests.filter((r) => r.status === "Demo Completed").length;

  const conversionRate = total > 0 ? ((completed / total) * 100).toFixed(1) : "0.0";

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUsername");
    toast.success("Logged out successfully");
    router.navigate({ to: "/admin-login" });
  };

  const handleStatusChange = async (id: string, status: any) => {
    setUpdatingId(id);
    try {
      const result = await updateDemoRequestStatusFn({
        data: { id, status },
      });
      if (result) {
        toast.success(`Status updated to "${status}" successfully.`);
        startTransition(async () => {
          await router.invalidate();
        });
      } else {
        toast.error("Failed to update status. Please try again.");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(`Error: ${err.message || "Unable to update status."}`);
    } finally {
      setUpdatingId(null);
    }
  };

  // Delete Handlers
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      try {
        await deleteDemoRequestFn({ data: { id } });
        toast.success("Lead deleted successfully");
        setSelectedIds((prev) => prev.filter((item) => item !== id));
        startTransition(async () => {
          await router.invalidate();
        });
      } catch (err: any) {
        toast.error("Failed to delete lead: " + (err.message || err));
      }
    }
  };

  const handleDeleteSelected = async () => {
    if (confirm(`Are you sure you want to delete the ${selectedIds.length} selected leads?`)) {
      try {
        await deleteMultipleDemoRequestsFn({ data: { ids: selectedIds } });
        toast.success("Selected leads deleted successfully");
        setSelectedIds([]);
        startTransition(async () => {
          await router.invalidate();
        });
      } catch (err: any) {
        toast.error("Failed to delete selected leads: " + (err.message || err));
      }
    }
  };

  const handleDeleteAll = async () => {
    if (confirm("WARNING: Are you sure you want to delete ALL leads in the database? This cannot be undone.")) {
      if (confirm("FINAL CONFIRMATION: Are you ABSOLUTELY sure? This will delete all lead history permanently.")) {
        try {
          await deleteAllDemoRequestsFn();
          toast.success("All leads deleted successfully");
          setSelectedIds([]);
          startTransition(async () => {
            await router.invalidate();
          });
        } catch (err: any) {
          toast.error("Failed to delete all leads: " + (err.message || err));
        }
      }
    }
  };

  // Export handlers
  const exportToCSV = () => {
    if (filteredRequests.length === 0) {
      toast.warning("No data to export");
      return;
    }
    const headers = ["Customer Name", "Company", "Email", "Phone", "Employees", "Request Date", "Status"];
    const rows = filteredRequests.map((r) => [
      r.fullName,
      r.company,
      r.email,
      r.phone,
      r.employees,
      new Date(r.createdAt).toLocaleDateString("en-IN"),
      r.status,
    ]);

    const csvContent = [headers.join(","), ...rows.map((e) => e.map((val) => `"${val.replace(/"/g, '""')}"`).join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `GSHRM_Leads_Report_${monthFilter.replace(/\s+/g, "_")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Excel/CSV report downloaded successfully");
  };

  const exportToPDF = () => {
    if (filteredRequests.length === 0) {
      toast.warning("No data to export");
      return;
    }
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      toast.error("Popup blocked! Please allow popups to download PDF.");
      return;
    }

    const htmlContent = `
      <html>
        <head>
          <title>GSHRM Payroll - Leads Report (${monthFilter})</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #334155; margin: 40px; }
            .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 30px; }
            .title { font-size: 24px; font-weight: bold; color: #0f172a; }
            .meta { font-size: 13px; color: #64748b; text-align: right; line-height: 1.5; }
            .stats { display: flex; gap: 15px; margin-bottom: 30px; }
            .stat-card { border: 1px solid #e2e8f0; padding: 15px; border-radius: 8px; background: #f8fafc; flex: 1; }
            .stat-label { font-size: 11px; font-weight: 600; color: #64748b; text-transform: uppercase; }
            .stat-value { font-size: 18px; font-weight: bold; color: #0f172a; margin-top: 5px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: left; font-size: 13px; }
            th { background-color: #f1f5f9; font-weight: 600; color: #475569; }
            .status { font-weight: 600; padding: 3px 8px; border-radius: 9999px; font-size: 11px; display: inline-block; }
            .status-Pending { background: #fef3c7; color: #d97706; }
            .status-Contacted { background: #dbeafe; color: #2563eb; }
            .status-Scheduled { background: #e0e7ff; color: #4f46e5; }
            .status-Completed { background: #d1fae5; color: #059669; }
            .status-Cancelled { background: #ffe4e6; color: #e11d48; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="title">GSHRM Payroll Leads Report</div>
              <div style="font-size: 14px; color: #64748b; margin-top: 5px;">Generated for Month: ${monthFilter}</div>
            </div>
            <div class="meta">
              <div>Date: ${new Date().toLocaleDateString("en-IN")}</div>
              <div>Total Records: ${filteredRequests.length}</div>
            </div>
          </div>

          <div class="stats">
            <div class="stat-card">
              <div class="stat-label">Total Leads</div>
              <div class="stat-value">${filteredRequests.length}</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Pending</div>
              <div class="stat-value">${filteredRequests.filter((r) => r.status === "Pending").length}</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Demo Scheduled</div>
              <div class="stat-value">${filteredRequests.filter((r) => r.status === "Demo Scheduled" || r.status === "Contacted").length}</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Demo Completed</div>
              <div class="stat-value">${filteredRequests.filter((r) => r.status === "Demo Completed").length}</div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Company</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Employees</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredRequests
                .map(
                  (r) => `
                <tr>
                  <td style="font-weight: 600;">${r.fullName}</td>
                  <td>${r.company}</td>
                  <td>${r.email}</td>
                  <td>${r.phone}</td>
                  <td>${r.employees}</td>
                  <td>${new Date(r.createdAt).toLocaleDateString("en-IN")}</td>
                  <td>
                    <span class="status status-${r.status.split(" ")[0]}">${r.status}</span>
                  </td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>

          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    toast.success("PDF report generated successfully");
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Contacted":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Demo Scheduled":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "Demo Completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Cancelled":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const isAllSelected = filteredRequests.length > 0 && selectedIds.length === filteredRequests.length;
  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredRequests.map((r) => r.id));
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-primary" />
              Demo Requests Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Track, contact, and schedule free live demos for leads. Logged in as{" "}
              <span className="font-semibold text-slate-700">{adminUsername}</span>
            </p>
          </div>
          <div className="flex items-center flex-wrap gap-3">
            <button
              onClick={() => {
                startTransition(async () => {
                  await router.invalidate();
                });
                toast.info("Dashboard data reloaded.");
              }}
              disabled={isPending}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isPending ? "animate-spin" : ""}`} />
              Refresh Data
            </button>
            {requests.length > 0 && (
              <button
                onClick={handleDeleteAll}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 border border-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <Trash2 className="w-4 h-4" />
                Delete All
              </button>
            )}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-900 border border-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard title="Total Leads" value={total} icon={Users} color="border-l-primary" />
          <StatCard title="Pending" value={pending} icon={Clock} color="border-l-amber-500" />
          <StatCard
            title="Active Scheduled"
            value={contacted + scheduled}
            icon={Calendar}
            color="border-l-indigo-500"
          />
          <StatCard
            title="Completed"
            value={completed}
            icon={CheckCircle2}
            color="border-l-emerald-500"
          />
          <StatCard
            title="Conv. Rate"
            value={`${conversionRate}%`}
            icon={TrendingUp}
            color="border-l-sky-500"
          />
        </div>

        {/* Filters and List */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, company, email, phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-slate-50/50"
              />
            </div>

            <div className="flex flex-wrap sm:flex-nowrap gap-3">
              {/* Status Filter */}
              <div className="w-full sm:w-40">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-slate-50/50 font-medium"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Demo Scheduled">Demo Scheduled</option>
                  <option value="Demo Completed">Demo Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              {/* Month-wise Report Filter */}
              <div className="w-full sm:w-44">
                <select
                  value={monthFilter}
                  onChange={(e) => setMonthFilter(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-slate-50/50 font-medium"
                >
                  <option value="All">All Months (All-time)</option>
                  {uniqueMonths.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              {/* Export Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={exportToCSV}
                  title="Export report to Excel (CSV)"
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 shrink-0 cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  Excel
                </button>
                <button
                  onClick={exportToPDF}
                  title="Download / Print PDF report"
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 shrink-0 cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  PDF
                </button>
              </div>
            </div>
          </div>

          {/* Bulk Selection Actions Panel */}
          {selectedIds.length > 0 && (
            <div className="flex items-center justify-between bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 text-sm text-primary animate-fade-in">
              <div className="flex items-center gap-2 font-medium">
                <span>{selectedIds.length} lead(s) selected</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedIds([])}
                  className="text-slate-500 hover:text-slate-700 font-semibold text-xs"
                >
                  Deselect All
                </button>
                <button
                  onClick={handleDeleteSelected}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-xs transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete Selected
                </button>
              </div>
            </div>
          )}

          {/* Table Container */}
          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-slate-50/75 border-b border-slate-100">
                <tr>
                  <th className="p-4 w-12 text-center">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={handleSelectAll}
                      className="rounded border-slate-300 text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                    />
                  </th>
                  <th className="p-4 font-semibold text-slate-600">Customer Name</th>
                  <th className="p-4 font-semibold text-slate-600">Company</th>
                  <th className="p-4 font-semibold text-slate-600">Email</th>
                  <th className="p-4 font-semibold text-slate-600">Phone</th>
                  <th className="p-4 font-semibold text-slate-600">Employees</th>
                  <th className="p-4 font-semibold text-slate-600">Request Date</th>
                  <th className="p-4 font-semibold text-slate-600 text-center">Status</th>
                  <th className="p-4 font-semibold text-slate-600 text-center w-16">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((req) => {
                    const isSelected = selectedIds.includes(req.id);
                    return (
                      <tr
                        key={req.id}
                        className={`hover:bg-slate-50/30 transition-colors ${
                          isSelected ? "bg-primary/5 hover:bg-primary/5" : ""
                        }`}
                      >
                        <td className="p-4 text-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleSelectRow(req.id)}
                            className="rounded border-slate-300 text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                          />
                        </td>
                        <td className="p-4 font-semibold text-slate-800">{req.fullName}</td>
                        <td className="p-4 text-slate-700">{req.company}</td>
                        <td className="p-4">
                          <a
                            href={`mailto:${req.email}`}
                            className="text-primary hover:underline inline-flex items-center gap-1"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            {req.email}
                          </a>
                        </td>
                        <td className="p-4">
                          <a
                            href={`tel:${req.phone}`}
                            className="text-slate-600 hover:text-primary inline-flex items-center gap-1"
                          >
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            {req.phone}
                          </a>
                        </td>
                        <td className="p-4 text-slate-600">{req.employees}</td>
                        <td className="p-4 text-slate-500">
                          {new Date(req.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="p-4 text-center">
                          <select
                            value={req.status}
                            disabled={updatingId === req.id}
                            onChange={(e) => handleStatusChange(req.id, e.target.value)}
                            className={`inline-block text-xs font-semibold px-2.5 py-1.5 rounded-full border focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer disabled:opacity-50 ${getStatusBadgeClass(
                              req.status,
                            )}`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Demo Scheduled">Demo Scheduled</option>
                            <option value="Demo Completed">Demo Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => handleDelete(req.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50/50 transition-colors cursor-pointer"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={9} className="p-8 text-center text-slate-400 font-medium">
                      No demo requests found matching the filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  color: string;
}) {
  return (
    <div
      className={`bg-white p-5 border border-slate-100 rounded-2xl shadow-sm border-l-4 ${color} flex items-center justify-between`}
    >
      <div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
          {title}
        </span>
        <span className="text-2xl font-bold text-slate-800 mt-1 block">{value}</span>
      </div>
      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
}
