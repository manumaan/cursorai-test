'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DisplayProps {
  value: string;
  previousValue?: string;
  error?: string | null;
  memory?: number | null;
  angleMode?: 'rad' | 'deg';
}

export function Display({
  value,
  previousValue = '',
  error = null,
  memory = null,
  angleMode = 'rad',
}: DisplayProps) {
  const [fontSize, setFontSize] = useState('text-4xl');
  
  // Adjust font size based on the length of the display value
  useEffect(() => {
    if (value.length > 12) {
      setFontSize('text-2xl');
    } else if (value.length > 8) {
      setFontSize('text-3xl');
    } else {
      setFontSize('text-4xl');
    }
  }, [value]);

  return (
    <Card className="p-4 mb-2 bg-card border-2 overflow-hidden">
      <div className="flex flex-col items-end">
        {/* Previous operation display */}
        {previousValue && (
          <div className="text-sm text-muted-foreground mb-1 h-5 overflow-hidden text-ellipsis w-full text-right">
            {previousValue}
          </div>
        )}
        
        {/* Memory indicator */}
        <div className="w-full flex justify-between items-center mb-1">
          <div className="text-xs font-medium">
            {memory !== null && (
              <span className="text-primary">M</span>
            )}
          </div>
          <div className="text-xs font-medium">
            <span className={cn(
              "px-1 rounded",
              angleMode === 'rad' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
            )}>
              {angleMode.toUpperCase()}
            </span>
          </div>
        </div>
        
        {/* Main display */}
        <div 
          className={cn(
            "font-mono w-full text-right transition-all duration-200 overflow-hidden text-ellipsis",
            fontSize,
            error ? "text-destructive" : "text-foreground"
          )}
        >
          {error || value}
        </div>
      </div>
    </Card>
  );
} 