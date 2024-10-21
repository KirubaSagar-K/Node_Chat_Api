import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./routes/routes.js";
import connectToMongo from "./db/mongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const port = process.env.PORT || 8001;

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", router);

server.listen(port, () => {
  connectToMongo();
  console.log(`App running on port ${port}`);
});
