import { Router } from "https://deno.land/x/oak/mod.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.12.1/mod.ts";
//import { ObjectId } from "https://deno.land/x/mongo@v0.12.1/ts/types.ts";
import { getDb } from "../helpers/db_client.ts";

const router = new Router();

interface Todo {
  id?: string;
  text: string;
}

interface TodoItem {
  _id: {
    $oid: string;
  };
  text: string;
}

let todos: Todo[] = [];

router.get("/todos", async (ctx) => {
  const todos = await getDb().collection<TodoItem>("todos").find(); // { _id: ObjectId(), text: '...' }[]
  const transformedTodos = todos.map(
    (todo: { _id: ObjectId; text: string }) => {
      return { id: todo._id.$oid, text: todo.text };
    },
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

// const tid = await ctx.params.todoId!;
// const result = ctx.request.body();
// const data = await result.value;

router.put("/todos/:todoId", async (ctx) => {
  const tid = ctx.params.todoId!;
  const result = ctx.request.body();
  const data = await result.value;
  const oid = ObjectId(tid);

  await getDb()
    .collection("todos")
    .updateOne({ _id: oid }, { $set: { text: data.text } });

  ctx.response.body = { message: "Updated todo" };
});

router.delete("/todos/:todoId", async (ctx) => {
  const tid = ctx.params.todoId!;
  const oid = ObjectId(tid);

  await getDb().collection("todos").deleteOne({ _id: oid });

  ctx.response.body = { message: "Deleted todo" };
});

export default router;