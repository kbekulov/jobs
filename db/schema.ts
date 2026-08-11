import { sql } from "drizzle-orm";
import { index, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const decisions = sqliteTable("decisions", {
  userId: text("user_id", { enum: ["kiril", "wren"] }).notNull(),
  jobId: text("job_id").notNull(),
  decision: text("decision", { enum: ["apply", "trash"] }).notNull(),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
  primaryKey({ columns: [table.userId, table.jobId], name: "decisions_user_job_pk" }),
  index("idx_decisions_user_updated_at").on(table.userId, table.updatedAt),
]);
