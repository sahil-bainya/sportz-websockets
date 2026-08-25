import AgentAPI from "apminsight";
AgentAPI.config();

import express from "express";
import http from "http";
import { matchRouter } from "./routes/matches.route.js";
import { commentaryRouter } from "./routes/commentary.route.js";
import { adminRouter } from "./routes/admin.route.js";
import { attachWebSocketServer } from "./ws/server.js";
import { securityMiddleware } from "./arcjet.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const PORT = Number(process.env.PORT || 8000);
const HOST = process.env.HOST || "0.0.0.0";

const app = express();
const server = http.createServer(app);
// express() → creates an Express application (app), which handles routes, middleware, requests, etc.
// http.createServer(app) → creates the actual Node.js HTTP server using the Express app as its request handler.
// app.listen() internally creates an HTTP server, so for normal Express apps app.listen() is enough.
// When using WebSockets, we often create the HTTP server explicitly so the WebSocket server can attach to it.
// attachWebSocketServer(server) → attaches the WebSocket server to the same HTTP server.
// This allows HTTP and WebSocket to use the same port.

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true, // cookies allow karne ke liye zaroori
  }),
);

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from express server!");
});

app.use(securityMiddleware());

app.use("/api/matches", matchRouter);
app.use("/api/matches/:id/commentary", commentaryRouter);
app.use("/api/admin", adminRouter);

const { broadcastMatchCreated, broadcastCommentary } =
  attachWebSocketServer(server);
app.locals.broadcastMatchCreated = broadcastMatchCreated;
app.locals.broadcastCommentary = broadcastCommentary;
// app.locals stores application-level data/functions.
// Values remain available for the lifetime of the Express application.
// Access directly with app.locals.name.
// Inside a request handler, use req.app.locals.name.

server.listen(PORT, HOST, () => {
  const baseUrl =
    HOST === "0.0.0.0" ? `http://localhost:${PORT}` : `http://${HOST}:${PORT}`;
  console.log(`server is running on ${baseUrl}`);
  console.log(
    `Websocket server is running on ${baseUrl.replace("http", "ws")}/ws`,
  );
});
