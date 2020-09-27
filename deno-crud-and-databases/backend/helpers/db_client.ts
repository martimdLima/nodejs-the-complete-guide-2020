import {
  Database,
  MongoClient,
} from "https://deno.land/x/mongo@v0.12.1/mod.ts";

const MONGODB_URI = "mongodb+srv://mdlima:Fp53UihfDIOC0o7a@cluster0.xmtoh.mongodb.net/?retryWrites=true&w=majority";

let db: Database;

export function connect() {
  const client = new MongoClient();
  client.connectWithUri(MONGODB_URI);
  db = client.database("todos");
}

export function getDb() {
  return db;
}
