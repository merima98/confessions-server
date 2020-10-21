import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import posts_routes from "./posts/posts_routes.js";

dotenv.config();

const { PORT, MONGODB_URI } = process.env;
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

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
