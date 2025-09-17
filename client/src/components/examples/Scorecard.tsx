import Scorecard from '../Scorecard';

const mockScorecard = {
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
};

export default function ScorecardExample() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Scorecard scorecard={mockScorecard} />
    </div>
  );
}