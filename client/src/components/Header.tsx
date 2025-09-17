import { Badge } from "@/components/ui/badge";
import ThemeToggle from "./ThemeToggle";
import { BarChart3 } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">Azure DCSA</h1>
            <Badge variant="outline" className="text-xs font-mono">
              CDIM Tool
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs hidden sm:inline-flex">
            Microsoft Sales
          </Badge>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}