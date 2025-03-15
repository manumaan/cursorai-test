'use client';

import { useReducer, useCallback, useEffect } from 'react';
import * as math from 'mathjs';
import { 
  CalculatorState, 
  CalculatorAction, 
  CalculationHistoryItem,
  AngleMode
} from '@/lib/calculator-types';

const initialState: CalculatorState = {
  display: '0',
  previousDisplay: '',
  memory: null,
  history: [],
  angleMode: 'rad',
  error: null,
};

function calculatorReducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
  switch (action.type) {
    case 'APPEND_DIGIT': {
      if (state.error) {
        return {
          ...initialState,
          display: action.payload === '.' ? '0.' : action.payload,
          angleMode: state.angleMode,
          memory: state.memory,
        };
      }

      // If display is just '0', replace it unless we're adding a decimal point
      if (state.display === '0' && action.payload !== '.') {
        return {
          ...state,
          display: action.payload,
        };
      }

      // Don't allow multiple decimal points
      if (action.payload === '.' && state.display.includes('.')) {
        return state;
      }

      return {
        ...state,
        display: state.display + action.payload,
      };
    }

    case 'SET_OPERATION': {
      if (state.error) {
        return state;
      }

      // Handle special operations that can be calculated immediately
      if (['sin', 'cos', 'tan', 'log', 'ln', 'sqrt', 'cbrt', '^2', '^3', '!'].includes(action.payload)) {
        try {
          let result: number | string;
          const value = parseFloat(state.display);
          
          // Convert to radians if in degree mode for trig functions
          const angleConversion = state.angleMode === 'deg' && ['sin', 'cos', 'tan'].includes(action.payload)
            ? Math.PI / 180
            : 1;

          switch (action.payload) {
            case 'sin':
              result = Number(math.sin(value * angleConversion));
              break;
            case 'cos':
              result = Number(math.cos(value * angleConversion));
              break;
            case 'tan':
              result = Number(math.tan(value * angleConversion));
              break;
            case 'log':
              result = Number(math.log10(value));
              break;
            case 'ln':
              result = Number(math.log(value));
              break;
            case 'sqrt':
              result = Number(math.sqrt(value));
              break;
            case 'cbrt':
              result = Number(math.cbrt(value));
              break;
            case '^2':
              result = Number(math.pow(value, 2));
              break;
            case '^3':
              result = Number(math.pow(value, 3));
              break;
            case '!':
              result = Number(math.factorial(value));
              break;
            default:
              result = value;
          }

          const expression = `${action.payload}(${state.display})`;
          const resultStr = result.toString();
          
          const historyItem: CalculationHistoryItem = {
            expression,
            result: resultStr,
            timestamp: Date.now(),
          };

          return {
            ...state,
            display: resultStr,
            previousDisplay: expression,
            history: [historyItem, ...state.history].slice(0, 20), // Keep only last 20 items
          };
        } catch (error) {
          return {
            ...state,
            error: error instanceof Error ? error.message : 'Calculation error',
          };
        }
      }

      // For binary operations (+, -, *, /, ^, %)
      return {
        ...state,
        previousDisplay: state.display,
        display: '0',
      };
    }

    case 'CALCULATE': {
      if (state.error) {
        return state;
      }

      try {
        // Replace mathematical constants
        let expression = state.previousDisplay + state.display;
        expression = expression.replace(/π/g, 'pi').replace(/e/g, 'e');

        // Evaluate the expression
        const result = math.evaluate(expression);
        const resultStr = result.toString();

        const historyItem: CalculationHistoryItem = {
          expression,
          result: resultStr,
          timestamp: Date.now(),
        };

        return {
          ...state,
          display: resultStr,
          previousDisplay: '',
          history: [historyItem, ...state.history].slice(0, 20), // Keep only last 20 items
        };
      } catch (error) {
        return {
          ...state,
          error: error instanceof Error ? error.message : 'Calculation error',
        };
      }
    }

    case 'CLEAR':
      return {
        ...initialState,
        angleMode: state.angleMode,
        memory: state.memory,
        history: state.history,
      };

    case 'CLEAR_ENTRY':
      return {
        ...state,
        display: '0',
        error: null,
      };

    case 'DELETE':
      if (state.error) {
        return {
          ...state,
          error: null,
        };
      }

      if (state.display.length === 1) {
        return {
          ...state,
          display: '0',
        };
      }

      return {
        ...state,
        display: state.display.slice(0, -1),
      };

    case 'TOGGLE_ANGLE_MODE':
      return {
        ...state,
        angleMode: state.angleMode === 'rad' ? 'deg' : 'rad',
      };

    case 'MEMORY_STORE':
      try {
        return {
          ...state,
          memory: parseFloat(state.display),
        };
      } catch {
        return {
          ...state,
          error: 'Invalid number for memory',
        };
      }

    case 'MEMORY_RECALL':
      if (state.memory === null) {
        return state;
      }
      return {
        ...state,
        display: state.memory.toString(),
      };

    case 'MEMORY_ADD':
      try {
        const currentValue = parseFloat(state.display);
        const newMemory = (state.memory || 0) + currentValue;
        return {
          ...state,
          memory: newMemory,
        };
      } catch {
        return {
          ...state,
          error: 'Invalid operation',
        };
      }

    case 'MEMORY_SUBTRACT':
      try {
        const currentValue = parseFloat(state.display);
        const newMemory = (state.memory || 0) - currentValue;
        return {
          ...state,
          memory: newMemory,
        };
      } catch {
        return {
          ...state,
          error: 'Invalid operation',
        };
      }

    case 'MEMORY_CLEAR':
      return {
        ...state,
        memory: null,
      };

    case 'USE_CONSTANT':
      const constant = action.payload === 'π' ? Math.PI : Math.E;
      return {
        ...state,
        display: state.display === '0' ? constant.toString() : state.display + constant.toString(),
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    case 'RECALL_FROM_HISTORY':
      return {
        ...state,
        display: action.payload,
      };

    default:
      return state;
  }
}

export function useCalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const { key } = event;

    // Prevent default behavior for calculator keys
    if (
      /^[0-9.]$/.test(key) ||
      ['+', '-', '*', '/', '=', 'Enter', 'Backspace', 'Delete', 'Escape'].includes(key)
    ) {
      event.preventDefault();
    }

    // Handle number keys and decimal point
    if (/^[0-9.]$/.test(key)) {
      dispatch({ type: 'APPEND_DIGIT', payload: key });
      return;
    }

    // Handle operators
    switch (key) {
      case '+':
      case '-':
      case '*':
      case '/':
        dispatch({ type: 'SET_OPERATION', payload: key as any });
        break;
      case 'Enter':
      case '=':
        dispatch({ type: 'CALCULATE' });
        break;
      case 'Backspace':
        dispatch({ type: 'DELETE' });
        break;
      case 'Delete':
      case 'Escape':
        dispatch({ type: 'CLEAR' });
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return {
    state,
    dispatch,
  };
} 