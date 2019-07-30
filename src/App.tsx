import React, { FunctionComponent } from 'react';
import { StoreProvider, useContext, AppType } from "./Store"
import { Container } from "@material-ui/core";
import { AppSwitcher } from "./AppSwitcher";
import { Counter } from "./Counter";
import { Todo } from "./Todo";

const Switch = ({ state }: { state: AppType }) => {
  switch (state) {
    case "counter":
      return <Counter />
    case "todo":
      return <Todo />
    default:
      return null;
  }
}

export const App: FunctionComponent = () => {
  return (
    <StoreProvider>
      <InnerApp />
    </StoreProvider>
  );
}

const InnerApp: FunctionComponent = () => {
  const { state } = useContext();
  return (
    <Container fixed>
      <AppSwitcher />
      <Switch state={state} />
    </Container>
  );
}
