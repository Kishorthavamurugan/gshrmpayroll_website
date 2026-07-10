import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { bookDemo } from "@/lib/api/booking.functions";

export function DemoForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [employees, setEmployees] = useState("1 – 25");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await bookDemo({
        data: {
          name,
          company,
          email,
          phone,
          employees,
        },
      });

      if (response.errors && response.errors.length > 0) {
        setError(response.errors.join(", "));
        toast.error("❌ Unable to submit your request. Please try again later.");
      } else {
        toast.success("✅ Demo request submitted successfully. Our team will contact you shortly.");
        // Clear form fields
        setName("");
        setCompany("");
        setEmail("");
        setPhone("");
        setEmployees("1 – 25");
      }
    } catch (err: any) {
      console.error("Demo booking error:", err);
      const errMsg = err.message || "An unexpected error occurred. Please try again.";
      setError(errMsg);
      toast.error(
        errMsg.includes("already been submitted") || errMsg.includes("Too many requests")
          ? `❌ ${errMsg}`
          : "❌ Unable to submit your request. Please try again later.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white text-foreground p-6 md:p-8 shadow-[var(--shadow-lg)] border border-slate-100"
    >
      <div className="grid gap-4">
        <h3 className="text-xl font-bold text-slate-900 mb-1">Request a Free Live Demo</h3>

        {error && (
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-100 text-rose-600 text-xs font-medium">
            ⚠️ {error}
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            name="name"
            label="Full name"
            required
            placeholder="Priya Sharma"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={submitting}
          />
          <Input
            name="company"
            label="Company"
            required
            placeholder="Acme Pvt Ltd"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            disabled={submitting}
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            name="email"
            type="email"
            label="Work email"
            required
            placeholder="priya@acme.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={submitting}
          />
          <Input
            name="phone"
            type="tel"
            label="Phone / WhatsApp"
            required
            placeholder="+91 98xxx xxxxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={submitting}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
            Employees
          </label>
          <select
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
            value={employees}
            onChange={(e) => setEmployees(e.target.value)}
            disabled={submitting}
          >
            <option>1 – 25</option>
            <option>26 – 100</option>
            <option>101 – 500</option>
            <option>500+</option>
          </select>
        </div>
        <button
          type="submit"
          className="btn-hero w-full justify-center disabled:opacity-75 disabled:cursor-not-allowed"
          disabled={submitting}
        >
          {submitting ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            <>
              Book my demo <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
        <p className="text-xs text-muted-foreground text-center">
          By submitting you agree to our Privacy Policy.
        </p>
      </div>
    </form>
  );
}

function Input({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
        {label}
      </label>
      <input
        {...props}
        className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
      />
    </div>
  );
}
