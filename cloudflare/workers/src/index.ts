import { Hono } from "hono";
import { forms } from "./forms";
import { caseStudy } from "./caseStudy";
import type { Bindings } from "./types";
import { cors } from "hono/cors";

const app = new Hono<{ Bindings: Bindings }>();

app.use(
  "*",
  cors({
    // origin: [
    //   "http://localhost:5173", // Vite
    //   "http://localhost:4173", // Vite
    //   "https://attributics-web.pages.dev/", // prod
    // ],
    origin: "*",
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

app.route("/forms", forms);
app.route("/case-study", caseStudy);

app.get("/message", (c) => {
  return c.text("Hello Hono!");
});

export default app;
