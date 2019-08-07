import React, { FunctionComponent, ReactElement } from "react";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import { useTheme } from "@material-ui/styles";
import { useMediaQuery, Grid } from "@material-ui/core";
import { chunk } from "lodash";

function itemCount(size: Breakpoint) {
  switch (size) {
    case "xs":
    case "sm":
      return 1;
    case "md":
      return 2;
    case "lg":
    case "xl":
      return 3;
  }
}

function useWidth() {
  const theme = useTheme() as any;
  const keys = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce<Breakpoint | null>((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || "xs"
  );
}

interface Props<T = any> {
  items: T[];
  render: (item: T) => ReactElement;
}

export const FillGrid: FunctionComponent<Props> = ({ items, render }) => {
  const breakPoint = useWidth();
  const count = itemCount(breakPoint);
  return (
    <>
      {chunk(items, count).map((it, index) => (
        <Grid key={index} container spacing={2}>
          {[
            ...it.map(render),
            ...Array(count - it.length)
              .fill(null)
              .map((_, i) => <Grid key={it.length + i} item xs />)
          ]}
        </Grid>
      ))}
    </>
  );
};
