import React, { FunctionComponent, useState, useEffect } from 'react';
import { Fab, Container, Box } from "@material-ui/core";
import { Add } from '@material-ui/icons';
import { useContext, IdOmittedTodo } from "../Store"
import { TodoEditDialog } from "./TodoEditDialog";
import { TodoItem } from "./TodoItem";

interface State {
  open: boolean;
}

export const Todo: FunctionComponent = () => {
  const [state, setState] = useState<State>({ open: false });
  const { todo: { todos, change, remove, update, send } } = useContext();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { update() }, []);

  const { open } = state;

  function onOpen() {
    setState({ ...state, open: true });
  }

  function onClose() {
    setState({ ...state, open: false });
  }

  function onSave(todo: IdOmittedTodo) {
    send(todo);
    onClose();
  }

  return (
    <>
    <Container fixed>
      <Box marginBottom="20px" />
      {todos.map(todo =>
        <Box marginBottom="12px" key={todo.id}>
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
