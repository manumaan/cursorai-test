'use client';

import { Card } from '@/components/ui/card';
import { CalculationHistoryItem } from '@/lib/calculator-types';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface HistoryPanelProps {
  history: CalculationHistoryItem[];
  onRecall: (value: string) => void;
}

export function HistoryPanel({ history, onRecall }: HistoryPanelProps) {
  if (history.length === 0) {
    return (
      <Card className="p-4 bg-muted/50 text-center text-sm text-muted-foreground">
        No calculation history yet
      </Card>
    );
  }

  return (
    <Card className="p-2 bg-card">
      <h3 className="text-sm font-medium mb-2 px-2">History</h3>
      <ScrollArea className="h-[200px]">
        <div className="space-y-2 px-2">
          {history.map((item, index) => (
            <Card 
              key={index} 
              className="p-2 hover:bg-accent/50 cursor-pointer transition-colors"
              onClick={() => onRecall(item.result)}
            >
              <div className="text-xs text-muted-foreground">{item.expression}</div>
              <div className="text-sm font-medium">{item.result}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {new Date(item.timestamp).toLocaleTimeString()}
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
} 