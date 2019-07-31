import React, { FunctionComponent, useState } from 'react';
import { Fab, Container, Box, Dialog } from "@material-ui/core";
import { Add } from '@material-ui/icons';
import { useContext, IdOmittedTodo } from "../Store"
import { TodoEditDialog } from "./TodoEditDialog";
import { TodoItem } from "./TodoItem";

interface State {
  open: boolean;
}

export const Todo: FunctionComponent = () => {
  const [state, setState] = useState<State>({ open: false });
  const { todos, add, change, remove } = useContext();
  const { open } = state;

  function onOpen() {
    setState({ ...state, open: true });
  }

  function onClose() {
    setState({ ...state, open: false });
  }

  function onSave(todo: IdOmittedTodo) {
    add(todo);
    onClose();
  }

  return (
    <>
    <Container fixed>
      <Box marginBottom="20px" />
      {todos.map(todo =>
        <Box key={todo.id} marginBottom="12px" >
          <TodoItem {...todo} onDoneChange={done => change({ ...todo, done })} onRemove={() => remove(todo.id)} />
        </Box>
      )}
      <Box marginBottom="20px"/>
      <Box display="flex" justifyContent="center" marginBottom="12px">
        <Fab onClick={onOpen}><Add /></Fab>
      </Box>
    </Container>
    <TodoEditDialog onClose={onClose} onSave={onSave} open={open}></TodoEditDialog>
    </>
  );
}
