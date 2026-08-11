import { and, desc, eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { decisions } from "../../../db/schema";

const users = ["kiril", "wren"] as const;
type UserId = typeof users[number];

function validUser(value: string | null | undefined): value is UserId {
  return users.includes(value as UserId);
}

export async function GET(request: Request) {
  const userId = new URL(request.url).searchParams.get("userId");
  if (!validUser(userId)) return Response.json({ error: "Valid userId is required" }, { status: 400 });
  try {
    const rows = await getDb().select().from(decisions).where(eq(decisions.userId, userId)).orderBy(desc(decisions.updatedAt));
    return Response.json({ decisions: rows });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Unable to load decisions" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json() as { userId?: string; jobId?: string; decision?: string };
  if (!validUser(body.userId) || !body.jobId || !["apply", "trash"].includes(body.decision ?? "")) return Response.json({ error: "Invalid decision" }, { status: 400 });
  await getDb().insert(decisions).values({ userId: body.userId, jobId: body.jobId, decision: body.decision as "apply" | "trash" }).onConflictDoUpdate({ target: [decisions.userId, decisions.jobId], set: { decision: body.decision as "apply" | "trash", updatedAt: new Date().toISOString() } });
  return Response.json({ ok: true });
}

export async function DELETE(request: Request) {
  const params = new URL(request.url).searchParams;
  const jobId = params.get("jobId");
  const userId = params.get("userId");
  if (!validUser(userId) || !jobId) return Response.json({ error: "Valid userId and jobId are required" }, { status: 400 });
  await getDb().delete(decisions).where(and(eq(decisions.userId, userId), eq(decisions.jobId, jobId)));
  return Response.json({ ok: true });
}
