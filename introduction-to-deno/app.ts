import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use((ctx) => {
  ctx.response.body = "Dummy Server is up and running!";
});

await app.listen({ port: 8000 });