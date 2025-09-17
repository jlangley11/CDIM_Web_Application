import CDIMEvaluator from '../CDIMEvaluator';

// //todo: remove mock functionality
const mockEvaluation = {
  metadata: {
    version: "2.1.0",
    generated_at: "2024-01-15T14:30:00Z"
  },
  executive_summary: "Based on the customer conversation analysis, Contoso Corporation is actively seeking to modernize their infrastructure and enhance their security posture. They currently operate a hybrid environment with 60% on-premises workloads and are experiencing challenges with scalability, security management, and cost optimization. The customer has expressed strong interest in migrating to Azure with a focus on implementing Zero Trust architecture and leveraging AI capabilities for business insights. Key decision makers are aligned on the strategic value of cloud transformation, with a preliminary budget allocation of $2.5M for the first phase of migration.",
  cdim: {
    current: {
      confirmed_items: [
        "Currently using legacy on-premises infrastructure with 60% hybrid cloud adoption",
        "Microsoft 365 partially deployed across organization with 800+ users", 
        "Basic security measures in place with Azure AD Connect",
        "Development teams using some Azure services for testing"
      ],
      gaps: [
        "No comprehensive cloud migration strategy or roadmap",
        "Inconsistent security policies across different departments",
        "Limited visibility into current infrastructure costs and usage"
      ],
      next_questions: [
        "What is the current monthly infrastructure spend breakdown?",
        "Which applications are mission-critical for migration planning?",
        "What compliance requirements must be maintained during transition?"
      ]
    },
    desired: {
      confirmed_items: [
        "100% cloud-first infrastructure strategy on Azure platform",
        "Enhanced security with Zero Trust model implementation",
        "AI-powered analytics and business insights capabilities",
        "Scalable, cost-optimized architecture with automated management"
      ],
      gaps: [
        "Timeline for migration phases not clearly defined",
        "Training requirements for IT staff unclear",
        "Budget allocation for consulting and migration tools TBD"
      ],
      next_questions: [
        "What is the target timeline for complete migration?",
        "What training budget is available for team upskilling?",
        "Are there preferred Azure regions for data residency?"
      ]
    },
    impact: {
      confirmed_items: [
        "Potential 35% reduction in infrastructure costs identified",
        "Improved security posture and compliance alignment expected",
        "Enhanced business agility and faster time-to-market for new services",
        "Better disaster recovery and business continuity capabilities"
      ],
      gaps: [
        "Quantified productivity improvements not yet calculated",
        "Risk assessment for migration downtime incomplete",
        "Change management impact on end users not assessed"
      ],
      next_questions: [
        "What is the acceptable downtime window for critical applications?",
        "How will success be measured post-migration?",
        "What change management support is needed for end users?"
      ]
    },
    metrics: {
      confirmed_items: [
        "Current infrastructure costs: $2.1M annually",
        "Security incidents: 12 per quarter (baseline for improvement)",
        "Application deployment time: 2-3 weeks average",
        "System uptime: 99.2% current SLA"
      ],
      gaps: [
        "Target cost savings percentages not quantified",
        "Performance benchmarks for new environment undefined",
        "ROI calculation timeline and methodology unclear"
      ],
      next_questions: [
        "What are the target performance benchmarks for Azure environment?",
        "What ROI timeline is expected for investment justification?",
        "How will ongoing cost optimization be measured and managed?"
      ],
      quantified_metrics: [
        "Annual infrastructure cost: $2.1M",
        "Security incident reduction target: 50%",
        "Deployment time improvement target: 80%",
        "Uptime improvement target: 99.9%"
      ]
    }
  },
  gaps_and_risks: "Key risks identified include potential downtime during migration windows, staff training requirements for new cloud technologies, and the need for comprehensive change management. There are gaps in understanding the current application dependencies and data governance policies that need to be addressed before migration planning can be finalized. Additionally, budget allocation for training and temporary consulting resources needs clarification to ensure smooth transition. Security compliance during the migration phase requires careful planning to maintain current certifications.",
  impact_statement: {
    sentence: "Contoso Corporation could reduce infrastructure costs by 35% and improve security posture significantly through Azure cloud migration, while enabling AI-driven insights that could increase operational efficiency by 25%.",
    tbd_note: "Specific cost savings figures and timeline projections require detailed infrastructure assessment and business case development in the next phase."
  },
  recommendations: {
    follow_ups: [
      {
        category: "Technical Requirements",
        question: "What is the current monthly infrastructure spend breakdown by service and department?",
        priority: "high"
      },
      {
        category: "Technical Requirements", 
        question: "Which applications are considered mission-critical for the migration planning and phasing?",
        priority: "high"
      },
      {
        category: "Business Alignment",
        question: "What is the expected ROI timeline and how will success be measured post-migration?",
        priority: "medium"
      },
      {
        category: "Security & Compliance",
        question: "Are there specific compliance frameworks (SOC2, HIPAA, etc.) that must be maintained?",
        priority: "high"
      },
      {
        category: "Business Alignment",
        question: "What training budget is allocated for team upskilling and change management?",
        priority: "low"
      }
    ],
    proof_plan: [
      {
        action: "Conduct comprehensive Azure Migration Assessment Workshop",
        timeline: "Week 1-2",
        owner: "Solution Architect Team"
      },
      {
        action: "Deploy Azure Landing Zone Proof of Concept with sample workloads",
        timeline: "Week 3-4", 
        owner: "Cloud Engineering Team"
      },
      {
        action: "Security Assessment and Zero Trust Implementation Planning Session",
        timeline: "Week 4-6",
        owner: "Security Architecture Team"
      },
      {
        action: "Business Case Development and detailed ROI Analysis",
        timeline: "Week 5-7",
        owner: "Business Development Team"
      },
      {
        action: "Executive Stakeholder Presentation and Migration Roadmap Approval",
        timeline: "Week 8",
        owner: "Account Manager"
      }
    ]
  },
  scorecard: {
    overall_score: 78,
    coverage_score: 85,
    depth_score: 72,
    quantification_score: 65,
    impact_linkage_score: 90,
    weights: {
      coverage: 0.25,
      depth: 0.25,
      quantification: 0.25,
      impact_linkage: 0.25,
    }
  }
};

export default function CDIMEvaluatorExample() {
  return <CDIMEvaluator />;
}