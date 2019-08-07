import React, { FunctionComponent, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Dialog,
  Typography
} from "@material-ui/core";
import { Menu as MenuIcon, Settings, Close } from "@material-ui/icons";
import { useContext } from "../Store";

interface State {
  openDrawer: boolean;
  openSetting: boolean;
}

export const Menu: FunctionComponent = ({ children }) => {
  const {
    setting: { reset }
  } = useContext();
  const [state, setState] = useState<State>({
    openDrawer: false,
    openSetting: false
  });

  function openDrawer() {
    setState({ ...state, openDrawer: true });
  }

  function closeDrawer() {
    setState({ ...state, openDrawer: false });
  }

  function openSetting() {
    setState({ ...state, openSetting: true });
  }

  function closeSetting() {
    setState({ ...state, openSetting: false });
  }

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={openDrawer}>
            <MenuIcon />
          </IconButton>
          {children}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={state.openDrawer} onClose={closeDrawer}>
        <Box width="250px">
          <List>
            <ListItem button onClick={openSetting}>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Setting" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Dialog fullScreen open={state.openSetting} onClose={closeSetting}>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={closeSetting}>
              <Close />
            </IconButton>
            <Typography variant="h6">SETTING</Typography>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button onClick={reset}>
            <ListItemText
              primary="RESET STATE"
              secondary="Warning. This operation cannot be undone."
            />
          </ListItem>
        </List>
      </Dialog>
    </>
  );
};
