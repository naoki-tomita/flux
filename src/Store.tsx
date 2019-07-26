import React, { createContext, useState, FunctionComponent } from "react";

interface State {
  count: number;
}

interface Actions {
  increment: () => void;
  decrement: () => void;
}

export const Context = createContext<State & Actions>({
  count: 0,
  increment: () => null,
  decrement: () => null,
});

function useCounter() {
  const [count, setCount] = useState(0);
  return {
    count,
    increment: () => setCount(count + 1),
    decrement: () => setCount(count - 1),
  };
}

export const StoreProvider: FunctionComponent = ({ children }) => {
  const counter = useCounter();
  return (
    <Context.Provider value={counter}>{children}</Context.Provider>
  );
}
