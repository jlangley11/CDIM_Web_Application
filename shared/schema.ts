import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// CDIM Evaluation Types
export const sectionWithGapsSchema = z.object({
  confirmed: z.array(z.string()),
  gaps_next_call: z.array(z.string()),
});

export const metricsSectionSchema = z.object({
  confirmed: z.array(z.string()),
  gaps_next_call: z.array(z.string()),
});

export const scorecardSchema = z.object({
  overall: z.number().min(0).max(100),
  coverage: z.number().min(0).max(100),
  depth: z.number().min(0).max(100),
  quantification: z.number().min(0).max(100),
  impact_linkage: z.number().min(0).max(100),
});

export const cdimEvaluationSchema = z.object({
  meta: z.object({
    framework: z.string(),
    audience: z.string(),
    weights: z.object({
      coverage: z.number(),
      depth: z.number(),
      quantification: z.number(),
      impact_linkage: z.number(),
    }),
  }),
  executive_summary: z.string(),
  cdim: z.object({
    current: sectionWithGapsSchema,
    desired: sectionWithGapsSchema,
    impact: sectionWithGapsSchema,
    metrics: metricsSectionSchema,
  }),
  gaps_and_risks: z.string(),
  impact_statement: z.string(),
  recommendations: z.object({
    follow_ups: z.array(z.string()),
    proof_plan: z.array(z.string()),
  }),
  scorecard: scorecardSchema,
});

export type SectionWithGaps = z.infer<typeof sectionWithGapsSchema>;
export type MetricsSection = z.infer<typeof metricsSectionSchema>;
export type Scorecard = z.infer<typeof scorecardSchema>;
export type CDIMEvaluation = z.infer<typeof cdimEvaluationSchema>;
