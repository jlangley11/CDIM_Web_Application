import Scorecard from '../Scorecard';

const mockScorecard = {
  overall: 78,
  coverage: 85,
  depth: 72,
  quantification: 65,
  impact_linkage: 90
};

export default function ScorecardExample() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Scorecard scorecard={mockScorecard} />
    </div>
  );
}