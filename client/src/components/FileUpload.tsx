import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, X, CheckCircle, AlertCircle } from "lucide-react";
import { CDIMEvaluation, cdimEvaluationSchema } from "@shared/schema";

interface FileUploadProps {
  onEvaluationLoaded: (evaluation: CDIMEvaluation) => void;
  className?: string;
}

export default function FileUpload({ onEvaluationLoaded, className = "" }: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');

  const processFile = useCallback(async (file: File) => {
    setUploadStatus('processing');
    setFileName(file.name);
    
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      
      // Validate against schema
      const validatedData = cdimEvaluationSchema.parse(data);
      
      setUploadStatus('success');
      onEvaluationLoaded(validatedData);
      console.log('CDIM evaluation loaded successfully:', validatedData);
    } catch (error) {
      setUploadStatus('error');
      if (error instanceof Error && error.message.includes('issues')) {
        // This is a Zod validation error
        setErrorMessage(
          'Invalid JSON structure. The file must contain a complete CDIM evaluation with metadata, cdim sections (current, desired, impact, metrics), scorecard, and recommendations. Please check the file format matches the expected schema.'
        );
      } else if (error instanceof SyntaxError) {
        setErrorMessage('Invalid JSON file. Please ensure the file contains valid JSON data.');
      } else {
        setErrorMessage(
          error instanceof Error 
            ? `File processing error: ${error.message}`
            : 'Failed to process file. Please ensure it contains valid CDIM evaluation data.'
        );
      }
      console.error('File processing error:', error);
    }
  }, [onEvaluationLoaded]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const jsonFile = files.find(file => file.type === 'application/json' || file.name.endsWith('.json'));
    
    if (jsonFile) {
      processFile(jsonFile);
    } else {
      setUploadStatus('error');
      setErrorMessage('Please upload a valid JSON file containing CDIM evaluation data.');
    }
  }, [processFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  }, [processFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const resetUpload = () => {
    setUploadStatus('idle');
    setFileName('');
    setErrorMessage('');
  };

  return (
    <Card className={`${className}`} data-testid="file-upload">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Upload className="w-5 h-5 text-primary" />
          Upload CDIM Evaluation
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Upload a JSON file containing AI-processed transcript evaluation data
        </p>
      </CardHeader>
      
      <CardContent>
        <div
          className={`
            relative border-2 border-dashed rounded-lg p-8 text-center transition-colors
            ${isDragOver ? 'border-primary bg-primary/5' : 'border-border'}
            ${uploadStatus === 'success' ? 'border-green-300 bg-green-50 dark:bg-green-950/20' : ''}
            ${uploadStatus === 'error' ? 'border-red-300 bg-red-50 dark:bg-red-950/20' : ''}
          `}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            type="file"
            accept=".json,application/json"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            data-testid="file-input"
          />
          
          <div className="space-y-4">
            {uploadStatus === 'idle' && (
              <>
                <FileText className="w-12 h-12 mx-auto text-muted-foreground" />
                <div>
                  <p className="text-lg font-medium">
                    Drop your JSON file here or click to browse
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supports JSON files with CDIM evaluation structure
                  </p>
                </div>
              </>
            )}
            
            {uploadStatus === 'processing' && (
              <>
                <div className="w-12 h-12 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <div>
                  <p className="text-lg font-medium">Processing file...</p>
                  <p className="text-sm text-muted-foreground">{fileName}</p>
                </div>
              </>
            )}
            
            {uploadStatus === 'success' && (
              <>
                <CheckCircle className="w-12 h-12 mx-auto text-green-600" />
                <div>
                  <p className="text-lg font-medium text-green-800 dark:text-green-300">
                    File uploaded successfully!
                  </p>
                  <p className="text-sm text-muted-foreground">{fileName}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={resetUpload}
                    className="mt-2"
                    data-testid="button-upload-another"
                  >
                    Upload Another File
                  </Button>
                </div>
              </>
            )}
            
            {uploadStatus === 'error' && (
              <>
                <AlertCircle className="w-12 h-12 mx-auto text-red-600" />
                <div>
                  <p className="text-lg font-medium text-red-800 dark:text-red-300">
                    Upload failed
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-400 mb-2">
                    {errorMessage}
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={resetUpload}
                    data-testid="button-try-again"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Try Again
                  </Button>
                </div>
              </>
            )}
          </div>
          
          <div className="mt-6 pt-4 border-t border-border/50">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-2">
              <Badge variant="outline" className="text-xs">JSON</Badge>
              <span>•</span>
              <span>CDIM Evaluation Schema v2.1+</span>
            </div>
            <details className="text-xs text-muted-foreground">
              <summary className="cursor-pointer hover:text-foreground transition-colors">
                Expected JSON structure
              </summary>
              <div className="mt-2 p-2 bg-muted/50 rounded text-left">
                <pre className="whitespace-pre-wrap font-mono text-xs">
{`{
  "metadata": { "version": "2.1.0", "generated_at": "..." },
  "executive_summary": "...",
  "cdim": {
    "current": { "confirmed_items": [], "gaps": [], "next_questions": [] },
    "desired": { "confirmed_items": [], "gaps": [], "next_questions": [] },
    "impact": { "confirmed_items": [], "gaps": [], "next_questions": [] },
    "metrics": { "confirmed_items": [], "gaps": [], "next_questions": [], "quantified_metrics": [] }
  },
  "scorecard": { "overall_score": 0, "coverage_score": 0, ... },
  "recommendations": { "follow_ups": [], "proof_plan": [] },
  ...
}`}
                </pre>
              </div>
            </details>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}