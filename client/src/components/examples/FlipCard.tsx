import FlipCard from '../FlipCard';

const mockCurrentStateData = {
  confirmed: [
    "Currently using legacy on-premises infrastructure",
    "Microsoft 365 partially deployed across organization", 
    "Basic security measures in place with Azure AD",
    "Limited cloud adoption in development teams"
  ],
  gaps_next_call: [
    "What is the current monthly infrastructure spend?",
    "Which applications are mission-critical for migration?",
    "What compliance requirements must be maintained?"
  ]
};

export default function FlipCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 max-w-4xl">
      <FlipCard 
        title="Current State"
        type="current"
        data={mockCurrentStateData}
      />
      <FlipCard 
        title="Desired State"
        type="desired"
        data={{
          confirmed: [
            "100% cloud-first infrastructure on Azure",
            "Enhanced security with Zero Trust model",
            "AI-powered analytics and insights"
          ],
          gaps_next_call: [
            "What is the target timeline for migration?",
            "What training budget is available?"
          ]
        }}
      />
    </div>
  );
}