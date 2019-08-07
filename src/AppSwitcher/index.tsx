import React, { FunctionComponent } from "react";
import { useContext } from "../Store";
import { Tabs, Tab } from "@material-ui/core";
import { AppType } from "../Store/App";

export const AppSwitcher: FunctionComponent = () => {
  const {
    app: { state, switchApp }
  } = useContext();
  function onChange(_: any, type: AppType) {
    switchApp(type);
  }

  return (
    <>
      <Tabs onChange={onChange} value={state}>
        <Tab label="Counter" value="counter" />
        <Tab label="Todo" value="todo" />
        <Tab label="Photo" value="photo" />
      </Tabs>
    </>
  );
};
