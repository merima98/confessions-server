import express from "express";

import { create, getConfessions, rateConfession } from "./posts_controller.js";

const router = express.Router();

router.post("/", create); //Adding a new confession

router.get("/", getConfessions); //Get confessions

router.put("/rate", rateConfession); //Upvote or Downvote

export default router;
