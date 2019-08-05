import React, { FunctionComponent } from 'react';
import { StoreProvider, useContext, AppType } from "./Store"
import { Container } from "@material-ui/core";
import { AppSwitcher } from "./AppSwitcher";
import { Counter } from "./Counter";
import { Todo } from "./Todo";
import { Photo } from "./Photo";

const Switch = ({ state }: { state: AppType }) => {
  switch (state) {
    case "counter":
      return <Counter />
    case "todo":
      return <Todo />
    case "photo":
      return <Photo />
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
  const { app: { state } } = useContext();
  return (
    <Container fixed>
      <AppSwitcher />
      <Switch state={state} />
    </Container>
  );
}
