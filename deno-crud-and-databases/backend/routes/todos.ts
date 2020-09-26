import { Router } from "https://deno.land/x/oak/mod.ts";
import type { ObjectId } from "https://deno.land/x/mongo@v0.9.1/mod.ts";
import { getDb } from "../helpers/db_client.ts";

const router = new Router();

interface Todo {
  id?: string;
  text: string;
}

interface Test {
  _id: {
    $oid: string;
  };
  text: string;
}

let todos: Todo[] = [];

router.get('/todos', async (ctx) => {
  const todos = await getDb().collection<Test>('todos').find(); // { _id: ObjectId(), text: '...' }[]
  const transformedTodos = todos.map(
    (todo: { _id: ObjectId; text: string }) => {
      return { id: todo._id.$oid, text: todo.text };
    }
  );
  ctx.response.body = { todos: transformedTodos };
});

router.get("/todos/:todoId", async (ctx) => {
  const tid = ctx.params.todoId;
  const result = ctx.request.body();
  const data = await result.value;

  const todo = todos.find((todo) => {
    return todo.id === tid;
  });

  ctx.response.body = { todo: todo };
});

router.post("/todos", async (ctx) => {
  const result = ctx.request.body();
  const data = await ctx.request.body().value;

  const newTodo: Todo = {
    //id: new Date().toISOString(),
    text: data.text,
  };

  const id = await getDb().collection("todos").insertOne(newTodo);

  newTodo.id = id.$oid;

  ctx.response.body = {
    message: "Created dummy todo!",
    todo: newTodo,
  };
});

router.put("/todos/:todoId", async (ctx) => {
  const tid = ctx.params.todoId;
  const result = ctx.request.body();
  const data = await result.value;

  const todoIndex = todos.findIndex((todo) => {
    return todo.id === tid;
  });

  todos[todoIndex] = { id: todos[todoIndex].id, text: data.text };
  ctx.response.body = { message: "Updated todo" };
});

router.delete("/todos/:todoId", async (ctx) => {
  const tid = ctx.params.todoId;

  todos = todos.filter((todo) => todo.id !== tid);

  ctx.response.body = { message: "Deleted todo" };
});

export default router;