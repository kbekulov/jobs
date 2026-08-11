import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const decisions = sqliteTable("decisions", {
  jobId: text("job_id").primaryKey(),
  decision: text("decision", { enum: ["apply", "trash"] }).notNull(),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
