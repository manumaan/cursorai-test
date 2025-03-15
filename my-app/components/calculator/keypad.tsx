'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CalculatorKey } from '@/lib/calculator-types';

interface KeypadProps {
  onKeyPress: (key: CalculatorKey) => void;
}

export function Keypad({ onKeyPress }: KeypadProps) {
  const handleClick = (key: CalculatorKey) => {
    onKeyPress(key);
  };

  const renderButton = (key: CalculatorKey, className?: string, variant: 'default' | 'secondary' | 'outline' | 'destructive' = 'default') => (
    <Button
      variant={variant}
      className={cn(
        "h-14 text-lg font-medium transition-all active:scale-95",
        className
      )}
      onClick={() => handleClick(key)}
    >
      {key}
    </Button>
  );

  return (
    <div className="grid grid-cols-4 gap-2">
      {/* First row */}
      {renderButton('C', 'col-span-1', 'destructive')}
      {renderButton('DEL', 'col-span-1', 'destructive')}
      {renderButton('%', 'col-span-1', 'secondary')}
      {renderButton('/', 'col-span-1', 'secondary')}

      {/* Second row */}
      {renderButton('7')}
      {renderButton('8')}
      {renderButton('9')}
      {renderButton('*', undefined, 'secondary')}

      {/* Third row */}
      {renderButton('4')}
      {renderButton('5')}
      {renderButton('6')}
      {renderButton('-', undefined, 'secondary')}

      {/* Fourth row */}
      {renderButton('1')}
      {renderButton('2')}
      {renderButton('3')}
      {renderButton('+', undefined, 'secondary')}

      {/* Fifth row */}
      {renderButton('0', 'col-span-2')}
      {renderButton('.')}
      {renderButton('=', undefined, 'secondary')}
    </div>
  );
} 