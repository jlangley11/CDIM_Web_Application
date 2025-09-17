import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, HelpCircle, RotateCcw, Eye, EyeOff } from "lucide-react";
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
  const [expandedConfirmed, setExpandedConfirmed] = useState<number[]>([]);
  const [expandedGaps, setExpandedGaps] = useState<number[]>([]);
  const config = typeConfig[type];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    console.log(`${title} card flipped to ${!isFlipped ? 'gaps' : 'confirmed'} side`);
  };

  const toggleExpandConfirmed = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedConfirmed(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const toggleExpandGaps = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedGaps(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div 
      className={`relative h-96 sm:h-80 md:h-96 ${className} ${isFlipped ? 'z-10' : 'z-0'}`}
      onClick={handleFlip}
      data-testid={`card-${type.toLowerCase()}`}
    >
      {/* Front Side - Confirmed Items */}
      <div className={`absolute inset-0 transition-all duration-300 ${
        isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <Card className={`w-full h-full ${config.bgColor} ${config.borderColor} border-2 cursor-pointer`}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                {title}
                <div className="text-xs opacity-60 group-hover:opacity-100 transition-opacity">
                  ↻ Click to flip
                </div>
              </CardTitle>
              <div className={`w-3 h-3 rounded-full ${config.color} group-hover:animate-pulse`} />
            </div>
            <Badge variant="secondary" className="w-fit text-xs">
              Confirmed Items ({data.confirmed.length})
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3 max-h-64 overflow-y-auto">
            {data.confirmed.length > 0 ? (
              data.confirmed.map((item, index) => {
                const isExpanded = expandedConfirmed.includes(index);
                const shouldTruncate = item.length > 150;
                const displayText = shouldTruncate && !isExpanded ? truncateText(item) : item;
                
                return (
                  <div key={index} className="group">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <span className="text-sm text-foreground/90 leading-relaxed">
                          {displayText}
                        </span>
                        {shouldTruncate && (
                          <button
                            onClick={(e) => toggleExpandConfirmed(index, e)}
                            className="ml-1 text-xs text-primary hover:text-primary/80 font-medium"
                            data-testid={`expand-confirmed-${index}`}
                          >
                            {isExpanded ? 'Show less' : 'Show more'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">No confirmed items yet</span>
              </div>
            )}
            <div className="text-xs text-muted-foreground mt-4 pt-2 border-t border-border/50 flex items-center gap-2">
              <RotateCcw className="w-3 h-3" />
              Click card to view gaps and next questions
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Back Side - Gaps and Next Questions */}
      <div className={`absolute inset-0 transition-all duration-300 ${
        isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <Card className={`w-full h-full ${config.bgColor} ${config.borderColor} border-2 cursor-pointer`}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                {title}
                <div className="text-xs opacity-60 group-hover:opacity-100 transition-opacity">
                  ↻ Click to flip back
                </div>
              </CardTitle>
              <div className={`w-3 h-3 rounded-full ${config.color} group-hover:animate-pulse`} />
            </div>
            <Badge variant="outline" className="w-fit text-xs border-red-200 text-red-700">
              Gaps & Questions ({data.gaps_next_call.length})
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4 max-h-64 overflow-y-auto">
            {data.gaps_next_call.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-3 text-blue-700 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  Gaps & Next Call Items
                </h4>
                {data.gaps_next_call.map((item, index) => {
                  const isExpanded = expandedGaps.includes(index);
                  const shouldTruncate = item.length > 150;
                  const displayText = shouldTruncate && !isExpanded ? truncateText(item) : item;
                  
                  return (
                    <div key={index} className="group mb-3">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <span className="text-sm text-foreground/90 leading-relaxed">
                            {displayText}
                          </span>
                          {shouldTruncate && (
                            <button
                              onClick={(e) => toggleExpandGaps(index, e)}
                              className="ml-1 text-xs text-primary hover:text-primary/80 font-medium"
                              data-testid={`expand-gaps-${index}`}
                            >
                              {isExpanded ? 'Show less' : 'Show more'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            
            {data.gaps_next_call.length === 0 && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">No gaps or questions identified</span>
              </div>
            )}
            
            <div className="text-xs text-muted-foreground mt-4 pt-2 border-t border-border/50 flex items-center gap-2">
              <RotateCcw className="w-3 h-3" />
              Click card to return to confirmed items
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}