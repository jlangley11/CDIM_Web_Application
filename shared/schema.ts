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
export const followUpQuestionSchema = z.object({
  category: z.string(),
  question: z.string(),
  priority: z.enum(["high", "medium", "low"]),
});

export const proofPlanItemSchema = z.object({
  action: z.string(),
  timeline: z.string(),
  owner: z.string(),
});

export const sectionWithGapsSchema = z.object({
  confirmed_items: z.array(z.string()),
  gaps: z.array(z.string()),
  next_questions: z.array(z.string()),
});

export const metricsSectionSchema = z.object({
  confirmed_items: z.array(z.string()),
  gaps: z.array(z.string()),
  next_questions: z.array(z.string()),
  quantified_metrics: z.array(z.string()),
});

export const scorecardSchema = z.object({
  overall_score: z.number().min(0).max(100),
  coverage_score: z.number().min(0).max(100),
  depth_score: z.number().min(0).max(100),
  quantification_score: z.number().min(0).max(100),
  impact_linkage_score: z.number().min(0).max(100),
  weights: z.object({
    coverage: z.number(),
    depth: z.number(),
    quantification: z.number(),
    impact_linkage: z.number(),
  }),
});

export const cdimEvaluationSchema = z.object({
  metadata: z.object({
    version: z.string(),
    generated_at: z.string(),
  }),
  executive_summary: z.string(),
  cdim: z.object({
    current: sectionWithGapsSchema,
    desired: sectionWithGapsSchema,
    impact: sectionWithGapsSchema,
    metrics: metricsSectionSchema,
  }),
  gaps_and_risks: z.string(),
  impact_statement: z.object({
    sentence: z.string(),
    tbd_note: z.string().optional(),
  }),
  recommendations: z.object({
    follow_ups: z.array(followUpQuestionSchema),
    proof_plan: z.array(proofPlanItemSchema),
  }),
  scorecard: scorecardSchema,
});

export type FollowUpQuestion = z.infer<typeof followUpQuestionSchema>;
export type ProofPlanItem = z.infer<typeof proofPlanItemSchema>;
export type SectionWithGaps = z.infer<typeof sectionWithGapsSchema>;
export type MetricsSection = z.infer<typeof metricsSectionSchema>;
export type Scorecard = z.infer<typeof scorecardSchema>;
export type CDIMEvaluation = z.infer<typeof cdimEvaluationSchema>;
