import { useState } from "react";

interface CounterState {
  count: number;
}

interface CounterActions {
  increment(): void;
  decrement(): void;
}

export type CounterStore = CounterState & CounterActions;

export function useCounter(initialState: CounterState) {
  const [state, setCount] = useState<CounterState>(initialState);
  return {
    count: state.count,
    increment: () => setCount({ ...state, count: state.count + 1 }),
    decrement: () => setCount({ ...state, count: state.count - 1 })
  };
}
