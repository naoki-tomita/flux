import React, { FunctionComponent } from "react";
import { useContext } from "../Store";
import { Button, ButtonGroup } from "@material-ui/core";
import { AppType } from "../Store/App";

export const AppSwitcher: FunctionComponent = () => {
  const {
    app: { state, switchApp }
  } = useContext();
  function onChange(type: AppType) {
    switchApp(type);
  }

  return (
    <>
      <ButtonGroup variant="contained" size="large" fullWidth>
        <Button
          disabled={state === "counter"}
          onClick={() => onChange("counter")}
        >
          Counter
        </Button>
        <Button disabled={state === "todo"} onClick={() => onChange("todo")}>
          Todo
        </Button>
        <Button disabled={state === "photo"} onClick={() => onChange("photo")}>
          Photo
        </Button>
      </ButtonGroup>
    </>
  );
};
