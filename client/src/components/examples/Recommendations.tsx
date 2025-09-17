import Recommendations from '../Recommendations';

const mockFollowUps = [
  "Select the first pilot process and department (finance reconciliation or HR onboarding) and appoint a business owner to ensure decisions and adoption.",
  "Run a security design workshop to decide where to use workspace separation, SQL views, row or column security, and customer-managed keys.",
  "Audit model readiness to confirm authoritative views, precomputed measures, refresh cadence, and data quality sufficient for accurate agent responses.",
  "Build two scoped SQL views (for the selected process and for an executive summary), create corresponding Fabric Data Agents.",
  "Create an adoption kit with example prompts, prompt guardrails, and short videos embedded alongside existing dashboards."
];

const mockProofPlan = [
  "Finance Reconciliation Agent: Ground on conformed POS and commerce views to answer reconciliation questions, proving a reduction in reconciliation cycle time from baseline to target within 90 days.",
  "HR Onboarding Agent: Invoke deterministic onboarding workflows with human-in-the-loop approvals, proving a reduction in average time from ticket to account readiness within a defined pilot period.",
  "Executive Commerce Agent: Aggregate scoped views for cross-regional sales and margin questions, proving faster time-to-insight and adoption measured by weekly active users and satisfaction."
];

export default function RecommendationsExample() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Recommendations 
        followUps={mockFollowUps}
        proofPlan={mockProofPlan}
      />
    </div>
  );
}