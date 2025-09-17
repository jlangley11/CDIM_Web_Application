import Recommendations from '../Recommendations';

const mockFollowUps = [
  {
    category: "Technical Requirements",
    question: "What is the current monthly infrastructure spend breakdown?",
    priority: "high" as const
  },
  {
    category: "Technical Requirements", 
    question: "Which applications are considered mission-critical for the migration?",
    priority: "high" as const
  },
  {
    category: "Business Alignment",
    question: "What is the expected ROI timeline for cloud transformation?",
    priority: "medium" as const
  },
  {
    category: "Security & Compliance",
    question: "Are there specific compliance frameworks that must be maintained?",
    priority: "high" as const
  },
  {
    category: "Business Alignment",
    question: "What training budget is allocated for team upskilling?",
    priority: "low" as const
  }
];

const mockProofPlan = [
  {
    action: "Conduct Azure Migration Assessment Workshop",
    timeline: "Week 1-2",
    owner: "Solution Architect Team"
  },
  {
    action: "Deploy Azure Landing Zone Proof of Concept",
    timeline: "Week 3-4", 
    owner: "Cloud Engineering"
  },
  {
    action: "Security Assessment and Zero Trust Implementation Plan",
    timeline: "Week 4-6",
    owner: "Security Team"
  },
  {
    action: "Business Case Development and ROI Analysis",
    timeline: "Week 5-7",
    owner: "Business Development"
  },
  {
    action: "Executive Stakeholder Presentation",
    timeline: "Week 8",
    owner: "Account Manager"
  }
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