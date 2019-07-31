import React, { FunctionComponent, useState } from "react";
import { Card, CardContent, Typography, CardActions, Button, Grid, Switch, Box, FormControlLabel, CardActionArea, Grow } from "@material-ui/core"

interface Props {
  onDoneChange(done: boolean): void;
  onRemove(): void;
  title: string;
  description: string;
  done: boolean;
}

interface State {
  dragging: boolean;
  start: number;
  remove: boolean;
}

export const TodoItem: FunctionComponent<Props> = ({ onDoneChange, title, description, done, onRemove }) => {
  let move = 0;
  let ref: HTMLDivElement | null;
  const [state, setState] = useState<State>({ dragging: false, start: 0, remove: false });
  const { dragging, remove } = state;

  function onDragStart(x: number) {
    move = 0;
    setState({ ...state, dragging: true, start: x });
  }

  function onDragging(x: number) {
    const { start } = state;
    if (!dragging) {
      return;
    }
    const dx = Math.max(Math.min(x - start, 42), -42);
    ref && (ref.style.left = `${dx}px`);
    move = dx;
  }

  function onDragEnd() {
    if (Math.abs(move) > 20) {
      setState({ ...state, dragging: false, remove: true });
    } else {
      setState({ ...state, dragging: false });
    }
    ref && (ref.style.left = `0`);
  }

  function onDragCancel() {
    setState({ ...state, dragging: false });
    ref && (ref.style.left = `0`);
  }

  return (
    <Grow enter={false} in={!remove} exit={true} onExited={() => onRemove()}>
      <Box position="relative">
        <div ref={(_ref) => (ref = _ref)} style={{
          position: "relative",
          left: move,
          transition: dragging ? "": "0.3s"
        }}>
          <Card raised={!done} style={{ opacity: (done || dragging) ? 0.4: 1 }}>
            <CardContent
              onMouseDown={e => onDragStart(e.clientX)}
              onTouchStart={e => onDragStart(e.touches.item(0).clientX)}
              onMouseMove={e => onDragging(e.clientX)}
              onTouchMove={e => onDragging(e.touches.item(0).clientX)}
              onMouseUp={onDragEnd}
              onTouchEnd={onDragEnd}
              onMouseLeave={onDragCancel}
              onTouchCancel={onDragCancel}
            >
              <Grid container spacing={2}>
                <Grid item xs={9}>
                  <Typography variant="h5">{title}</Typography>
                  {description.split("\n").map((line, i) => <Typography key={i} variant="body2">{line}</Typography>)}
                </Grid>
                <Grid item xs={3} style={{ borderLeft: "1px solid rgba(0, 0, 0, 0.12)" }}>
                  <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <FormControlLabel
                      value="top"
                      control={
                        <Switch
                          checked={done}
                          onChange={(_, done) => onDoneChange(done)}
                          value="checkedA"
                          inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                      }
                      label="DONE"
                      labelPlacement="top"
                      style={{ userSelect: "none" }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
      </Box>
    </Grow>
  );
}
