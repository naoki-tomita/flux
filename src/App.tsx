import React, { FunctionComponent, useContext } from 'react';
import { StoreProvider, Context } from "./Store"

const Component1: FunctionComponent = () => {
  const { count, increment } = useContext(Context);
  return (
    <div>
      {count}
      <button onClick={increment}>+++++</button>
    </div>
  );
}

const Component2: FunctionComponent = () => {
  const { count, decrement } = useContext(Context);
  return (
    <div>
      {count}
      <button onClick={decrement}>-------</button>
    </div>
  );
}

export const App: FunctionComponent = () => {
  return (
    <StoreProvider>
      <Component1 />
      <Component2 />
    </StoreProvider>
  );
}
