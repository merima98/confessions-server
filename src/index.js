import mongoose from "mongoose";
import express from "express";
import cors from "cors";

import posts_routes from "./posts/posts_routes.js";

const MONGODB_URI =
  "mongodb+srv://xyz:xyz@cluster0.w4ehk.mongodb.net/confessions"; //ovdje sada postavljam ime servera

const { PORT } = process.env;
const app = express();

mongoose.connect(MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use(posts_routes);

app.listen(3500);
