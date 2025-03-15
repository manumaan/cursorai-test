'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CalculatorKey, AngleMode } from '@/lib/calculator-types';
import { Toggle } from '@/components/ui/toggle';

interface ScientificControlsProps {
  onKeyPress: (key: CalculatorKey) => void;
  onToggleAngleMode: () => void;
  angleMode: AngleMode;
}

export function ScientificControls({ 
  onKeyPress, 
  onToggleAngleMode, 
  angleMode 
}: ScientificControlsProps) {
  const handleClick = (key: CalculatorKey) => {
    onKeyPress(key);
  };

  const renderButton = (key: CalculatorKey, className?: string) => (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        "h-10 text-sm font-medium transition-all active:scale-95",
        className
      )}
      onClick={() => handleClick(key)}
    >
      {key}
    </Button>
  );

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium">Scientific</h3>
        <Toggle
          pressed={angleMode === 'deg'}
          onPressedChange={() => onToggleAngleMode()}
          aria-label="Toggle angle mode"
          className="text-xs h-7 px-2"
        >
          {angleMode.toUpperCase()}
        </Toggle>
      </div>
      
      <div className="grid grid-cols-4 gap-2 mb-2">
        {/* Trigonometric functions */}
        {renderButton('sin')}
        {renderButton('cos')}
        {renderButton('tan')}
        {renderButton('π')}
        
        {/* Logarithmic functions */}
        {renderButton('log')}
        {renderButton('ln')}
        {renderButton('e')}
        {renderButton('!')}
        
        {/* Powers and roots */}
        {renderButton('sqrt')}
        {renderButton('cbrt')}
        {renderButton('^2')}
        {renderButton('^3')}
        
        {/* Parentheses and power */}
        {renderButton('(')}
        {renderButton(')')}
        {renderButton('^')}
        {renderButton('CE')}
      </div>
    </div>
  );
} 