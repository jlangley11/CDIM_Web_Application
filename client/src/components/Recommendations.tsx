import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, MessageSquare, Calendar, User, AlertCircle } from "lucide-react";
interface RecommendationsProps {
  followUps: string[];
  proofPlan: string[];
  className?: string;
}

export default function Recommendations({ followUps, proofPlan, className = "" }: RecommendationsProps) {
  const [followUpsOpen, setFollowUpsOpen] = useState(true);
  const [proofPlanOpen, setProofPlanOpen] = useState(true);

  return (
    <div className={`space-y-6 ${className}`} data-testid="recommendations-section">
      {/* Follow-up Questions */}
      <Card>
        <Collapsible open={followUpsOpen} onOpenChange={setFollowUpsOpen}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover-elevate">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  Follow-up Questions
                  <Badge variant="secondary" className="ml-2">
                    {followUps.length}
                  </Badge>
                </CardTitle>
                {followUpsOpen ? (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <CardContent className="space-y-4">
              {followUps.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-3 border rounded-lg hover-elevate cursor-pointer"
                  onClick={() => console.log(`Follow-up item clicked: ${item}`)}
                  data-testid={`followup-question-${index}`}
                >
                  <AlertCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-foreground/90">
                      {item}
                    </p>
                  </div>
                </div>
              ))}
              
              {followUps.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No follow-up questions identified</p>
                </div>
              )}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Proof Plan */}
      <Card>
        <Collapsible open={proofPlanOpen} onOpenChange={setProofPlanOpen}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover-elevate">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Proof Plan
                  <Badge variant="secondary" className="ml-2">
                    {proofPlan.length}
                  </Badge>
                </CardTitle>
                {proofPlanOpen ? (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <CardContent className="space-y-4">
              {proofPlan.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-4 border rounded-lg hover-elevate cursor-pointer"
                  onClick={() => console.log(`Proof plan item clicked: ${item}`)}
                  data-testid={`proof-plan-item-${index}`}
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-primary">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground/90">{item}</p>
                  </div>
                </div>
              ))}
              
              {proofPlan.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No proof plan items defined</p>
                </div>
              )}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  );
}