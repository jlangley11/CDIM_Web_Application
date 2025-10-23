import { useState } from "react";
import { CDIMEvaluation } from "@shared/schema";
import FlipCard from "./FlipCard";
import ExecutiveSummary from "./ExecutiveSummary";
import ImpactStatement from "./ImpactStatement";
import Recommendations from "./Recommendations";
import FileUpload from "./FileUpload";

interface CDIMEvaluatorProps {
  className?: string;
}

export default function CDIMEvaluator({ className = "" }: CDIMEvaluatorProps) {
  const [evaluation, setEvaluation] = useState<CDIMEvaluation | null>(null);

  const handleEvaluationLoaded = (newEvaluation: CDIMEvaluation) => {
    setEvaluation(newEvaluation);
    console.log('CDIM Evaluation loaded:', newEvaluation);
  };

  if (!evaluation) {
    return (
      <div className={`min-h-screen bg-background ${className}`}>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Agent2-Echo-Preview
            </h1>
            <p className="text-lg text-muted-foreground">
              Analyze customer call transcripts against the CDIM framework
            </p>
          </div>
          
          <FileUpload onEvaluationLoaded={handleEvaluationLoaded} />
          
          <div className="mt-8 text-center">
            <div className="text-sm text-muted-foreground">
              Upload a JSON file with AI-processed transcript data to begin analysis
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-background ${className}`} data-testid="cdim-evaluator">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            CDIM Evaluation Results
          </h1>
          <p className="text-lg text-muted-foreground">
            CDIM for {evaluation.meta.audience}
          </p>
        </div>

        {/* Executive Summary */}
        <div className="mb-8">
          <ExecutiveSummary 
            summary={evaluation.executive_summary}
            metadata={{
              version: evaluation.meta.framework,
              generated_at: new Date().toISOString()
            }}
          />
        </div>

        {/* CDIM Flip Cards */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">CDIM Framework Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <FlipCard
              title="Current State"
              type="current"
              data={evaluation.cdim.current}
            />
            <FlipCard
              title="Desired State"
              type="desired"
              data={evaluation.cdim.desired}
            />
            <FlipCard
              title="Impact"
              type="impact"
              data={evaluation.cdim.impact}
            />
            <FlipCard
              title="Metrics"
              type="metrics"
              data={evaluation.cdim.metrics}
            />
          </div>
        </div>

        {/* Impact Statement and Risks */}
        <div className="mb-8">
          <ImpactStatement 
            impactStatement={{
              sentence: evaluation.impact_statement,
              tbd_note: undefined
            }}
            gapsAndRisks={evaluation.gaps_and_risks}
          />
        </div>

        {/* Recommendations */}
        <div className="mb-8">
          <Recommendations 
            followUps={evaluation.recommendations.follow_ups}
            proofPlan={evaluation.recommendations.proof_plan}
          />
        </div>

        {/* Footer Actions */}
        <div className="text-center pt-8 border-t border-border/50">
          <button
            onClick={() => setEvaluation(null)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            data-testid="button-upload-new"
          >
            Upload New Evaluation
          </button>
        </div>
      </div>
    </div>
  );
}