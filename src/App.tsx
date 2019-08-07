import React, { FunctionComponent } from "react";
import { StoreProvider, useContext } from "./Store";
import { Container, CssBaseline, createMuiTheme } from "@material-ui/core";
import { AppSwitcher } from "./AppSwitcher";
import { Counter } from "./Counter";
import { Todo } from "./Todo";
import { Photo } from "./Photo";
import { AppType } from "./Store/App";
import { Menu } from "./Menu";
import { ThemeProvider } from "@material-ui/styles";

const Switch = ({ state }: { state: AppType }) => {
  switch (state) {
    case "counter":
      return <Counter />;
    case "todo":
      return <Todo />;
    case "photo":
      return <Photo />;
    default:
      return null;
  }
};
const theme = createMuiTheme();
export const App: FunctionComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StoreProvider>
        <InnerApp />
      </StoreProvider>
    </ThemeProvider>
  );
};

const InnerApp: FunctionComponent = () => {
  const {
    app: { state }
  } = useContext();
  return (
    <>
      <Menu>
        <AppSwitcher />
      </Menu>
      <Container fixed>
        <Switch state={state} />
      </Container>
    </>
  );
};
