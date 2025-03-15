'use client';

import { useCalculator } from '@/hooks/use-calculator';
import { Display } from './display';
import { Keypad } from './keypad';
import { ScientificControls } from './scientific-controls';
import { MemoryControls } from './memory-controls';
import { HistoryPanel } from './history-panel';
import { CalculatorKey } from '@/lib/calculator-types';
import { Card } from '@/components/ui/card';

export function Calculator() {
  const { state, dispatch } = useCalculator();

  const handleKeyPress = (key: CalculatorKey) => {
    switch (key) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '.':
        dispatch({ type: 'APPEND_DIGIT', payload: key });
        break;
      case '+':
      case '-':
      case '*':
      case '/':
      case '%':
      case 'sin':
      case 'cos':
      case 'tan':
      case 'log':
      case 'ln':
      case 'sqrt':
      case 'cbrt':
      case '^':
      case '^2':
      case '^3':
      case '!':
        dispatch({ type: 'SET_OPERATION', payload: key });
        break;
      case '=':
        dispatch({ type: 'CALCULATE' });
        break;
      case 'C':
        dispatch({ type: 'CLEAR' });
        break;
      case 'CE':
        dispatch({ type: 'CLEAR_ENTRY' });
        break;
      case 'DEL':
        dispatch({ type: 'DELETE' });
        break;
      case 'π':
      case 'e':
        dispatch({ type: 'USE_CONSTANT', payload: key });
        break;
      case 'MS':
        dispatch({ type: 'MEMORY_STORE' });
        break;
      case 'MR':
        dispatch({ type: 'MEMORY_RECALL' });
        break;
      case 'M+':
        dispatch({ type: 'MEMORY_ADD' });
        break;
      case 'M-':
        dispatch({ type: 'MEMORY_SUBTRACT' });
        break;
      case 'MC':
        dispatch({ type: 'MEMORY_CLEAR' });
        break;
      default:
        break;
    }
  };

  const handleToggleAngleMode = () => {
    dispatch({ type: 'TOGGLE_ANGLE_MODE' });
  };

  const handleRecallFromHistory = (value: string) => {
    dispatch({ type: 'RECALL_FROM_HISTORY', payload: value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-4 md:col-span-2">
        <div className="mb-4">
          <Display
            value={state.display}
            previousValue={state.previousDisplay}
            error={state.error}
            memory={state.memory}
            angleMode={state.angleMode}
          />
        </div>

        <div className="space-y-4">
          <MemoryControls
            onKeyPress={handleKeyPress}
            hasMemory={state.memory !== null}
          />

          <ScientificControls
            onKeyPress={handleKeyPress}
            onToggleAngleMode={handleToggleAngleMode}
            angleMode={state.angleMode}
          />

          <Keypad onKeyPress={handleKeyPress} />
        </div>
      </Card>

      <div className="md:col-span-1">
        <HistoryPanel
          history={state.history}
          onRecall={handleRecallFromHistory}
        />
      </div>
    </div>
  );
} 