import React, { FunctionComponent } from 'react';
import { StoreProvider, Context } from "../Store"
import { Button, Fab, Grid, Container, Box } from "@material-ui/core";
import { Add } from '@material-ui/icons';

export const Todo: FunctionComponent = () => {
  return (
    <>
    <Container maxWidth="xs">
      <Box marginBottom="20px"/>
      <Box display="flex" justifyContent="center">
        <Fab><Add /></Fab>
      </Box>
    </Container>
    </>
  );
}
