import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, HelpCircle } from "lucide-react";
import { SectionWithGaps, MetricsSection } from "@shared/schema";

interface FlipCardProps {
  title: string;
  type: "current" | "desired" | "impact" | "metrics";
  data: SectionWithGaps | MetricsSection;
  className?: string;
}

const typeConfig = {
  current: {
    color: "bg-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    borderColor: "border-blue-200 dark:border-blue-800",
  },
  desired: {
    color: "bg-green-500", 
    bgColor: "bg-green-50 dark:bg-green-950/20",
    borderColor: "border-green-200 dark:border-green-800",
  },
  impact: {
    color: "bg-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/20", 
    borderColor: "border-purple-200 dark:border-purple-800",
  },
  metrics: {
    color: "bg-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
    borderColor: "border-orange-200 dark:border-orange-800",
  },
};

export default function FlipCard({ title, type, data, className = "" }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const config = typeConfig[type];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    console.log(`${title} card flipped to ${!isFlipped ? 'gaps' : 'confirmed'} side`);
  };

  return (
    <div className={`perspective-1000 ${className}`}>
      <div 
        className={`relative w-full h-80 transition-transform duration-600 transform-style-preserve-3d cursor-pointer ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={handleFlip}
        data-testid={`card-${type.toLowerCase()}`}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front Side - Confirmed Items */}
        <Card className={`absolute inset-0 w-full h-full backface-hidden ${config.bgColor} ${config.borderColor} border-2 hover-elevate`}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">{title}</CardTitle>
              <div className={`w-3 h-3 rounded-full ${config.color}`} />
            </div>
            <Badge variant="secondary" className="w-fit text-xs">
              Confirmed Items ({data.confirmed_items.length})
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.confirmed_items.length > 0 ? (
              data.confirmed_items.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground/90">{item}</span>
                </div>
              ))
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">No confirmed items yet</span>
              </div>
            )}
            <div className="text-xs text-muted-foreground mt-4 pt-2 border-t border-border/50">
              Click to view gaps and next questions
            </div>
          </CardContent>
        </Card>

        {/* Back Side - Gaps and Next Questions */}
        <Card 
          className={`absolute inset-0 w-full h-full backface-hidden ${config.bgColor} ${config.borderColor} border-2 hover-elevate`}
          style={{ transform: 'rotateY(180deg)' }}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">{title}</CardTitle>
              <div className={`w-3 h-3 rounded-full ${config.color}`} />
            </div>
            <Badge variant="outline" className="w-fit text-xs border-red-200 text-red-700">
              Gaps & Questions ({data.gaps.length + data.next_questions.length})
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.gaps.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2 text-red-700">Gaps Identified</h4>
                {data.gaps.map((gap, index) => (
                  <div key={index} className="flex items-start gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground/90">{gap}</span>
                  </div>
                ))}
              </div>
            )}
            
            {data.next_questions.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2 text-blue-700">Next Questions</h4>
                {data.next_questions.map((question, index) => (
                  <div key={index} className="flex items-start gap-2 mb-2">
                    <HelpCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground/90">{question}</span>
                  </div>
                ))}
              </div>
            )}
            
            {data.gaps.length === 0 && data.next_questions.length === 0 && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">No gaps or questions identified</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}