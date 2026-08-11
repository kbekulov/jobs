import { desc, eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { decisions } from "../../../db/schema";

export async function GET() {
  try {
    const rows = await getDb().select().from(decisions).orderBy(desc(decisions.updatedAt));
    return Response.json({ decisions: rows });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Unable to load decisions" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json() as { jobId?: string; decision?: string };
  if (!body.jobId || !["apply", "trash"].includes(body.decision ?? "")) return Response.json({ error: "Invalid decision" }, { status: 400 });
  await getDb().insert(decisions).values({ jobId: body.jobId, decision: body.decision as "apply" | "trash" }).onConflictDoUpdate({ target: decisions.jobId, set: { decision: body.decision as "apply" | "trash", updatedAt: new Date().toISOString() } });
  return Response.json({ ok: true });
}

export async function DELETE(request: Request) {
  const jobId = new URL(request.url).searchParams.get("jobId");
  if (!jobId) return Response.json({ error: "jobId is required" }, { status: 400 });
  await getDb().delete(decisions).where(eq(decisions.jobId, jobId));
  return Response.json({ ok: true });
}
