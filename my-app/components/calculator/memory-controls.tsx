'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CalculatorKey } from '@/lib/calculator-types';

interface MemoryControlsProps {
  onKeyPress: (key: CalculatorKey) => void;
  hasMemory: boolean;
}

export function MemoryControls({ onKeyPress, hasMemory }: MemoryControlsProps) {
  const handleClick = (key: CalculatorKey) => {
    onKeyPress(key);
  };

  const renderButton = (key: CalculatorKey, className?: string, disabled = false) => (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        "h-8 text-xs font-medium transition-all active:scale-95",
        className
      )}
      onClick={() => handleClick(key)}
      disabled={disabled}
    >
      {key}
    </Button>
  );

  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium mb-2">Memory</h3>
      <div className="grid grid-cols-5 gap-2">
        {renderButton('MC', undefined, !hasMemory)}
        {renderButton('MR', undefined, !hasMemory)}
        {renderButton('M+')}
        {renderButton('M-')}
        {renderButton('MS')}
      </div>
    </div>
  );
} 