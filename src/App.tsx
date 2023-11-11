import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import TodoItem from "./components/TodoItem";
import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState<TodoItemType[]>([]);
  const [title, setTile] = useState<TodoItemType["title"]>("");
  const [description, setDescription] =
    useState<TodoItemType["description"]>("");

  const handleSubmit = async (): Promise<void> => {
    const newTodo: TodoItemType = {
      title: title,
      isCompleted: false,
      id: String(Math.random() * 100),
      description: description,
    };
    todos.unshift(newTodo);
    localStorage.setItem("ReactTodo", JSON.stringify(todos));
    setTile("");
    setDescription("");
  };

  const getAllData = (): void => {
    setTodos(
      localStorage.getItem("ReactTodo")
        ? JSON.parse(String(localStorage.getItem("ReactTodo")))
        : []
    );
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <>
      <Container maxWidth="sm" sx={{ height: "100%" }}>
        <AppBar>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Typography sx={{ fontFamily: "monospace", fontSize: "2rem" }}>
              Todo App{" "}
            </Typography>
          </Toolbar>
        </AppBar>

        <Stack
          height={"80%"}
          direction={"column"}
          spacing={"1rem"}
          padding={"1rem"}
          margin={"4rem 0"}>
          {todos?.map((item) => (
            <TodoItem key={item.id} todo={item} getAllData={getAllData} />
          ))}
        </Stack>

        <Stack
          spacing={1}
          sx={{
            margin: "1rem 0",
            position: "sticky",
            bottom: "1rem",
            background: "white",
            zIndex: "10px",
          }}>
          <TextField
            value={title}
            onChange={(e) => {
              setTile(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && title != "") {
                handleSubmit();
              }
            }}
            size="small"
            fullWidth
            label={"Title"}
            variant="outlined"></TextField>
          <TextField
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
            fullWidth
            label={"Description"}
            variant="outlined"></TextField>
          <Button
            disabled={title === ""}
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            sx={{ fontFamily: "monospace" }}>
            Add Task
          </Button>
        </Stack>
      </Container>
    </>
  );
}

export default App;
