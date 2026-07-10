import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

export type DemoRequestStatus =
  | "Pending"
  | "Contacted"
  | "Demo Scheduled"
  | "Demo Completed"
  | "Cancelled";

export interface DemoRequest {
  id: string;
  fullName: string;
  company: string;
  email: string;
  phone: string;
  employees: string;
  status: DemoRequestStatus;
  createdAt: string;
  updatedAt: string;
}

// Locate database file under the project root's data/ folder
const DB_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "demo_requests.json");

// Ensure the directory exists
async function ensureDbExists() {
  try {
    await fs.mkdir(DB_DIR, { recursive: true });
    try {
      await fs.access(DB_PATH);
    } catch {
      // Create empty array if file doesn't exist
      await fs.writeFile(DB_PATH, JSON.stringify([], null, 2), "utf-8");
    }
  } catch (error) {
    console.error("Failed to initialize database folder/file:", error);
  }
}

export async function getDemoRequests(): Promise<DemoRequest[]> {
  await ensureDbExists();
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    const requests = JSON.parse(data) as DemoRequest[];
    // Sort by createdAt descending
    return requests.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (error) {
    console.error("Error reading demo requests database:", error);
    return [];
  }
}

export async function createDemoRequest(input: {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  employees: string;
}): Promise<DemoRequest> {
  await ensureDbExists();
  const requests = await getDemoRequests();

  const newRequest: DemoRequest = {
    id: `req_${Math.random().toString(36).substring(2, 11)}_${Date.now()}`,
    fullName: input.fullName,
    company: input.company,
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
    employees: input.employees,
    status: "Pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  requests.push(newRequest);
  await fs.writeFile(DB_PATH, JSON.stringify(requests, null, 2), "utf-8");
  return newRequest;
}

export async function updateDemoRequestStatus(
  id: string,
  status: DemoRequestStatus
): Promise<DemoRequest | null> {
  await ensureDbExists();
  const requests = await getDemoRequests();
  const index = requests.findIndex((r) => r.id === id);
  if (index === -1) return null;

  requests[index].status = status;
  requests[index].updatedAt = new Date().toISOString();

  await fs.writeFile(DB_PATH, JSON.stringify(requests, null, 2), "utf-8");
  return requests[index];
}

export async function isDuplicateRequest(email: string): Promise<boolean> {
  const requests = await getDemoRequests();
  const normalizedEmail = email.trim().toLowerCase();

  // A duplicate is defined as a request with the same email submitted in the last 24 hours
  // that is not Cancelled.
  const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
  return requests.some(
    (r) =>
      r.email === normalizedEmail &&
      new Date(r.createdAt).getTime() > oneDayAgo &&
      r.status !== "Cancelled"
  );
}

export async function deleteDemoRequest(id: string): Promise<boolean> {
  await ensureDbExists();
  const requests = await getDemoRequests();
  const index = requests.findIndex((r) => r.id === id);
  if (index === -1) return false;

  requests.splice(index, 1);
  await fs.writeFile(DB_PATH, JSON.stringify(requests, null, 2), "utf-8");
  return true;
}

export async function deleteMultipleDemoRequests(ids: string[]): Promise<boolean> {
  await ensureDbExists();
  const requests = await getDemoRequests();
  const filtered = requests.filter((r) => !ids.includes(r.id));
  if (filtered.length === requests.length) return false;

  await fs.writeFile(DB_PATH, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}

export async function deleteAllDemoRequests(): Promise<boolean> {
  await ensureDbExists();
  await fs.writeFile(DB_PATH, JSON.stringify([], null, 2), "utf-8");
  return true;
}
