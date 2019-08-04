import React, { FunctionComponent } from 'react';
import { useContext, AppType } from "../Store"
import { Button, ButtonGroup } from "@material-ui/core";

export const AppSwitcher: FunctionComponent = () => {
  const { app: { state, switchApp } } = useContext();
  function onChange(type: AppType) {
    switchApp(type);
  }

  return (
    <>
    <ButtonGroup
      variant="contained"
      size="large"
      fullWidth>
      <Button
        disabled={state === "counter"}
        onClick={() => onChange("counter")}>
        Counter
      </Button>
      <Button
        disabled={state === "todo"}
        onClick={() => onChange("todo")}>
        Todo
      </Button>
    </ButtonGroup>
    </>
  );
}
