import React, { FunctionComponent } from 'react';
import { StoreProvider, Context } from "../Store"
import { Button, Fab, Grid } from "@material-ui/core";
import { Add } from '@material-ui/icons';

export const Todo: FunctionComponent = () => {
  return (
    <>
      <Grid container spacing={3} direction="row-reverse">
        <Grid item xs={3}>
          <Fab><Add /></Fab>
        </Grid>
      </Grid>
    </>
  );
}
