import { Button, Paper, Stack, Typography, TextField } from "@mui/material";
import { useState } from "react";

export default function TodoItem({
  todo,
  getAllData,
}: {
  todo: TodoItemType;
  getAllData: () => void;
}) {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(todo.title);
  const [editDescription, setEditDescription] = useState<string>(
    todo.description
  );

  const completeHandler = (id: TodoItemType["id"]): void => {
    const allTodos: TodoItemType[] = localStorage.getItem("ReactTodo")
      ? JSON.parse(String(localStorage.getItem("ReactTodo")))
      : [];
    const filteredTodos = allTodos.map((ele: TodoItemType) => {
      if (String(ele.id) === id) {
        ele.isCompleted = !ele.isCompleted;
      }
      return ele;
    });
    localStorage.setItem("ReactTodo", JSON.stringify(filteredTodos));
    getAllData();
  };

  const deleteHandler = (id: TodoItemType["id"]): void => {
    const allTodos: TodoItemType[] = localStorage.getItem("ReactTodo")
      ? JSON.parse(String(localStorage.getItem("ReactTodo")))
      : [];
    const filteredTodos = allTodos.filter(
      (ele: TodoItemType) => String(ele.id) !== id
    );
    localStorage.setItem("ReactTodo", JSON.stringify(filteredTodos));
    getAllData();
  };

  const editHandler = (id: TodoItemType["id"]): void => {
    const allTodos: TodoItemType[] = localStorage.getItem("ReactTodo")
      ? JSON.parse(String(localStorage.getItem("ReactTodo")))
      : [];
    const filteredTodos = allTodos.map((ele: TodoItemType) => {
      if (String(ele.id) === id) {
        ele.title = editTitle;
        ele.description = editDescription;
      }
      return ele;
    });
    localStorage.setItem("ReactTodo", JSON.stringify(filteredTodos));
    setEdit(!edit);
    getAllData();
  };

  return (
    <Paper variant="outlined">
      <Stack
        direction={"column"}
        spacing={3}
        justifyContent="center"
        alignItems="center">
        {edit ? (
          <TextField
            value={editTitle}
            onChange={(e) => {
              setEditTitle(e.target.value);
            }}
            fullWidth
            label={"Title"}
            variant="outlined"
          />
        ) : (
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "1.5rem",
              fontFamily: "monospace",
            }}>
            {todo.title}
          </Typography>
        )}

        {edit ? (
          <TextField
            value={editDescription}
            onChange={(e) => {
              setEditDescription(e.target.value);
            }}
            fullWidth
            label={"Description"}
            variant="outlined"
          />
        ) : (
          <Typography sx={{ textAlign: "center", fontFamily: "cursive" }}>
            {todo.description}
          </Typography>
        )}

        <Stack direction={"row"} spacing={1}>
          {edit ? (
            <Button
              onClick={() => {
                editHandler(todo.id);
              }}
              sx={{ fontFamily: "monospace" }}
              variant="contained"
              color="success">
              Done
            </Button>
          ) : (
            <Button
              onClick={() => {
                setEdit(!edit);
              }}
              sx={{ fontFamily: "monospace" }}
              variant="contained"
              color="info">
              Edit
            </Button>
          )}
          <Button
            onClick={() => {
              deleteHandler(todo.id);
            }}
            sx={{ fontFamily: "monospace" }}
            variant="contained"
            color="warning">
            Delete❌
          </Button>
          <Button
            onClick={() => {
              completeHandler(todo.id);
            }}
            sx={{ fontFamily: "monospace" }}
            variant="contained">
            {todo.isCompleted ? "Completed ✔" : "Complete ❓"}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
