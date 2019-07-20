import React, { useState, createContext, FunctionComponent, useContext } from 'react';

function useCounter() {
  const [count, setCount] = useState<number>(0);
  return {
    count,
    increment: () => setCount(count + 1),
    decrement: () => setCount(count - 1),
  };
}

const CounterContext = createContext<{
  count: number;
  increment: () => void;
  decrement: () => void
}>({
  count: 0,
  increment: () => {},
  decrement: () => {}
});

const Component1: FunctionComponent = () => {
  const { count, increment } = useContext(CounterContext);
  return (
    <div>
      {count}
      <button onClick={increment}>+</button>
    </div>
  );
}

const Component2: FunctionComponent = () => {
  const { count, decrement } = useContext(CounterContext);
  return (
    <div>
      {count}
      <button onClick={decrement}>-</button>
    </div>
  );
}

export const App: FunctionComponent = () => {
  const counter = useCounter();
  return (
    <CounterContext.Provider value={counter}>
      <Component1 />
      <Component2 />
    </CounterContext.Provider>
  );
}
