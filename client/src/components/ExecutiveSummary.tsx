import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, User } from "lucide-react";

interface ExecutiveSummaryProps {
  summary: string;
  metadata: {
    version: string;
    generated_at: string;
  };
  className?: string;
}

export default function ExecutiveSummary({ summary, metadata, className = "" }: ExecutiveSummaryProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className={`${className}`} data-testid="executive-summary">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Executive Summary
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              CDIM
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {formatDate(metadata.generated_at)}
          </div>
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            AI Analysis
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="prose prose-sm max-w-none">
          <p className="text-foreground/90 leading-relaxed">
            {summary}
          </p>
        </div>
        
        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="text-xs text-muted-foreground">
            This summary is generated from AI analysis of customer conversation transcripts using the CDIM framework.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}