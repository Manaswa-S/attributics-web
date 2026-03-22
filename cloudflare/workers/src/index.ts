import { Hono } from "hono";
import { forms } from "./forms";
import type { Bindings } from "./types";

const app = new Hono<{ Bindings: Bindings }>();

app.route("/forms", forms);

app.get("/message", (c) => {
  return c.text("Hello Hono!");
});

export default app;
