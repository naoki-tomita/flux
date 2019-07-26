import React, { FunctionComponent, useContext } from 'react';
import { StoreProvider, Context } from "./Store"
import { Button } from "@material-ui/core";

const Component1: FunctionComponent = () => {
  const { count, increment } = useContext(Context);
  return (
    <div>
      {count}
      <Button variant="contained" color="primary" onClick={increment}>増やす</Button>
    </div>
  );
}

const Component2: FunctionComponent = () => {
  const { count, decrement } = useContext(Context);
  return (
    <div>
      {count}
      <Button variant="outlined" color="primary" onClick={decrement}>減らす</Button>
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
