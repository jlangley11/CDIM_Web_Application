import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Scorecard as ScorecardType } from "@shared/schema";
import { TrendingUp, Target, BarChart3, Link } from "lucide-react";

interface ScorecardProps {
  scorecard: ScorecardType;
  className?: string;
}

function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-yellow-600";
  return "text-red-600";
}

function getScoreBadgeVariant(score: number): "default" | "secondary" | "destructive" {
  if (score >= 80) return "default";
  if (score >= 60) return "secondary";
  return "destructive";
}

function getProgressColorClass(score: number): string {
  if (score >= 80) return "bg-green-500";
  if (score >= 60) return "bg-yellow-500";
  return "bg-red-500";
}

export default function Scorecard({ scorecard, className = "" }: ScorecardProps) {
  const components = [
    {
      name: "Coverage",
      score: scorecard.coverage_score,
      weight: scorecard.weights.coverage,
      icon: Target,
      description: "Completeness of information gathered"
    },
    {
      name: "Depth", 
      score: scorecard.depth_score,
      weight: scorecard.weights.depth,
      icon: BarChart3,
      description: "Level of detail and specificity"
    },
    {
      name: "Quantification",
      score: scorecard.quantification_score, 
      weight: scorecard.weights.quantification,
      icon: TrendingUp,
      description: "Measurable metrics and data points"
    },
    {
      name: "Impact Linkage",
      score: scorecard.impact_linkage_score,
      weight: scorecard.weights.impact_linkage,
      icon: Link,
      description: "Connection between problems and business impact"
    }
  ];

  return (
    <Card className={`${className}`} data-testid="scorecard-display">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold">CDIM Evaluation Score</CardTitle>
        <div className="flex items-center justify-center mt-4">
          <div className="relative">
            <div className={`text-6xl font-bold ${getScoreColor(scorecard.overall_score)}`}>
              {scorecard.overall_score}
            </div>
            <div className="text-sm text-muted-foreground text-center mt-1">
              Overall Score
            </div>
          </div>
        </div>
        <Badge 
          variant={getScoreBadgeVariant(scorecard.overall_score)}
          className="w-fit mx-auto mt-2"
        >
          {scorecard.overall_score >= 80 ? "Excellent" : 
           scorecard.overall_score >= 60 ? "Good" : "Needs Improvement"}
        </Badge>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {components.map((component, index) => {
            const Icon = component.icon;
            return (
              <div 
                key={component.name}
                className="p-4 border rounded-lg hover-elevate cursor-pointer"
                onClick={() => console.log(`${component.name} score details clicked`)}
                data-testid={`score-component-${component.name.toLowerCase().replace(' ', '-')}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="font-medium text-sm">{component.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${getScoreColor(component.score)}`}>
                      {component.score}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {Math.round(component.weight * 100)}%
                    </Badge>
                  </div>
                </div>
                
                <Progress 
                  value={component.score} 
                  className="h-2 mb-2"
                />
                
                <p className="text-xs text-muted-foreground">
                  {component.description}
                </p>
              </div>
            );
          })}
        </div>
        
        <div className="pt-4 border-t border-border/50">
          <div className="text-sm text-muted-foreground text-center">
            Weighted scoring based on CDIM framework methodology
          </div>
        </div>
      </CardContent>
    </Card>
  );
}