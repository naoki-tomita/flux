import React, { FunctionComponent, useState } from "react";
import { Dialog, DialogTitle, DialogContent, Box, TextField, DialogActions, Button } from "@material-ui/core"
import { IdOmittedTodo } from "../Store";

interface State {
  title: string;
  description: string;
}

interface Props {
  onClose(): void;
  onSave(todo: IdOmittedTodo): void;
  open: boolean;
}

export const TodoEditDialog: FunctionComponent<Props> = ({ onClose, onSave, open }) => {
  const [state, setState] = useState<State>({ title: "", description: "" });
  const { title, description } = state;
  function onTitleChange(title: string) {
    setState({ ...state, title });
  }

  function onDescriptionChange(description: string) {
    setState({ ...state, description });
  }

  function onSaveClick() {
    onSave({ title, description, done: false });
    reset();
  }

  function onCloseClick() {
    onClose();
    reset();
  }

  function reset() {
    setState({ ...state, title: "", description: "" });
  }

  return (
    <>
    <Dialog maxWidth="sm" fullWidth onClose={onClose} open={open}>
      <DialogTitle>Todo++</DialogTitle>
      <DialogContent>
      <Box marginBottom="8px">
        <TextField
          value={title}
          onChange={e => onTitleChange(e.target.value)}
          label="Title"
          fullWidth
        />
      </Box>
      <Box>
        <TextField
          value={description}
          onChange={e => onDescriptionChange(e.target.value)}
          label="Description"
          multiline
          fullWidth
        />
      </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onSaveClick}>Save</Button>
        <Button onClick={onCloseClick}>Cancel</Button>
      </DialogActions>
    </Dialog>
    </>
  );
};
