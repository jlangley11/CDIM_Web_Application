import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertTriangle } from "lucide-react";

interface ImpactStatementProps {
  impactStatement: {
    sentence: string;
    tbd_note?: string;
  };
  gapsAndRisks: string;
  className?: string;
}

export default function ImpactStatement({ impactStatement, gapsAndRisks, className = "" }: ImpactStatementProps) {
  return (
    <div className={`space-y-6 ${className}`} data-testid="impact-statement-section">
      {/* Impact Statement */}
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            Business Impact Statement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <blockquote className="text-lg font-medium text-foreground/90 italic border-l-2 border-purple-200 pl-4">
              "{impactStatement.sentence}"
            </blockquote>
            
            {impactStatement.tbd_note && (
              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <Badge variant="outline" className="text-xs border-yellow-300 text-yellow-700 mb-2">
                      To Be Determined
                    </Badge>
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      {impactStatement.tbd_note}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Gaps and Risks */}
      <Card className="border-l-4 border-l-red-500">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            Gaps and Risks Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p className="text-foreground/90 leading-relaxed">
              {gapsAndRisks}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}