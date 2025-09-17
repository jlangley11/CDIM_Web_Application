import ImpactStatement from '../ImpactStatement';

const mockImpactStatement = {
  sentence: "Contoso Corporation could reduce infrastructure costs by 35% and improve security posture significantly through Azure cloud migration, while enabling AI-driven insights that could increase operational efficiency by 25%.",
  tbd_note: "Specific cost savings figures and timeline projections require detailed infrastructure assessment and business case development."
};

const mockGapsAndRisks = "Key risks identified include potential downtime during migration windows, staff training requirements for new cloud technologies, and the need for comprehensive change management. There are gaps in understanding the current application dependencies and data governance policies that need to be addressed before migration planning can be finalized. Additionally, budget allocation for training and temporary consulting resources needs clarification to ensure smooth transition.";

export default function ImpactStatementExample() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <ImpactStatement 
        impactStatement={mockImpactStatement}
        gapsAndRisks={mockGapsAndRisks}
      />
    </div>
  );
}