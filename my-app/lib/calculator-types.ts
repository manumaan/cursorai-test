export type CalculatorOperation = 
  | '+' | '-' | '*' | '/' 
  | 'sin' | 'cos' | 'tan' 
  | 'log' | 'ln' 
  | 'sqrt' | 'cbrt' 
  | '^' | '^2' | '^3'
  | '!' | '%';

export type CalculatorKey = 
  | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' 
  | '.' | '+' | '-' | '*' | '/' | '=' | 'C' | 'CE' | 'DEL'
  | 'sin' | 'cos' | 'tan' | 'log' | 'ln' 
  | 'sqrt' | 'cbrt' | '^' | '^2' | '^3'
  | '!' | '%' | '(' | ')'
  | 'π' | 'e'
  | 'MS' | 'MR' | 'M+' | 'M-' | 'MC';

export type AngleMode = 'rad' | 'deg';

export interface CalculationHistoryItem {
  expression: string;
  result: string;
  timestamp: number;
}

export interface CalculatorState {
  display: string;
  previousDisplay: string;
  memory: number | null;
  history: CalculationHistoryItem[];
  angleMode: AngleMode;
  error: string | null;
}

export type CalculatorAction = 
  | { type: 'APPEND_DIGIT'; payload: string }
  | { type: 'SET_OPERATION'; payload: CalculatorOperation }
  | { type: 'CALCULATE' }
  | { type: 'CLEAR' }
  | { type: 'CLEAR_ENTRY' }
  | { type: 'DELETE' }
  | { type: 'TOGGLE_ANGLE_MODE' }
  | { type: 'MEMORY_STORE' }
  | { type: 'MEMORY_RECALL' }
  | { type: 'MEMORY_ADD' }
  | { type: 'MEMORY_SUBTRACT' }
  | { type: 'MEMORY_CLEAR' }
  | { type: 'USE_CONSTANT'; payload: 'π' | 'e' }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'RECALL_FROM_HISTORY'; payload: string }; 