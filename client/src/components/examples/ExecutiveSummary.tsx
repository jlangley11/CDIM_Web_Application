import ExecutiveSummary from '../ExecutiveSummary';

const mockSummary = "Based on the customer conversation analysis, Contoso Corporation is actively seeking to modernize their infrastructure and enhance their security posture. They currently operate a hybrid environment with 60% on-premises workloads and are experiencing challenges with scalability, security management, and cost optimization. The customer has expressed strong interest in migrating to Azure with a focus on implementing Zero Trust architecture and leveraging AI capabilities for business insights. Key decision makers are aligned on the strategic value of cloud transformation, with a preliminary budget allocation of $2.5M for the first phase of migration.";

const mockMetadata = {
  version: "2.1.0",
  generated_at: "2024-01-15T14:30:00Z"
};

export default function ExecutiveSummaryExample() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <ExecutiveSummary 
        summary={mockSummary}
        metadata={mockMetadata}
      />
    </div>
  );
}